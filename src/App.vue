<template>
  <Navigation v-if="authStore.authToken" />
  <HeaderComponent />

  <main class="responsive">
    <!-- <RouterView :key="$route.fullPath"></RouterView> -->
    <RouterView v-slot="{Component}">
      <Transition name="page-slide" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </main>

  <Minigame v-if="activateMinigame" />
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue';
import {useAuthStore} from '@/stores/auth-store';
import {useThemeStore} from '@/stores/theme';
import {useMinigameActivated} from '@/stores/minigame';

import Navigation from '@/components/navigation/Navigation.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import Minigame from '@/components/Minigame.vue';

const authStore = useAuthStore();
const themeStore = useThemeStore();
const minigameStore = useMinigameActivated();

const activateMinigame = computed(() => minigameStore.isMinigameActivated);

onMounted(() => {
  themeStore.loadPersistedState();
});
</script>
