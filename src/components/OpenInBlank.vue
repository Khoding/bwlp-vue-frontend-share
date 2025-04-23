<template>
  <div class="tooltip">
    <p>This link will open in a new tab</p>
    <i>open_in_new</i>
  </div>
</template>

<style scoped>
.tooltip {
  /* We do this because otherwise it comes on top of the next element and it's terribly annoying */
  pointer-events: none;
}
</style>
