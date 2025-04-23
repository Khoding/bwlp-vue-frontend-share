<template>
  <span class="virt-logo" width="16px" height="16px" :class="virt">
    <span v-if="displayTooltip" class="tooltip left">{{ virt }}</span>
  </span>
</template>

<script setup>
const props = defineProps({
  virt: {
    type: String,
    required: true,
  },
  displayTooltip: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.virt-logo {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
}

.vmware {
  background-image: url('@/assets/img/virt-logo/vmware.png');
}

.qemukvm {
  background-image: url('@/assets/img/virt-logo/qemukvm.png');
}
</style>
