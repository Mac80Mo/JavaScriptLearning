<script setup>
import { ref } from 'vue'
import ChatContainer from './components/ChatContainer.vue'
import ChatInput from './components/ChatInput.vue'
import ChatHeader from './components/ChatHeader.vue'
import { useOllama } from './composables/useOllama.js'

// Ollama Composable
const { askOllama } = useOllama()

// Reactive State
const messages = ref([
  {
    id: 1,
    content: 'Hi. Bitte stellen Sie mir eine Frage. Ich verwende aktuell das lokale Llama 3.2 Modell.',
    isUser: false,
    timestamp: new Date()
  }
])
const isLoading = ref(false)

// Event Handlers
const handleSendMessage = async (messageText) => {
  if (!messageText.trim()) return
  
  // User Message hinzufügen
  const userMessage = {
    id: Date.now(),
    content: messageText,
    isUser: true,
    timestamp: new Date()
  }
  messages.value.push(userMessage)
  
  // Loading State
  isLoading.value = true
  
  try {
    // Ollama API Call
    const botResponse = await askOllama(messageText)
    
    const botMessage = {
      id: Date.now() + 1,
      content: botResponse,
      isUser: false,
      timestamp: new Date()
    }
    messages.value.push(botMessage)
  } catch (error) {
    console.error('Fehler beim Senden:', error)
    const errorMessage = {
      id: Date.now() + 1,
      content: `Fehler: ${error.message}`,
      isUser: false,
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
  }
}

const handleClearChat = () => {
  messages.value = [
    {
      id: 1,
      content: 'Hi. Bitte stellen Sie mir eine Frage. Ich verwende aktuell das lokale Llama 3.2 Modell.',
      isUser: false,
      timestamp: new Date()
    }
  ]
}
</script>

<template>
  <div id="chatbot-app">
    <ChatHeader />
    <ChatContainer
      :messages="messages"
      :isLoading="isLoading"
    />
    <ChatInput
      @send-message="handleSendMessage"
      @clear-chat="handleClearChat"
      :disabled="isLoading"
    />
  </div>

</template>

<style scoped>
#chatbot-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #161b2c;
  position: relative;
}
</style>
