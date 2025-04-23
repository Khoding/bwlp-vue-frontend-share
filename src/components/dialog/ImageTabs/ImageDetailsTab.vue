<template>
  <div v-if="image" class="surface auto-height scroll">
    <table class="stripes">
      <thead>
        <tr>
          <th>Data</th>
          <th colspan="3">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Beschreibung</td>
          <td colspan="3">{{ image.description }}</td>
        </tr>
        <tr>
          <td>Besitzer</td>
          <td colspan="3">{{ ownerName }}</td>
        </tr>
        <tr>
          <td>Erstellt am</td>
          <td colspan="3">
            {{ formatDate(image.createTime * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
        </tr>
        <tr>
          <td>Geändert am</td>
          <td>
            {{ formatDate(image.updateTime * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
          <td><strong>durch</strong></td>
          <td>{{ updaterName }}</td>
        </tr>
        <tr>
          <td>Betriebssystem</td>
          <td colspan="3">{{ osName }}</td>
        </tr>
        <tr>
          <td>Freigabemodus</td>
          <td colspan="2">{{ image.shareMode }}</td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="image.isTemplate"
                :id="`image_is_template-${image.imageBaseId}`"
                :name="`image_is_template-${image.imageBaseId}`"
                disabled
              />
              <span>Vorlage</span>
            </label>
          </td>
        </tr>
        <tr>
          <td>Latest version ID</td>
          <td colspan="2">{{ image.latestVersionId || 'N/A' }}</td>
          <td>OSVDI Link Removed</td>
        </tr>
        <tr>
          <td>VM-ID</td>
          <td colspan="3">{{ image.imageBaseId }}</td>
        </tr>
        <tr>
          <td>Virtualisierer</td>
          <td colspan="3">
            {{ image.virtId }}
            <VirtLogo :virt="image.virtId" :display-tooltip="false" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useDateFormat} from '@vueuse/core';

import VirtLogo from '@/components/VirtLogo.vue';

import usersData from '@/assets/js/bwlp/fetchUsers.json';
import osListData from '@/assets/js/bwlp/osList.json';

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
});

const formatDate = (timestamp: number, format: string) => {
  return useDateFormat(timestamp, format).value;
};

const getLocalUserFullName = (userId: string): string => {
  if (!userId || !props.image) return 'N/A';
  const user = usersData.find(u => u.userId === userId);
  return user && user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`.trim()
    : userId;
};

const getLocalOSName = (osId: number): string => {
  const os = osListData.find(o => o.osId === osId);
  return os ? os.osName : `Unknown OS (${osId})`;
};

const ownerName = computed(() => {
  return getLocalUserFullName(props.image?.ownerId);
});

const updaterName = computed(() => {
  return getLocalUserFullName(props.image?.updaterId);
});

const osName = computed(() => {
  return getLocalOSName(props.image?.osId);
});
</script>
