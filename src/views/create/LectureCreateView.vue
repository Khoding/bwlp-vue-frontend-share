<template>
  <div>
    <ErrorMessage v-if="error" :error="error" default-message="Unable to create lecture" />

    <ItemDataPre v-if="devMode" :item-data="itemData" />

    <h1>Create Lecture</h1>

    <form @submit.prevent="saveItem">
      <ProgressIndicator v-model:currentStep="currentStep" :steps="steps" />

      <article class="large scroll">
        <Transition name="page-slide-fast" mode="out-in">
          <Step1BasicInfo v-if="currentStep === 1" v-model="itemData" />
        </Transition>
      </article>

      <EditNavigationButtons
        :prev-step="prevStep"
        :next-step="nextStep"
        :current-step="currentStep"
        :total-steps="steps.length"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import ItemDataPre from '@/components/ItemDataPre.vue';

import ProgressIndicator from '@/components/edit-create/steps/steps-components/ProgressIndicator.vue';
import Step1BasicInfo from '@/components/edit-create/steps/create/lecture/LectureStep1BasicInfo.vue';
import EditNavigationButtons from '@/components/edit-create/steps/steps-components/EditNavigationButtons.vue';

const router = useRouter();
const authStore = useAuthStore();
const devMode = ref(import.meta.env.VITE_DEVELOPMENT_MODE === 'true');

const steps = ref(['Basic Info']);

const itemData = ref({
  lectureName: '',
  description: '',
  imageVersionId: null,
  imageBaseId: null,
  startTime: null,
  endTime: null,
  isEnabled: true,
  isExam: false,
  hasInternetAccess: true,
  hasUsbAccess: true,
  autoUpdate: false,
  limitToLocations: false,
  defaultPermissions: {
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

const saveItem = async () => {
  error.value = null;
  try {
    console.log('--- Simulating Lecture Creation ---');
    const dataToLog = {
      ...itemData.value,
      lectureId: `local-${Date.now()}`,
      ownerId: authStore.userId || 'local-user',
      updaterId: authStore.userId || 'local-user',
      createTime: Math.floor(Date.now() / 1000),
      updateTime: Math.floor(Date.now() / 1000),
    };
    console.log('Lecture Data to Create:', JSON.parse(JSON.stringify(dataToLog)));
    console.log('---------------------------------');

    router.push({name: 'LectureList'});
  } catch (err) {
    console.error('Error during simulated creation:', err);
    error.value = 'An unexpected error occurred during creation simulation.';
  }
};
</script>

<style scoped>
form {
  max-inline-size: 860px;
  margin: 0 auto;
}
</style>
