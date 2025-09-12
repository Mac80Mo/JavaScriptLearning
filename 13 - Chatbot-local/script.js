const msgContainer = document.getElementById("msgContainer");
const chatField = document.getElementById("chatField");
const sendButton = document.getElementById("sendButton");
const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

let userHasScrolled = false;
let scrollTimeout = null;

msgContainer.addEventListener("scroll", () => {
  const isAtBottom =
    msgContainer.scrollHeight - msgContainer.clientHeight <=
    msgContainer.scrollTop + 1;

  if (!isAtBottom) {
    userHasScrolled = true;
    scrollToBottomBtn.classList.add("show");

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      userHasScrolled = false;
    }, 3000);
  } else {
    userHasScrolled = false;
    scrollToBottomBtn.classList.remove("show");
  }
});

function scrollToBottomForced() {
  userHasScrolled = false;
  scrollToBottomBtn.classList.remove("show");
  msgContainer.scrollTo({
    top: msgContainer.scrollHeight,
    behavior: "smooth",
  });
}

function scrollToBottom(force = false) {
  if (!userHasScrolled || force) {
    setTimeout(() => {
      msgContainer.scrollTo({
        top: msgContainer.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }
}

function addMessage(content, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = isUser ? "msg-me" : "msg";

  if (isUser) {
    // User-Nachrichten: Nur Text, kein Kopier-Button
    messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
  } else {
    // Bot-Nachrichten: Text + Kopier-Button
    messageDiv.innerHTML = `
      <div class="message-content">${content}</div>
      <button class="copy-btn" onclick="copyMessage(this)">⧉</button>
    `;
  }

  msgContainer.appendChild(messageDiv);

  scrollToBottom(isUser);

  return messageDiv;
}

async function postChatMessage() {
  const userMessage = chatField.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, true);

  sendButton.disabled = true;
  sendButton.textContent = "Denkt nach...";
  chatField.value = "";

  const loadingDiv = addMessage("Ich denke nach...");

  try {
    const response = await askOllama(userMessage);
    msgContainer.removeChild(loadingDiv);
    addMessage(response);
  } catch (error) {
    msgContainer.removeChild(loadingDiv);
    addMessage(`Fehler: ${error.message}`);
  }

  sendButton.disabled = false;
  sendButton.textContent = "Fragen";
}

async function askOllama(question) {
  const apiUrl = "http://localhost:11434/api/generate";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.2:latest",
      prompt: question,
      stream: false,
    }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Ollama-Server nicht erreichbar. Ist Ollama gestartet?");
    } else if (response.status === 500) {
      throw new Error(
        "Modell konnte nicht geladen werden. Versuche es erneut."
      );
    } else {
      throw new Error(`Ollama-Fehler: ${response.statusText}`);
    }
  }

  const data = await response.json();
  return data.response.trim();
}

function copyMessage(button) {
  const messageText =
    button.parentElement.querySelector(".message-content").textContent;
  navigator.clipboard
    .writeText(messageText)
    .then(() => {
      // Erfolgreich kopiert - keine visuelle Änderung
    })
    .catch((err) => {
      console.error("Kopieren fehlgeschlagen:", err);
    });
}

function clearChat() {
  // Alle Nachrichten außer der ersten (Begrüßung) entfernen
  const messages = msgContainer.querySelectorAll(".msg, .msg-me");
  messages.forEach((message, index) => {
    if (index > 0) {
      // Erste Nachricht (Begrüßung) behalten
      message.remove();
    }
  });

  // Scroll-to-bottom Button verstecken
  scrollToBottomBtn.classList.remove("show");
  userHasScrolled = false;
}
