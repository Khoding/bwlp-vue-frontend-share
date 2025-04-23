<template>
  <div class="step-permissions">
    <h3>Default Permissions</h3>
    <div class="grid">
      <label class="checkbox s3">
        <input type="checkbox" v-model="modelValue.defaultPermissions.link" />
        <span>Link</span>
      </label>

      <label class="checkbox s3">
        <input type="checkbox" v-model="modelValue.defaultPermissions.download" />
        <span>Download</span>
      </label>

      <label class="checkbox s3">
        <input type="checkbox" v-model="modelValue.defaultPermissions.edit" />
        <span>Edit</span>
      </label>

      <label class="checkbox s3">
        <input type="checkbox" v-model="modelValue.defaultPermissions.admin" />
        <span>Admin</span>
      </label>
    </div>
  </div>
</template>

<script setup>
const modelValue = defineModel({
  type: Object,
  required: true,
});
</script>
