<template>
  <div :class="['message', { 'message-user': isUser, 'message-bot': !isUser }]">
    <div class="message-content">{{ content }}</div>
    <button 
      v-if="!isUser" 
      class="copy-btn" 
      @click="copyMessage"
      title="Nachricht kopieren"
    >
      ⧉
    </button>
  </div>
</template>

<script setup>
// Props definieren
const props = defineProps({
  content: {
    type: String,
    required: true
  },
  isUser: {
    type: Boolean,
    default: false
  }
})

// Copy-Funktion
const copyMessage = async () => {
  try {
    await navigator.clipboard.writeText(props.content)
    // Optional: Feedback für User
    console.log('Nachricht kopiert!')
  } catch (error) {
    console.error('Kopieren fehlgeschlagen:', error)
  }
}
</script>

<style scoped>
.message {
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  position: relative;
  word-wrap: break-word;
  line-height: 1.5;
}

.message-bot {
  background-color: #1a2336;
  color: white;
  margin-right: 60px;
}

.message-user {
  background-color: #2d5aa0;
  color: white;
  margin-left: 60px;
  text-align: right;
}

.message-content {
  margin: 0;
  white-space: pre-wrap;
}

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: rgba(255, 255, 255, 0.6);
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 768px) {
  .message-bot {
    margin-right: 20px;
  }
  
  .message-user {
    margin-left: 20px;
  }
}
</style>
