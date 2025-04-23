<template>
  <section>
    <h1>404 — Page doesn't exist</h1>
    <p>The page you're looking for doesn't exist</p>
    <p v-if="redirecting">
      You will be redirected to Image List page in
      <strong>
        {{ timeLeft }}
        {{ secondText }} </strong
      >…
    </p>
    <p><RouterLink to="/image" class="link underline ripple">Go back to Image List</RouterLink>.</p>
  </section>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const timeLeft = ref(100);
const secondText = ref('secondes');
const redirecting = ref(true);

let timer;

onMounted(() => {
  timer = setInterval(() => {
    timeLeft.value--;

    if (timeLeft.value === 1) {
      secondText.value = 'seconde';
    }

    if (timeLeft.value === 0) {
      clearInterval(timer);
      redirecting.value = false;
      router.push('/image');
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
