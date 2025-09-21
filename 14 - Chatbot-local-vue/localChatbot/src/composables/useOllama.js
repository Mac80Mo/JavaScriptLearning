// Vue Composable für Ollama API Integration
import { ref } from "vue";

export function useOllama() {
  // Reactive State für Loading und Error Handling
  const isLoading = ref(false); // Zeigt an, ob gerade eine Anfrage läuft
  const error = ref(null); // Speichert Fehlermeldungen

  const askOllama = async (question) => {
    // Ollama Server Endpunkt (lokal auf Port 11434)
    const apiUrl = "http://localhost:11434/api/generate";

    // Loading State aktivieren, Fehler zurücksetzen
    isLoading.value = true;
    error.value = null;

    try {
      // POST-Request an Ollama API senden
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:latest", // Verwendetes AI-Modell
          prompt: question, // User-Frage
          stream: false, // Keine Stream-Antwort, komplette Response
        }),
      });

      // HTTP-Status Codes abfangen und verständliche Fehlermeldungen generieren
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Ollama-Server nicht erreichbar. Ist Ollama gestartet?"
          );
        } else if (response.status === 500) {
          throw new Error(
            "Modell konnte nicht geladen werden. Versuche es erneut."
          );
        } else {
          throw new Error(`Ollama-Fehler: ${response.statusText}`);
        }
      }

      // JSON-Response parsen und Antwort extrahieren
      const data = await response.json();
      return data.response.trim(); // Whitespace entfernen und zurückgeben
    } catch (err) {
      // Fehler in reactive State speichern und weiterwerfen
      error.value = err.message;
      throw err;
    } finally {
      // Loading State immer deaktivieren (egal ob Erfolg oder Fehler)
      isLoading.value = false;
    }
  };

  // Composable Interface: Funktion und reactive States zurückgeben
  return {
    askOllama, // Async-Funktion für API-Calls
    isLoading, // Reactive Loading-State
    error, // Reactive Error-State
  };
}
