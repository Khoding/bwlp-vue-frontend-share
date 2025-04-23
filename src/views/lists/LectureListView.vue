<template>
  <div>
    <template v-if="['LectureList', 'LectureDetail'].includes($route.name as string)">
      <ErrorMessage
        v-if="error"
        :error="error"
        default-message="There's been an error loading lecture data"
      />

      <SortableTable
        v-if="lectureList.length > 0"
        :items="lectureList"
        :columns="columns"
        item-key="lectureId"
        item-label="lectures"
        @row-click="openModal"
        :footer-colspan="columns.length - 2"
        create-route="LectureCreate"
      />
      <p v-else-if="!error && !isLoading">No lectures found.</p>
      <p v-if="isLoading">Loading lectures...</p>

      <DetailDialog
        v-if="selectedLecture"
        id="lecture-dialog"
        :title="selectedLecture?.lectureName"
        :edit-route="{
          name: 'LectureEdit',
          params: {id: selectedLecture?.lectureId},
        }"
        :duplicate-route="{
          name: 'LectureDuplicate',
          params: {id: selectedLecture?.lectureId},
        }"
        :is-open="showModal"
        :tabs="
          lectureTabs.map(tab => ({
            ...tab,
            props: tab.props(selectedLecture, lectureLocations, lecturePermissions),
          }))
        "
        @close-wanted="handleCloseDialog"
      />
    </template>

    <RouterView v-slot="{Component}">
      <Transition name="page-slide" mode="out-in">
        <template v-if="!['LectureList', 'LectureDetail'].includes($route.name as string)">
          <component :is="Component"></component>
        </template>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import {useRouter, useRoute, onBeforeRouteUpdate} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';
import {useDateFormat} from '@vueuse/core';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import SortableTable from '@/components/SortableTable.vue';
import DetailDialog from '@/components/dialog/DetailDialog.vue';

import lectureListData from '@/assets/js/bwlp/lectureList.json';
import lectureLocationsData from '@/assets/js/bwlp/LectureLocations.json';

const formatDate = (timestamp: number, format: string) => {
  return useDateFormat(timestamp, format).value;
};

const columns = [
  {
    field: 'lectureName',
    label: 'Lecture Name',
  },
  {
    field: 'ownerId',
    label: 'Owner',
    class: 'min',
  },
  {
    field: 'startTime',
    label: 'Start Time',
    class: 'min',
    formatter: value => (value > 0 ? formatDate(value * 1000, 'DD.MM.YYYY, HH:mm') : '-'),
  },
  {
    field: 'endTime',
    label: 'End Time',
    class: 'min',
    formatter: value => (value > 0 ? formatDate(value * 1000, 'DD.MM.YYYY, HH:mm') : '-'),
  },
  {
    field: 'isEnabled',
    label: 'Activated',
    class: 'min',
  },
];

import LectureDetailsTab from '@/components/dialog/LectureTabs/LectureDetailsTab.vue';
import LectureRestrictionsTab from '@/components/dialog/LectureTabs/LectureRestrictionsTab.vue';
import LectureFirewallTab from '@/components/dialog/LectureTabs/LectureFirewallTab.vue';
import LectureRoomSelectionTab from '@/components/dialog/LectureTabs/LectureRoomSelectionTab.vue';
import LectureVMStartTab from '@/components/dialog/LectureTabs/LectureVMStartTab.vue';
import LectureNetworkDrivesTab from '@/components/dialog/LectureTabs/LectureNetworkDrivesTab.vue';
import LectureLDAPFilterTab from '@/components/dialog/LectureTabs/LectureLDAPFilterTab.vue';
import ImageLecturePermissionsTab from '@/components/dialog/ImageLecturePermissionsTab.vue';

const lectureTabs = [
  {
    id: 'details',
    icon: 'info',
    label: 'Allgemein',
    component: LectureDetailsTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'restrictions',
    icon: 'folder_limited',
    label: 'Beschränkungen',
    component: LectureRestrictionsTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'firewall',
    icon: 'local_fire_department',
    label: 'Firewall',
    component: LectureFirewallTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'room-selection',
    icon: 'room_preferences',
    label: 'Raumauswahl',
    component: LectureRoomSelectionTab,
    props: (lecture, locations) => ({lecture, locations}),
  },
  {
    id: 'vm-start',
    icon: 'line_start_circle',
    label: 'VM-Start',
    component: LectureVMStartTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'permissions',
    icon: 'key',
    label: 'Berechtigungen',
    component: ImageLecturePermissionsTab,
    props: (lecture, _, lecturePermissions) => ({
      permissions: lecturePermissions,
      defaultPermissions: lecture?.defaultPermissions,
    }),
  },
  {
    id: 'network-drives',
    icon: 'cloud',
    label: 'Netzlaufwerke',
    component: LectureNetworkDrivesTab,
    props: lecture => ({lecture}),
  },
  {
    id: 'ldap-filter',
    icon: 'filter_alt',
    label: 'LDAP-Filter',
    component: LectureLDAPFilterTab,
    props: lecture => ({lecture}),
  },
];

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const lectureList = ref([]);
const error = ref('');
const showModal = ref(false);
const selectedLecture = ref(null);
const lectureLocations = ref(lectureLocationsData);
const lecturePermissions = ref({});
const isLoading = ref(false);

