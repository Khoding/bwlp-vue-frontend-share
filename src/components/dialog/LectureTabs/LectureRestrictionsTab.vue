<template>
  <p>
    <strong>
      Legen Sie hier fest, ob die Veranstaltung den Zugriff auf Speichermedien (CD, USB, ...)
      erlauben soll.
    </strong>
  </p>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="lecture.hasUsbAccess"
      :id="`has_usb_access-${lecture.lectureId}`"
      :name="`has_usb_access-${lecture.lectureId}`"
      disabled
    />
    <span class="wrap">Externe Speichermedien zulassen</span>
  </label>

  <p><strong>Markieren Sie diese Veranstaltung als E-Prüfung.</strong></p>

  <p>
    Die Prüfung wird nur dann startbar sein, wenn Leerpool.nrw in den Prüfungsmodus versetzt wird.
    Kontaktieren Sie dazu Ihren lokalen Leerpool.nrw-Administrator.
  </p>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="lecture.isExam"
      :id="`is_exam-${lecture.lectureId}`"
      :name="`is_exam-${lecture.lectureId}`"
      disabled
    />
    <span class="wrap">Externe Speichermedien zulassen</span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
