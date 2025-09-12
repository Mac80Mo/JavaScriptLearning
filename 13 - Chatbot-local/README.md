# 🤖 Lokaler ChatBot

Ein eleganter, lokaler Chatbot, der mit Ollama und dem Llama 3.2 Modell arbeitet. Diese Anwendung ermöglicht es, vollständig lokal und offline mit einem KI-Modell zu chatten, ohne dass Daten an externe Server gesendet werden.

## 📸 Projektvorschau

![Chatbot Screenshot](screenshot.png)

## 📋 Projektübersicht

Dieses Projekt implementiert eine benutzerfreundliche Web-Oberfläche für die Kommunikation mit lokalen Large Language Models über die Ollama API. Der Chatbot bietet eine moderne, dunkle Benutzeroberfläche mit responsivem Design und verschiedenen praktischen Funktionen.

## ✨ Features

- **Lokale KI**: Vollständig lokale Ausführung mit Ollama und Llama 3.2
- **Moderne UI**: Elegante, dunkle Benutzeroberfläche
- **Responsive Design**: Funktioniert auf Desktop und mobilen Geräten
- **Intelligentes Scrollen**: Automatisches Scrollen zu neuen Nachrichten
- **Kopierfunktion**: Bot-Antworten können per Klick kopiert werden
- **Chat löschen**: Conversation kann jederzeit zurückgesetzt werden
- **Scroll-Indikator**: Button zum schnellen Sprung ans Ende des Chats
- **Benutzerfreundlich**: Deutsche Oberfläche mit klaren Fehlermeldungen

## 🚀 Verwendete Technologien

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Ollama API (localhost:11434)
- **KI-Modell**: Llama 3.2 (über Ollama)
- **Styling**: Custom CSS mit modernem Design

## 📦 Voraussetzungen

1. **Ollama installiert**: [Ollama Download](https://ollama.ai/)
2. **Llama 3.2 Modell**:
   ```bash
   ollama pull llama3.2
   ```
3. **Ollama Server gestartet**:
   ```bash
   ollama serve
   ```

## 🛠️ Installation & Setup

1. **Repository klonen oder Dateien herunterladen**
2. **Ollama installieren und starten**:

   ```bash
   # Ollama Server starten
   ollama serve

   # In einem neuen Terminal: Llama 3.2 Model herunterladen
   ollama pull llama3.2
   ```

3. **Projekt öffnen**: `index.html` im Browser öffnen

## 📁 Projektstruktur

```
13 - Chatbot-local/
├── index.html          # Haupt-HTML-Datei
├── script.js           # JavaScript-Logik
├── style.css           # Styling und Layout
├── README.md           # Diese Dokumentation
└── screenshot.png      # Screenshot der Anwendung
```

## 💻 Verwendung

1. **Ollama starten**: Stellen Sie sicher, dass Ollama läuft (`ollama serve`)
2. **Browser öffnen**: Öffnen Sie `index.html` in Ihrem bevorzugten Browser
3. **Chatten**: Geben Sie Ihre Frage in das Eingabefeld ein und drücken Sie "Fragen"
4. **Antworten kopieren**: Klicken Sie auf das Kopier-Symbol (⧉) neben Bot-Antworten
5. **Chat leeren**: Verwenden Sie den "Löschen" Button, um die Conversation zurückzusetzen

## ⚙️ Funktionsweise

### Frontend (JavaScript)

- **Nachrichtenverwaltung**: Dynamisches Hinzufügen von Benutzer- und Bot-Nachrichten
- **API-Kommunikation**: Asynchrone Anfragen an die Ollama API
- **UI-Interaktionen**: Scroll-Management, Kopieren, Chat-Reset
- **Fehlerbehandlung**: Benutzerfreundliche Fehlermeldungen

### Backend (Ollama API)

- **Lokaler Server**: Läuft auf `localhost:11434`
- **Modell**: Llama 3.2 für natürliche Sprachverarbeitung
- **Stream-Modus**: Deaktiviert für vollständige Antworten
- **Fehlerbehandlung**: Status-Code-basierte Fehlerbehandlung

## 🎨 Design-Features

- **Dunkles Theme**: Moderne, augenfreundliche Farbgebung
- **Responsive Layout**: Anpassung an verschiedene Bildschirmgrößen
- **Smooth Scrolling**: Flüssige Animationen
- **Benutzer vs. Bot**: Unterschiedliche Styling für verschiedene Nachrichtentypen
- **Hover-Effekte**: Interaktive Elemente mit visueller Rückmeldung

## 🔧 Anpassungen

### Modell ändern

In `script.js` können Sie das verwendete Modell ändern:

```javascript
body: JSON.stringify({
  model: "llama3.2:latest", // Hier andere Modelle verwenden
  prompt: question,
  stream: false,
}),
```

### Styling anpassen

Das Design kann über `style.css` vollständig angepasst werden. Die CSS-Variablen am Anfang der Datei erleichtern Farbänderungen.

## 🐛 Fehlerbehebung

### Häufige Probleme:

1. **"Ollama-Server nicht erreichbar"**

   - Überprüfen Sie, ob Ollama läuft: `ollama serve`
   - Port 11434 verfügbar?

2. **"Modell konnte nicht geladen werden"**

   - Modell installieren: `ollama pull llama3.2`
   - Modellname überprüfen

3. **Keine Antwort**
   - Internetverbindung für erste Installation
   - Genügend RAM verfügbar (min. 8GB empfohlen)

## 📝 Entwickelt von

Dieses Projekt ist Teil des JavaScript Campus 10 Kurses und demonstriert:

- Moderne Web-Entwicklung mit Vanilla JavaScript
- API-Integration und asynchrone Programmierung
- Benutzerfreundliches UI/UX Design
- Lokale KI-Integration

## 📄 Lizenz

Dieses Projekt dient Bildungszwecken und ist frei verwendbar.
