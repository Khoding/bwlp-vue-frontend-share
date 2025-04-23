<template>
  <p>
    Hier können Sie Netzlaufwerke angeben, die automatisch beim Start der Veranstaltung eingebunden
    werden sollen. Der Platzhalter
    <code>%loginuser%</code> wird im Pfad durch den Loginnamen des Nutzers ersetzt.
  </p>
  <div v-if="!isEmpty(lecture.ldapFilters)" class="auto-height surface scroll">
    <table class="stripes">
      <thead class="fixed">
        <tr>
          <th>Name</th>
          <th>Attribut</th>
          <th>Wert</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ldapFilter in lecture.ldapFilters">
          <td v-for="element in ldapFilter">
            <!-- No idea if that works as there seems to be no data? -->
            {{ element }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {isEmpty} from '@/utils/isEmpty';

defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
