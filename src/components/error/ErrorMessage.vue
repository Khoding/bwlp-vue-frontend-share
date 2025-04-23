<template>
  <article v-if="error" class="large-text bold error center-align">
    {{ error?.message || defaultMessage }}
  </article>
</template>

<script setup>
defineProps({
  error: {
    type: [Object, String],
    required: true,
  },
  defaultMessage: {
    type: String,
    required: true,
  },
});
</script>
