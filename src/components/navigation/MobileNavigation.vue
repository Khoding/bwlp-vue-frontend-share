<template>
  <button data-ui="#mobile-navigation-dialog" class="s circle transparent">
    <i>menu</i>
  </button>

  <dialog id="mobile-navigation-dialog" class="left no-padding">
    <nav class="drawer">
      <NavigationHeader :mobile_nav="true" />
      <ListOfPages :mobile_nav="true" />
    </nav>
  </dialog>
</template>

<script setup lang="ts">
import ListOfPages from '@/components/navigation/ListOfPages.vue';
import NavigationHeader from '@/components/navigation/NavigationHeader.vue';
</script>

<style scoped>
@media (min-width: 601px) {
  #mobile-navigation-dialog.active[open],
  :global([data-ui='#mobile-navigation-dialog'].active + .overlay.active) {
    display: none !important;
  }
}
</style>
