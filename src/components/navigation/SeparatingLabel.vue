<template>
  <hr v-if="separator" class="small" :class="onlyMobileClass" />

  <!-- We use a Label despite it being a weird choice because this is how Beer CSS does it for some reason ¯\_(ツ)_/¯ -->
  <label :class="onlyMobileClass">{{ text }}</label>
</template>

<script setup lang="ts">
interface SeparatingLabelProps {
  text: string;
  separator?: boolean;
  onlyMobileClass?: string;
}

withDefaults(defineProps<SeparatingLabelProps>(), {
  separator: true,
  onlyMobileClass: '',
});
</script>
