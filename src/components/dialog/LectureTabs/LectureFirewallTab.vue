<template>
  <p>
    <strong>
      Legen Sie hier fest, ob die Veranstaltung Zugriff zum Internet haben soll. In der Liste können
      Sie bestimmte Adressen und Services ein- oder ausschalten.
    </strong>
  </p>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="lecture.hasInternetAccess"
      :id="`has_internet_access-${lecture.lectureId}`"
      :name="`has_internet_access-${lecture.lectureId}`"
      disabled
    />
    <span class="wrap">Externe Speichermedien zulassen</span>
  </label>

  <p><strong>Netzwerkregeln</strong></p>
  <p>
    <strong class="red-text"> <i class="small">warning</i> Überprüfung noch nicht möglich </strong>
  </p>
  <p>
    Wenn Sie den Internetzugriff deaktiviert haben, können Sie hier Ausnahmen definieren
    (Whitelist). Bitte definieren Sie Ihre Regeln im Format
    <code>&lt;host&gt;</code> <code>&lt;port&gt;</code> <code>&lt;in|out&gt;</code>.
  </p>
  <p>Sie können Port 0 angeben, was sämtlichen TCP und UDP Ports eines Hosts entspricht.</p>
  <p>Wenn Sie Internetzugriff aktivieren, hat diese Liste den gegenteiligen Effekt (Blacklist).</p>

  <ul>
    <li v-for="exception in lecture.networkExceptions" :key="exception">
      {{ exception }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps({
  lecture: {
    type: Object,
    required: true,
  },
});
</script>
