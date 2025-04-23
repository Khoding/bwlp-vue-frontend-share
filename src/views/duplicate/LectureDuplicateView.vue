<template>
  <div>
    <ErrorMessage
      v-if="error"
      :error="error"
      default-message="Unable to load or duplicate lecture"
    />

    <h1>Duplicate Lecture</h1>

    <article v-if="loading" class="info">
      <div class="preloader"></div>
      <p>Loading lecture data...</p>
    </article>

    <!-- Only show confirmation if data loaded successfully -->
    <article v-else-if="itemData.lectureId">
      <h2>Confirm Duplication</h2>
      <p>
        Are you sure you want to duplicate the lecture
        <span class="bold">{{ originalName }}</span
        >?
      </p>
      <p>
        The new lecture will be named: <span class="bold">{{ itemData.lectureName }}</span>
      </p>

      <div class="top-margin padding">
        <p><span class="bold">Description:</span> {{ itemData.description }}</p>
        <p>
          <span class="bold">Start Time:</span>
          {{ formatDate(itemData.startTime * 1000, 'DD.MM.YYYY, HH:mm') }}
        </p>
        <p>
          <span class="bold">End Time:</span>
          {{ formatDate(itemData.endTime * 1000, 'DD.MM.YYYY, HH:mm') }}
        </p>
        <!-- Add other relevant fields to confirm -->
      </div>

      <nav class="right-align">
        <button class="primary ripple" @click="duplicateLecture">
          <i>content_copy</i>
          Duplicate Lecture
        </button>
        <button class="border ripple" @click="goBack">
          <i>arrow_back</i>
          Cancel
        </button>
      </nav>
    </article>
    <!-- Show message if loading finished but no data (error occurred) -->
    <p v-else-if="!loading && !itemData.lectureId">Could not load lecture data to duplicate.</p>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';
import {useDateFormat} from '@vueuse/core';
import ErrorMessage from '@/components/error/ErrorMessage.vue';

import lectureListData from '@/assets/js/bwlp/lectureList.json';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore(); // Keep for potential auth checks

const itemData = ref({
  lectureId: '', // Use this to check if data loaded
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
const originalName = ref(''); // To store the original name before adding "(Copy)"
const error = ref(null);
const loading = ref(true);

onMounted(() => {
  loading.value = true;
  error.value = null;
  const lectureIdToDuplicate = route.params.id as string;

  if (!lectureIdToDuplicate) {
    error.value = 'No lecture ID provided in the route to duplicate.';
    loading.value = false;
    return;
  }

  try {
    const foundLecture = lectureListData.find(lec => lec.lectureId === lectureIdToDuplicate);

    if (foundLecture) {
      const clonedData = structuredClone(foundLecture);

      originalName.value = clonedData.lectureName;

      clonedData.lectureName = `${clonedData.lectureName} (Copy)`;
      itemData.value = clonedData;
    } else {
      console.error(`Lecture with ID ${lectureIdToDuplicate} not found in local data.`);
      error.value = `Lecture with ID ${lectureIdToDuplicate} not found.`;
      itemData.value.lectureId = '';
    }
  } catch (err) {
    console.error('Failed to process lecture data:', err);
    error.value = 'An error occurred while loading lecture data.';
    itemData.value.lectureId = '';
  } finally {
    loading.value = false;
  }
});

const duplicateLecture = async () => {
  error.value = null;
  try {
    const dataToCreate = {...itemData.value};

    console.log('--- Simulating Lecture Duplication (Creation) ---');
    const dataToLog = {
      ...dataToCreate,
      lectureId: `local-dup-${Date.now()}`,
      ownerId: authStore.userId || 'local-user',
      updaterId: authStore.userId || 'local-user',
      createTime: Math.floor(Date.now() / 1000),
      updateTime: Math.floor(Date.now() / 1000),
    };
    console.log('Duplicated Lecture Data:', JSON.parse(JSON.stringify(dataToLog)));
    console.log('------------------------------------------');

    router.push({name: 'LectureList'});
  } catch (err) {
    console.error('Error during simulated duplication:', err);
    error.value = 'An unexpected error occurred during duplication simulation.';
  }
};

const goBack = () => {
  router.back();
};

const formatDate = (timestamp: number, format: string) => {
  if (!timestamp) return 'N/A';
  return useDateFormat(timestamp * 1000, format).value;
};
</script>
