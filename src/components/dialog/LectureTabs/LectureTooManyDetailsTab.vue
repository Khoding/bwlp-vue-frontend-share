<template>
  <div v-if="lecture">
    Temporary tab just to show the lecture object:
    <div class="medium-height surface scroll">
      <pre>{{ JSON.stringify(lecture, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
