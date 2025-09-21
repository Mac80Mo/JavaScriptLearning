<template>
  <footer class="chat-footer">
    <form @submit.prevent="sendMessage" class="footer-form">
      <input 
        v-model="inputText"
        type="text" 
        placeholder="Bitte geben Sie hier Ihre Frage ein..."
        :disabled="disabled"
        class="chat-input"
        autocomplete="off"
        ref="inputField"
      >
      <button 
        type="submit" 
        :disabled="disabled || !inputText.trim()"
        class="send-button"
      >
        {{ disabled ? 'Denkt nach...' : 'Fragen' }}
      </button>
      <button 
        type="button" 
        @click="clearChat"
        class="clear-button"
        title="Chat leeren"
      >
        Löschen
      </button>
    </form>
  </footer>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// Props
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['send-message', 'clear-chat'])

// State
const inputText = ref('')
const inputField = ref(null)

// Methods
const sendMessage = () => {
  const message = inputText.value.trim()
  if (!message || props.disabled) return
  
  emit('send-message', message)
  inputText.value = ''
  
  // Focus zurück auf Input
  nextTick(() => {
    if (inputField.value) {
      inputField.value.focus()
    }
  })
}

const clearChat = () => {
  emit('clear-chat')
  inputText.value = ''
  
  // Focus zurück auf Input
  nextTick(() => {
    if (inputField.value) {
      inputField.value.focus()
    }
  })
}
</script>

<style scoped>
.chat-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1a2336;
  padding: 16px 100px;
  z-index: 1000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-form {
  display: flex;
  gap: 12px;
  max-width: 1200px;
  margin: 0 auto;
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #2d5aa0;
  border-radius: 8px;
  background-color: #161b2c;
  color: white;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.chat-input:focus {
  border-color: #4a7bc8;
}

.chat-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chat-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.send-button {
  padding: 12px 24px;
  background-color: #2d5aa0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.send-button:hover:not(:disabled) {
  background-color: #3d6ab0;
  transform: translateY(-1px);
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.clear-button {
  padding: 12px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background-color: #c82333;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .chat-footer {
    padding: 12px 20px;
  }
  
  .footer-form {
    gap: 8px;
  }
  
  .chat-input {
    font-size: 14px;
    padding: 10px 12px;
  }
  
  .send-button,
  .clear-button {
    font-size: 14px;
    padding: 10px 16px;
    min-width: 80px;
  }
  
  .clear-button {
    padding: 10px 12px;
  }
}
</style>
