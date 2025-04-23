<template>
  <div class="step-basic-info">
    <div class="field label border">
      <input v-model="modelValue.lectureName" id="lectureName" name="lectureName" required />
      <label for="lectureName">Lecture Name</label>
    </div>

    <div class="field textarea label border">
      <textarea v-model="modelValue.description" id="description" name="description"></textarea>
      <label for="description">Description</label>
    </div>
  </div>
</template>

<script setup>
const modelValue = defineModel({
  type: Object,
  required: true,
});
</script>
