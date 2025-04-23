<template>
  <nav class="top-margin">
    <button
      type="button"
      class="border secondary-border secondary-text"
      @click="prevStep"
      :disabled="currentStep <= 1"
    >
      <i>arrow_back</i>
      <span>Previous</span>
    </button>

    <button
      type="button"
      class="border primary-border"
      @click="nextStep"
      :disabled="currentStep >= totalSteps"
    >
      <span>Next</span>
      <i>arrow_forward</i>
    </button>

    <div class="max"></div>

    <button type="submit" class="primary">
      <i>save</i>
      <span>Save</span>
    </button>
  </nav>
</template>

<script setup>
defineProps({
  prevStep: {
    type: Function,
    required: true,
  },
  nextStep: {
    type: Function,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
});

const currentStep = defineModel('currentStep', {required: true});
</script>
