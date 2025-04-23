<template>
  <div v-if="lecture" class="surface auto-height scroll">
    <table class="stripes">
      <tbody>
        <tr>
          <td>Beschreibung</td>
          <td colspan="3">
            <BasicPre :text="lecture.description" />
          </td>
        </tr>
        <tr>
          <td>Besitzer</td>
          <td colspan="3">{{ ownerName }}</td>
        </tr>
        <tr>
          <td>Erstellt am</td>
          <td colspan="3">
            {{ formatDate(1700000000 * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
        </tr>
        <tr>
          <td>Geändert am</td>
          <td>
            {{ formatDate(1700000000 * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
          <td><strong>durch</strong></td>
          <td>{{ updaterName }}</td>
        </tr>
        <tr>
          <td>Verknüpfte VM</td>
          <td colspan="3">{{ lecture.imageVersionId }}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td colspan="3">{{ lecture.lectureId }}</td>
        </tr>
        <tr>
          <td>Startdatum</td>
          <td colspan="3">
            {{ formatDate(lecture.startTime * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
        </tr>
        <tr>
          <td>Enddatum</td>
          <td colspan="2">
            {{ formatDate(lecture.endTime * 1000, 'DD.MM.YYYY, HH:mm') }}
          </td>
          <td>
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="lecture.isEnabled"
                :id="`event_is_active-${lecture.lectureId}`"
                :name="`event_is_active-${lecture.lectureId}`"
                disabled
              />
              <span>Veranstaltung aktiv</span>
            </label>
          </td>
        </tr>
        <tr>
          <td>VM-Version</td>
          <td colspan="3">
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="lecture.autoUpdate"
                :id="`always_use_latest-${lecture.lectureId}`"
                :name="`always_use_latest-${lecture.lectureId}`"
                disabled
              />
              <span>Immer aktuellste Version verwenden</span>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useDateFormat} from '@vueuse/core';
import BasicPre from '@/components/BasicPre.vue';

import usersData from '@/assets/js/bwlp/fetchUsers.json';

const props = defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});

const formatDate = (timestamp: number, format: string) => {
  return useDateFormat(timestamp, format).value;
};

const getLocalUserFullName = (userId: string): string => {
  if (!userId || !props.lecture) return 'N/A';
  const user = usersData.find(u => u.userId === userId);
  return user && user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`.trim()
    : userId;
};

const ownerName = computed(() => {
  return getLocalUserFullName(props.lecture?.ownerId);
});

const updaterName = computed(() => {
  return getLocalUserFullName(props.lecture?.updaterId);
});
</script>
