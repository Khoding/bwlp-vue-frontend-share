<template>
  <div class="step-basic-info">
    <div class="field label border">
      <input v-model="modelValue.imageName" required />
      <label>Image Name</label>
    </div>

    <div class="field textarea label border">
      <textarea v-model="modelValue.description" rows="4"></textarea>
      <label>Description</label>
    </div>

    <div class="field label border">
      <!-- OS Select now uses local osList -->
      <select v-model="modelValue.osId" disabled>
        <option v-for="os in osList" :key="os.osId" :value="os.osId">
          {{ os.osName }}
        </option>
      </select>
      <label>Operating System</label>
    </div>

    <!-- TODO: Since we use this specific structure so often in so many files,
          maybe we could extract it the way we extracted SwitchTitle
          that would greatly shorten the amount of code without affecting readability too much.
          By the way, with VSCode you can select the piece of code you want to extract
          and then CTRL+SHIFT+R and "Extract into new dumb component" -->
    <div class="field label border">
      <select v-model="modelValue.shareMode" @change="updateShareMode" disabled>
        <option v-for="shareMode in shareModes" :value="shareMode.value">
          {{ shareMode.label }}
        </option>
      </select>
      <label>Share Mode</label>
    </div>

    <SwitchTitle title="Is template" v-model="modelValue.isTemplate" />
  </div>
</template>

<script setup>
import {ref} from 'vue';

import SwitchTitle from '@/components/edit-create/SwitchTitle.vue';

import osListData from '@/assets/js/bwlp/osList.json';

const modelValue = defineModel({
  type: Object,
  required: true,
});

const osList = ref(osListData);

const shareModes = ref([
  {value: 0, label: 'LOCAL'},
  {value: 1, label: 'PUBLISH'},
  {value: 2, label: 'DOWNLOAD'},
  {value: 3, label: 'FROZEN'},
]);

const updateShareMode = event => {
  const shareMode = parseInt(event.target.value);
  modelValue.value.shareMode = shareMode;
};
</script>
