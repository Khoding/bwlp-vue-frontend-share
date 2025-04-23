<template>
  <div class="step-network">
    <SwitchTitle title="Internet Access" v-model="modelValue.hasInternetAccess" />

    <SwitchTitle title="USB Access" v-model="modelValue.hasUsbAccess" />
  </div>
</template>

<script setup>
import SwitchTitle from '@/components/edit-create/SwitchTitle.vue';

const modelValue = defineModel({
  type: Object,
  required: true,
});
</script>
