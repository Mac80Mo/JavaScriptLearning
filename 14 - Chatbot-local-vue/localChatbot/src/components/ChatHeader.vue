<template>
  <header class="chat-header">
    lokaler ChatBot
  </header>
</template>

<script setup>
// Keine Props oder State nötig - statische Komponente
</script>

<style scoped>
.chat-header {
  background-color: #101521;
  padding: 16px 100px;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
}

@media (max-width: 768px) {
  .chat-header {
    padding: 16px 20px;
    font-size: 20px;
  }
}
</style>
