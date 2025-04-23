<template>
  <div>
    <template v-if="['ImageList', 'ImageDetail'].includes($route.name as string)">
      <ErrorMessage
        v-if="error"
        :error="error"
        default-message="There's been an error loading image data"
      />

      <SortableTable
        v-if="imageList.length > 0"
        :items="imageList"
        :columns="columns"
        item-key="imageBaseId"
        item-label="Images"
        @row-click="openModal"
        :footer-colspan="columns.length - 2"
        create-route="ImageCreate"
      />
      <p v-else-if="!error && !isLoading">No images found.</p>
      <p v-if="isLoading">Loading images...</p>

      <DetailDialog
        v-if="selectedImage"
        id="image-dialog"
        :title="selectedImage?.imageName"
        :edit-route="{
          name: 'ImageEdit',
          params: {id: selectedImage?.imageBaseId},
        }"
        :is-open="showModal"
        :tabs="
          imageTabs.map(tab => ({
            ...tab,
            props: tab.props(selectedImage, imagePermissions),
          }))
        "
        @close-wanted="handleCloseDialog"
      />
    </template>

    <RouterView v-slot="{Component}">
      <Transition name="page-slide" mode="out-in">
        <template v-if="!['ImageList', 'ImageDetail'].includes($route.name as string)">
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

import imageListData from '@/assets/js/bwlp/imageList.json';
import allImageData from '@/assets/js/bwlp/ImageData.json';
import allImagePermissions from '@/assets/js/bwlp/ImagePermissions.json';

import ErrorMessage from '@/components/error/ErrorMessage.vue';
import SortableTable from '@/components/SortableTable.vue';
import DetailDialog from '@/components/dialog/DetailDialog.vue';
import ImageDetailsTab from '@/components/dialog/ImageTabs/ImageDetailsTab.vue';
import ImageVersionsTab from '@/components/dialog/ImageTabs/ImageVersionsTab.vue';
import ImageLecturePermissionsTab from '@/components/dialog/ImageLecturePermissionsTab.vue';

const columns = [
  {field: 'imageName', label: 'Image Name'},
  {field: 'osId', label: 'OS', class: 'min'},
  {field: 'ownerId', label: 'Owner', class: 'min'},
  {
    field: 'expireTime',
    label: 'Expire Time',
    class: 'min',
    formatter: value => (value > 0 ? formatDate(value * 1000, 'DD.MM.YYYY, HH:mm') : '-'),
  },
  {field: 'virtId', class: 'min'},
];

const formatDate = (timestamp: number, format: string) => {
  return useDateFormat(timestamp, format).value;
};

const imageTabs = [
  {
    id: 'details',
    icon: 'info',
    label: 'Details',
    component: ImageDetailsTab,
    props: image => ({image}),
  },
  {
    id: 'versions',
    icon: 'history',
    label: 'Versions',
    component: ImageVersionsTab,
    props: image => ({versions: image?.versions}),
  },
  {
    id: 'permissions',
    icon: 'key',
    label: 'Permissions',
    component: ImageLecturePermissionsTab,
    props: (image, imagePermissions) => ({
      permissions: imagePermissions,
      defaultPermissions: image?.defaultPermissions,
    }),
  },
];

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const imageList = ref([]);
const error = ref('');
const isLoading = ref(false);
const showModal = ref(false);
const selectedImage = ref(null);
const imagePermissions = ref({});

const findImageDetailsSupplement = id => {
  const supplementalData = allImageData.imageBaseId === id ? allImageData : null;
  return supplementalData ? {versions: supplementalData.versions} : {};
};

const findImagePermissionsSupplement = id => {
  return allImagePermissions[id] || {};
};

onMounted(() => {
  if (!authStore.authToken) {
    router.push('/login');
  } else {
    fetchImages().then(() => {
      if (route.name === 'ImageDetail' && route.params.id) {
        loadImageById(route.params.id as string);
      }
    });
  }
});

const fetchImages = async () => {
  isLoading.value = true;
  error.value = '';
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    imageList.value = imageListData;
    isLoading.value = false;
    return imageList.value;
  } catch (e) {
    console.error('Error loading image list:', e);
    error.value = 'Failed to load image list from JSON.';
    isLoading.value = false;
    return [];
  }
};

