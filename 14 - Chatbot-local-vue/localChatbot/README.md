# 🤖 Lokaler ChatBot - Vue.js Version

Ein lokaler Chatbot mit Vue.js und Ollama. Chat-Interface für Llama 3.2 ohne externe APIs.

## 🚀 Features

- Vue.js 3 mit Composition API
- Lokale KI (Ollama + Llama 3.2)
- Responsive Chat-Interface
- Copy-to-Clipboard & Auto-Scroll

## 🧩 Vue-Komponenten

### **App.vue** - Hauptkomponente

- Verwaltet den Chat-State (Nachrichten, Loading)
- Koordiniert alle anderen Komponenten
- Behandelt Ollama API-Aufrufe

### **ChatHeader.vue** - Kopfbereich

- Zeigt den Chatbot-Titel an
- Fixiert am oberen Bildschirmrand
- Einfache, statische Komponente

### **ChatContainer.vue** - Nachrichten-Bereich

- Rendert alle Chat-Nachrichten
- Automatisches Scrollen zu neuen Nachrichten
- Scroll-to-Bottom Button bei Bedarf
- Loading-Indikator während API-Calls

### **MessageComponent.vue** - Einzelne Nachricht

- Wiederverwendbare Komponente für User/Bot-Nachrichten
- Unterschiedliches Styling je nach Absender
- Copy-Button für Bot-Antworten
- Props: `content` (Text) und `isUser` (Boolean)

### **ChatInput.vue** - Eingabefeld

- Formular für neue Nachrichten
- Send-Button und Clear-Button
- Event-Emitting an Parent-Komponente
- Automatischer Focus nach dem Senden

### **useOllama.js** - API-Composable

- Wiederverwendbare Logik für Ollama-Integration
- Error-Handling und Loading-States
- Fetch-Wrapper für API-Calls

## 📦 Setup

```sh
npm install
npm run dev
```

**Voraussetzung:** Ollama mit Llama 3.2 Modell installiert und gestartet (`ollama serve`).
