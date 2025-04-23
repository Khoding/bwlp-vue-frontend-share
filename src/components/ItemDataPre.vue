<template>
  <article class="scroll medium fill">
    <pre>{{ itemData }}</pre>
  </article>
</template>

<script setup>
defineProps({
  itemData: {
    type: Object,
    required: true,
  },
});
</script>
