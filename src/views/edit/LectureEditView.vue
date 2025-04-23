<template>
  <div>
    <ErrorMessage v-if="error" :error="error" default-message="Unable to load or update lecture" />

    <ItemDataPre v-if="devMode" :item-data="itemData" />

    <!-- Display name only after data is loaded -->
    <h1 v-if="itemData.lectureId">Edit {{ itemData.lectureName }}</h1>
    <h1 v-else>Loading Lecture...</h1>

    <!-- Only show form once data is loaded -->
    <form v-if="itemData.lectureId" @submit.prevent="saveItem">
      <ProgressIndicator v-model:currentStep="currentStep" :steps="steps" />

      <article class="large scroll">
        <Transition name="page-slide-fast" mode="out-in">
          <!-- Ensure these step components use v-model correctly -->
          <Step1BasicInfo v-if="currentStep === 1" v-model="itemData" />
          <Step2Permissions v-else-if="currentStep === 2" v-model="itemData" />
          <Step3Network v-else-if="currentStep === 3" v-model="itemData" />
          <Step4Advanced v-else-if="currentStep === 4" v-model="itemData" />
        </Transition>
      </article>

      <EditNavigationButtons
        :prev-step="prevStep"
        :next-step="nextStep"
        :current-step="currentStep"
        :total-steps="steps.length"
      />
    </form>
    <p v-else-if="!error">Loading lecture data...</p>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import lectureListData from '@/assets/js/bwlp/lectureList.json';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import ItemDataPre from '@/components/ItemDataPre.vue';

import ProgressIndicator from '@/components/edit-create/steps/steps-components/ProgressIndicator.vue';
import Step1BasicInfo from '@/components/edit-create/steps/edit/lecture/LectureStep1BasicInfo.vue';
import Step2Permissions from '@/components/edit-create/steps/edit/lecture/LectureStep2Permissions.vue';
import Step3Network from '@/components/edit-create/steps/edit/lecture/LectureStep3Network.vue';
import Step4Advanced from '@/components/edit-create/steps/edit/lecture/LectureStep4Advanced.vue';
import EditNavigationButtons from '@/components/edit-create/steps/steps-components/EditNavigationButtons.vue';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const devMode = ref(import.meta.env.VITE_DEVELOPMENT_MODE === 'true');

const steps = ref(['Basic Info', 'Permissions', 'Network', 'Advanced']);

const itemData = ref({
  lectureId: '',
  lectureName: '',
  description: '',
  imageVersionId: '',
  imageBaseId: '',
  isEnabled: false,
  startTime: 0,
  endTime: 0,
  lastUsed: 0,
  useCount: 0,
  ownerId: '',
  updaterId: '',
  isExam: false,
  hasInternetAccess: false,
  hasUsbAccess: false,
  autoUpdate: false,
  limitToLocations: false,
  defaultPermissions: {
    edit: false,
    admin: false,
  },
  userPermissions: {
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

const loadLectureData = (lectureId: string) => {
  const foundLecture = lectureListData.find(lec => lec.lectureId === lectureId);
  if (foundLecture) {
    itemData.value = structuredClone(foundLecture);
    error.value = null;
  } else {
    console.error(`Lecture with ID ${lectureId} not found in local data.`);
    error.value = `Lecture with ID ${lectureId} not found.`;
    itemData.value.lectureId = '';
  }
};

onMounted(() => {
  const lectureId = route.params.id as string;
  if (lectureId) {
    loadLectureData(lectureId);
  } else {
    error.value = 'No lecture ID provided in the route.';
    console.error('No lecture ID in route params.');
  }
});

const saveItem = async () => {
  error.value = null;
  try {
    console.log('--- Simulating Save ---');
    console.log('Updated Lecture Data:', JSON.parse(JSON.stringify(itemData.value)));
    console.log('-----------------------');
    router.replace({name: 'LectureList'});
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
