<template>
  <div class="chat-container" ref="msgContainer">
    <MessageComponent
      v-for="message in messages"
      :key="message.id"
      :content="message.content"
      :isUser="message.isUser"
    />
    
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="message message-bot loading-message">
      <div class="message-content">Ich denke nach...</div>
    </div>
    
    <!-- Scroll to Bottom Button -->
    <button 
      v-show="showScrollButton"
      class="scroll-to-bottom"
      @click="scrollToBottom"
      title="Zum Ende scrollen"
    >
      ↓
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import MessageComponent from './MessageComponent.vue'

// Props
const props = defineProps({
  messages: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

// Refs
const msgContainer = ref(null)
const showScrollButton = ref(false)
let userHasScrolled = false
let scrollTimeout = null

// Scroll Functions
const scrollToBottom = (force = false) => {
  if (!userHasScrolled || force) {
    nextTick(() => {
      if (msgContainer.value) {
        msgContainer.value.scrollTo({
          top: msgContainer.value.scrollHeight,
          behavior: 'smooth'
        })
      }
    })
  }
}

const handleScroll = () => {
  if (!msgContainer.value) return
  
  const { scrollTop, scrollHeight, clientHeight } = msgContainer.value
  const isAtBottom = scrollHeight - clientHeight <= scrollTop + 1
  
  if (!isAtBottom) {
    userHasScrolled = true
    showScrollButton.value = true
    
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      userHasScrolled = false
    }, 3000)
  } else {
    userHasScrolled = false
    showScrollButton.value = false
  }
}

const scrollToBottomForced = () => {
  userHasScrolled = false
  showScrollButton.value = false
  scrollToBottom(true)
}

// Watchers
watch(() => props.messages.length, () => {
  scrollToBottom()
})

watch(() => props.isLoading, (newVal) => {
  if (!newVal) {
    scrollToBottom()
  }
})

// Lifecycle
onMounted(() => {
  if (msgContainer.value) {
    msgContainer.value.addEventListener('scroll', handleScroll)
    scrollToBottom(true)
  }
})
</script>

<style scoped>
.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px 100px;
  margin-top: 80px; /* Platz für Header */
  margin-bottom: 100px; /* Platz für Input */
  position: relative;
}

.loading-message {
  opacity: 0.7;
  font-style: italic;
}

.scroll-to-bottom {
  position: fixed;
  bottom: 120px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2d5aa0;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.scroll-to-bottom:hover {
  background-color: #3d6ab0;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .chat-container {
    padding: 20px 20px;
    margin-top: 70px;
    margin-bottom: 90px;
  }
  
  .scroll-to-bottom {
    bottom: 100px;
    right: 20px;
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
}
</style>