const loadLectures = async () => {
  isLoading.value = true;
  error.value = '';
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    lectureList.value = lectureListData;
  } catch (err) {
    console.error('Failed to load lectures:', err);
    error.value = 'Failed to load lectures from JSON.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (!authStore.authToken) {
    router.push('/login');
  } else {
    loadLectures().then(() => {
      if (route.name === 'LectureDetail' && route.params.id) {
        loadLectureById(route.params.id as string);
      }
    });
  }
});

const loadLectureById = async (lectureId: string) => {
  error.value = '';
  try {
    console.log(`loadLectureById called for: ${lectureId}`);
    const lectureInList = lectureList.value.find(lec => lec.lectureId === lectureId);

    if (!lectureInList && lectureList.value.length > 0) {
      console.warn(`Lecture ID ${lectureId} not found in the initial list.`);
    }

    const details = lectureInList;
    const permissions = {
      edit:
        lectureInList?.userPermissions?.edit || lectureInList?.defaultPermissions?.edit || false,
      admin:
        lectureInList?.userPermissions?.admin || lectureInList?.defaultPermissions?.admin || false,
    };

    if (details) {
      selectedLecture.value = details;
      lecturePermissions.value = permissions;
      console.log(`loadLectureById: Setting showModal = true for ${lectureId}`);
      showModal.value = true;
    } else {
      console.error(`Details not found for lecture ID: ${lectureId}`);
      error.value = `Details for lecture ${lectureId} not found.`;
      selectedLecture.value = null;
      console.log(`loadLectureById: Setting showModal = false due to error for ${lectureId}`);
      showModal.value = false;
    }
  } catch (e) {
    console.error(`Error loading lecture ${lectureId}:`, e);
    error.value = `Failed to load details for lecture ${lectureId}.`;
    selectedLecture.value = null;
    console.log(`loadLectureById: Setting showModal = false due to error for ${lectureId}`);
    showModal.value = false;
  }
};

const openModal = async lecture => {
  if (!lecture || !lecture.lectureId) {
    error.value = 'Invalid lecture data provided.';
    console.error('Attempted to open modal with invalid lecture:', lecture);
    return;
  }
  error.value = '';
  try {
    console.log('openModal called for:', lecture.lectureId);
    selectedLecture.value = lecture;

    lecturePermissions.value = {
      edit: lecture.userPermissions?.edit || lecture.defaultPermissions?.edit || false,
      admin: lecture.userPermissions?.admin || lecture.defaultPermissions?.admin || false,
    };

    showModal.value = true;
  } catch (e) {
    console.error('Error opening modal:', e);
    error.value = `Failed to open details for lecture ${lecture.lectureName || lecture.lectureId}.`;
    selectedLecture.value = null;
    lecturePermissions.value = null;
    showModal.value = false;
  }
};

const handleCloseDialog = () => {
  console.log('handleCloseDialog called');
  showModal.value = false;
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (route.name === 'LectureDetail' && newId && newId !== oldId) {
      if (lectureList.value.length > 0) {
        loadLectureById(newId as string);
      } else {
        loadLectures().then(() => {
          loadLectureById(newId as string);
        });
      }
    }
  },
);

watch(
  () => route.name,
  (newRouteName, oldRouteName) => {
    console.log(`Route name changed from ${oldRouteName} to ${newRouteName}`);
    if (newRouteName === 'LectureDetail' && route.params.id) {
      const lectureId = route.params.id as string;
      if (!selectedLecture.value || selectedLecture.value.lectureId !== lectureId) {
        console.log(`Route name watcher: Loading lecture ${lectureId} for direct access/mismatch.`);
        if (lectureList.value.length > 0) {
          loadLectureById(lectureId);
        } else {
          loadLectures().then(() => loadLectureById(lectureId));
        }
      } else if (!showModal.value && selectedLecture.value?.lectureId === lectureId) {
        console.log(`Route name watcher: Re-opening modal for ${lectureId}`);
        showModal.value = true;
      }
    } else if (newRouteName === 'LectureList' && oldRouteName === 'LectureDetail') {
      console.log('Route name watcher: Navigated back to list.');
      if (showModal.value) {
        handleCloseDialog();
      }
      selectedLecture.value = null;
      lecturePermissions.value = {};
    }
  },
  {immediate: true},
);

onBeforeRouteUpdate((to, from) => {
  if (!to.path.startsWith('/lecture') && from.path.startsWith('/lecture')) {
    showModal.value = false;
    selectedLecture.value = null;
    lecturePermissions.value = {};
  }
});
</script>
