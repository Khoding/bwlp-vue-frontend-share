<template>
  <div v-if="versions" class="auto-height surface scroll">
    <table class="stripes">
      <thead class="fixed">
        <tr>
          <th>Erstellungszeitpunkt</th>
          <th>Ablaufszeitpunkt</th>
          <th>Ersteller</th>
          <th>Verwendbar</th>
          <th>Größe</th>
          <th>Interne ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(version, index) in versions" :key="version.versionId">
          <td>
            {{ formatDate(version.createTime * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
          <td>
            {{ formatDate(version.expireTime * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
          <td>{{ getLocalUserFullName(version.uploaderId) }}</td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="version.isRestricted"
                :id="`version-${version.versionId}-${index}`"
                :name="`version-${version.versionId}-${index}`"
                disabled
              />
              <span>{{ version.isRestricted ? 'Verwendbar' : 'Nicht verwendbar' }}</span>
            </label>
          </td>
          <td>{{ humanFileSize(version.fileSize) }}</td>
          <td>{{ version.versionId }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {humanFileSize} from '@/utils/fileSize';
import {useDateFormat} from '@vueuse/core';

import OpenInBlank from '@/components/OpenInBlank.vue';

import usersData from '@/assets/js/bwlp/fetchUsers.json';

defineProps({
  versions: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const formatDate = (timestamp: number, format: string) => {
  return useDateFormat(timestamp, format).value;
};

const getLocalUserFullName = (userId: string): string => {
  if (!userId) return 'N/A';
  const user = usersData.find(u => u.userId === userId);
  return user && user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`.trim()
    : userId;
};
</script>