const loadImageById = async (imageId: string) => {
  error.value = '';
  try {
    const imageInList = imageList.value.find(img => img.imageBaseId === imageId);

    if (imageInList) {
      selectedImage.value = {
        ...imageInList,
        ...findImageDetailsSupplement(imageId),
      };

      imagePermissions.value = {
        link:
          imageInList.userPermissions?.link ??
          imageInList.defaultPermissions?.link ??
          findImagePermissionsSupplement(imageId).link ??
          false,
        download:
          imageInList.userPermissions?.download ??
          imageInList.defaultPermissions?.download ??
          findImagePermissionsSupplement(imageId).download ??
          false,
        edit:
          imageInList.userPermissions?.edit ??
          imageInList.defaultPermissions?.edit ??
          findImagePermissionsSupplement(imageId).edit ??
          false,
        admin:
          imageInList.userPermissions?.admin ??
          imageInList.defaultPermissions?.admin ??
          findImagePermissionsSupplement(imageId).admin ??
          false,
      };

      showModal.value = true;
    } else {
      console.error(`Image ID not found in list: ${imageId}`);
      error.value = `Image with ID ${imageId} not found.`;
      selectedImage.value = null;
      showModal.value = false;
    }
  } catch (e) {
    console.error(`Error loading image ${imageId}:`, e);
    error.value = `Failed to load details for image ${imageId}.`;
    selectedImage.value = null;
    showModal.value = false;
  }
};

const openModal = async image => {
  if (!image || !image.imageBaseId) {
    error.value = 'Invalid image data provided.';
    console.error('Attempted to open modal with invalid image:', image);
    return;
  }
  error.value = '';
  try {
    selectedImage.value = {
      ...image,
      ...findImageDetailsSupplement(image.imageBaseId),
    };

    imagePermissions.value = {
      link:
        image.userPermissions?.link ??
        image.defaultPermissions?.link ??
        findImagePermissionsSupplement(image.imageBaseId).link ??
        false,
      download:
        image.userPermissions?.download ??
        image.defaultPermissions?.download ??
        findImagePermissionsSupplement(image.imageBaseId).download ??
        false,
      edit:
        image.userPermissions?.edit ??
        image.defaultPermissions?.edit ??
        findImagePermissionsSupplement(image.imageBaseId).edit ??
        false,
      admin:
        image.userPermissions?.admin ??
        image.defaultPermissions?.admin ??
        findImagePermissionsSupplement(image.imageBaseId).admin ??
        false,
    };

    showModal.value = true;
  } catch (e) {
    console.error('Error opening image details:', e);
    error.value = `Failed to open details for image ${image.imageName || image.imageBaseId}.`;
    selectedImage.value = null;
    imagePermissions.value = {};
    showModal.value = false;
  }
};

const handleCloseDialog = () => {
  showModal.value = false;
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (route.name === 'ImageDetail' && newId && newId !== oldId) {
      if (imageList.value.length > 0) {
        loadImageById(newId as string);
      } else {
        fetchImages().then(() => {
          loadImageById(newId as string);
        });
      }
    }
  },
);

watch(
  () => route.name,
  (newRouteName, oldRouteName) => {
    if (newRouteName === 'ImageDetail' && route.params.id) {
      const imageId = route.params.id as string;
      if (!selectedImage.value || selectedImage.value.imageBaseId !== imageId) {
        if (imageList.value.length > 0) {
          loadImageById(imageId);
        } else {
          fetchImages().then(() => loadImageById(imageId));
        }
      } else if (!showModal.value && selectedImage.value?.imageBaseId === imageId) {
        showModal.value = true;
      }
    } else if (newRouteName === 'ImageList' && oldRouteName === 'ImageDetail') {
      if (showModal.value) {
        handleCloseDialog();
      }
      selectedImage.value = null;
      imagePermissions.value = {};
    }
  },
  {immediate: true},
);

onBeforeRouteUpdate((to, from) => {
  if (!to.path.startsWith('/image') && from.path.startsWith('/image')) {
    showModal.value = false;
    selectedImage.value = null;
    imagePermissions.value = {};
  }
});
</script>
