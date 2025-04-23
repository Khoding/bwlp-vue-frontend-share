<template>
  <header>
    <nav>
      <MobileNavigation v-if="authStore.authToken" />

      <h5 class="l max center-align">Baden-Württemberg Lehrpool</h5>
      <div class="m max center-align"></div>
      <nav class="s max center-align">
        <img class="small" src="@/assets/img/bwLogo/bwLehrpool_small.png" alt="BWLP Logo" />
        <h5>BW Lehrpool</h5>
      </nav>
      <button data-ui="#theme-dialog" class="circle transparent">
        <i>palette</i>
      </button>

      <button class="m l border secondary-border secondary-text">
        <span>Menu</span>
        <i>arrow_drop_down</i>
        <menu class="border">
          <li v-if="authStore.authToken">
            <a href="#" @click.prevent="logout"> Logout </a>
          </li>
        </menu>
      </button>
    </nav>
  </header>

  <dialog id="theme-dialog" class="medium right">
    <header class="fixed">
      <nav>
        <h5 class="max">Themes</h5>
        <button class="transparent circle small" data-ui="#theme-dialog">
          <i>close</i>
        </button>
      </nav>
    </header>

    <ThemeSwitcher />
  </dialog>
</template>

<script setup lang="ts">
import {useRouter, Router} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import MobileNavigation from '@/components/navigation/MobileNavigation.vue';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher.vue';

const router: Router = useRouter();
const authStore = useAuthStore();

const logout = (): void => {
  authStore.clearToken();
  router.push('/login');
};
</script>
