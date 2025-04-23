<template>
  <div v-if="!isEmpty(permissions)" class="auto-height surface scroll">
    <table class="stripes">
      <thead class="fixed">
        <tr>
          <th>Benutzer</th>
          <th>Verlinken</th>
          <th>Download</th>
          <th>Bearbeiten</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, user_info) in permissions" :key="user_info">
          <td class="max">{{ user_info }}</td>
          <td v-for="(permission, index) in user" :key="permission" class="min">
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="permission"
                :id="`permission-${user_info}-${index}`"
                :name="`permission-${user_info}-${index}`"
                disabled
              />
              <span></span>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <section v-if="defaultPermissions">
    <h6>Andere Nutzer</h6>
    <p>Hier können Sie die Rechte für nicht in der Liste angegebene Nutzer festlegen</p>
    <label
      v-for="(defaultPermission, label, index) in defaultPermissions"
      :key="label"
      class="checkbox"
    >
      <input
        type="checkbox"
        :checked="defaultPermission"
        :id="`defaultPermission-${index}`"
        :name="`defaultPermission-${index}`"
        disabled
      />
      <span class="capitalize">{{ label }}</span>
    </label>
  </section>
</template>

<script setup lang="ts">
import {isEmpty} from '@/utils/isEmpty';

defineProps({
  permissions: {
    type: Object,
    required: true,
  },
  defaultPermissions: {
    type: Object,
    required: true,
  },
});
</script>
