<template>
  <div class="step-basic-info grid">
    <div class="s12 l8">
      <div class="field label border">
        <input v-model="modelValue.lectureName" id="lectureName" name="lectureName" required />
        <label for="lectureName">Lecture Name</label>
      </div>
      <div class="field textarea label border">
        <textarea v-model="modelValue.description" id="description" name="description"></textarea>
        <label for="description">Description</label>
      </div>
    </div>

    <section class="date s12 l4">
      <div class="field label border">
        <input
          type="datetime-local"
          id="startDateTime"
          name="startDateTime"
          :value="startDateTime"
          @input="updateStartTime"
          required
        />
        <label for="startDateTime">Start Time</label>
      </div>

      <div class="field label border">
        <input
          type="datetime-local"
          id="endDateTime"
          name="endDateTime"
          :value="endDateTime"
          @input="updateEndTime"
          required
        />
        <label for="endDateTime">End Time</label>
      </div>
    </section>
  </div>
</template>

<script setup>
import {computed} from 'vue';

const modelValue = defineModel({
  type: Object,
  required: true,
});

const startDateTime = computed({
  get: () => {
    if (!modelValue.value.startTime) return '';
    return new Date(modelValue.value.startTime * 1000).toISOString().slice(0, 16);
  },
  set: value => {
    const data = {...modelValue.value};
    data.startTime = Math.floor(new Date(value).getTime() / 1000);
    modelValue.value = data;
  },
});

const endDateTime = computed({
  get: () => {
    if (!modelValue.value.endTime) return '';
    return new Date(modelValue.value.endTime * 1000).toISOString().slice(0, 16);
  },
  set: value => {
    const data = {...modelValue.value};
    data.endTime = Math.floor(new Date(value).getTime() / 1000);
    modelValue.value = data;
  },
});

const updateStartTime = e => (startDateTime.value = e.target.value);
const updateEndTime = e => (endDateTime.value = e.target.value);
</script>

<style scoped>
/* Bro modern CSS is so elegant, just look at this */

/* .step-basic-info {
  container-name: form-container;
  container-type: inline-size;

  .date {
    display: flex;
    column-gap: 1rem;

    > .field {
      max-inline-size: fit-content;

      + .field {
        margin-block-start: 0;
      }
    }
  }
}

@container form-container (inline-size < 32rem) {
  .date {
    flex-direction: column;
  }
} */
</style>
