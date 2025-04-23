<template>
  <nav class="m l left drawer scroll">
    <NavigationHeader />
    <ListOfPages />
  </nav>
</template>

<script setup lang="ts">
import ListOfPages from '@/components/navigation/ListOfPages.vue';
import NavigationHeader from '@/components/navigation/NavigationHeader.vue';
</script>
