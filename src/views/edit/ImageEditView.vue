<template>
  <div>
    <ErrorMessage v-if="error" :error="error" default-message="Unable to load or update image" />

    <ItemDataPre v-if="devMode" :item-data="itemData" />

    <!-- Display name only after data is loaded -->
    <h1 v-if="itemData.imageBaseId">Edit {{ itemData.imageName }}</h1>
    <h1 v-else>Loading Image...</h1>

    <!-- Only show form once data is loaded -->
    <form v-if="itemData.imageBaseId" @submit.prevent="saveItem">
      <ProgressIndicator v-model:currentStep="currentStep" :steps="steps" />

      <article class="large scroll">
        <Transition name="page-slide-fast" mode="out-in">
          <ImageStep1BasicInfo v-if="currentStep === 1" v-model="itemData" />
          <ImageStep2Permissions v-else-if="currentStep === 2" v-model="itemData" />
        </Transition>
      </article>

      <EditNavigationButtons
        :prev-step="prevStep"
        :next-step="nextStep"
        :current-step="currentStep"
        :total-steps="steps.length"
      />
    </form>
    <p v-else-if="!error">Loading image data...</p>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import imageListData from '@/assets/js/bwlp/imageList.json';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import ItemDataPre from '@/components/ItemDataPre.vue';
import ProgressIndicator from '@/components/edit-create/steps/steps-components/ProgressIndicator.vue';
import EditNavigationButtons from '@/components/edit-create/steps/steps-components/EditNavigationButtons.vue';

import ImageStep1BasicInfo from '@/components/edit-create/steps/edit/image/ImageStep1BasicInfo.vue';
import ImageStep2Permissions from '@/components/edit-create/steps/edit/image/ImageStep2Permissions.vue';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const devMode = ref(import.meta.env.VITE_DEVELOPMENT_MODE === 'true');

const steps = ref(['Basic Info', 'Permissions']);

const itemData = ref({
  imageBaseId: '',
  latestVersionId: null,
  versions: [],
  imageName: '',
  description: '',
  tags: [],
  osId: 0,
  virtId: 'vmware',
  createTime: 0,
  updateTime: 0,
  ownerId: '',
  updaterId: '',
  shareMode: 0,
  isTemplate: false,
  defaultPermissions: {
    link: false,
    download: false,
    edit: false,
    admin: false,
  },
  userPermissions: {
    link: false,
    download: false,
    edit: false,
    admin: false,
  },
});

const error = ref(null);
const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < steps.value.length) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const loadImageData = (imageId: string) => {
  const foundImage = imageListData.find(img => img.imageBaseId === imageId);
  if (foundImage) {
    itemData.value = structuredClone(foundImage);
    error.value = null;
  } else {
    console.error(`Image with ID ${imageId} not found in local data.`);
    error.value = `Image with ID ${imageId} not found.`;
    itemData.value.imageBaseId = '';
  }
};

onMounted(() => {
  const imageId = route.params.id as string;
  if (imageId) {
    loadImageData(imageId);
  } else {
    error.value = 'No image ID provided in the route.';
    console.error('No image ID in route params.');
  }
});

const saveItem = async () => {
  error.value = null;
  try {
    console.log('--- Simulating Save ---');
    console.log('Updated Image Data:', JSON.parse(JSON.stringify(itemData.value)));
    console.log('-----------------------');
    router.replace({name: 'ImageList'});
  } catch (err) {
    console.error('Error during simulated save:', err);
    error.value = 'An unexpected error occurred during save simulation.';
  }
};
</script>

<style scoped>
form {
  max-inline-size: 860px;
  margin: 0 auto;
}
</style>
