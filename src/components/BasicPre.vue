<template>
  <pre class="basic-pre">{{ text }}</pre>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.basic-pre {
  block-size: 20%;
  max-block-size: 8rem;
  padding: 0;
  overflow: auto;
  border: none;
  background-color: transparent;
}
</style>
