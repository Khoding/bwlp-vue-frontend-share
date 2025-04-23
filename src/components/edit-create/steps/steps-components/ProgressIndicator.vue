<template>
  <nav class="scroll">
    <SingleStepNode
      v-for="(step, index) in steps"
      v-model:current-step="currentStep"
      :key="step"
      :step-number="index + 1"
      :text="step"
      :steps-count="steps.length"
    />
  </nav>
</template>

<script setup>
import SingleStepNode from '@/components/edit-create/steps/steps-components/SingleStepNode.vue';

defineProps({
  steps: {
    type: Object,
    required: true,
  },
});

const currentStep = defineModel('currentStep', {required: true});
</script>
