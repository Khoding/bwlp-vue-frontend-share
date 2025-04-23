<template>
  <RouterLink
    class="ripple"
    to="/image"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>aspect_ratio</i>
    <span class="max">{{ $t('imageList') }}</span>
    <OpenInBlank />
  </RouterLink>
  <RouterLink
    class="ripple"
    to="/lecture"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>school</i>
    <span>{{ $t('lectureList') }}</span>
    <OpenInBlank />
  </RouterLink>

  <SeparatingLabel :text="$t('legalStuff')" />
  <RouterLink
    class="ripple"
    to="/privacy-policy"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>policy</i>
    <span>{{ $t('privacyPolicy') }}</span>
    <OpenInBlank />
  </RouterLink>
  <RouterLink
    class="ripple"
    to="/user-agreement"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>handshake</i>
    <span>{{ $t('userAgreement.title') }}</span>
    <OpenInBlank />
  </RouterLink>

  <SeparatingLabel :text="$t('miscellaneous')" />
  <a
    class="ripple"
    href="https://www.bwlehrpool.de/wiki/doku.php/start"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>developer_guide</i>
    <span>bwLehrpool Wiki</span>
    <OpenInBlank />
  </a>

  <SeparatingLabel v-if="devMode" text="For the devs" />

  <a
    v-if="devMode"
    class="ripple"
    href="https://github.com/Khoding/bwlp-vue-frontend"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>code</i>
    <span>BWLP Vue Frontend Repository</span>
    <OpenInBlank />
  </a>
  <a
    v-if="devMode"
    class="ripple"
    href="https://github.com/Khoding/bwlp-frontend"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>code</i>
    <span>Old Frontend Repo (archive)</span>
    <OpenInBlank />
  </a>
  <a
    v-if="devMode"
    class="ripple"
    href="https://vuejs.org/guide/introduction.html"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>visibility</i>
    <span>Vue.js documentation</span>
    <OpenInBlank />
  </a>
  <a
    v-if="devMode"
    class="ripple"
    href="https://vite.dev/guide/"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>speed</i>
    <span>Vite documentation</span>
    <OpenInBlank />
  </a>
  <a
    v-if="devMode"
    class="ripple"
    href="https://www.beercss.com"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>sports_bar</i>
    <span>Beer CSS official website</span>
    <OpenInBlank />
  </a>
  <a
    v-if="devMode"
    class="ripple"
    href="https://github.com/beercss/beercss/blob/main/docs/INDEX.md"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>sports_bar</i>
    <span>Beer CSS documentation</span>
    <OpenInBlank />
  </a>
  <a
    v-if="devMode"
    class="ripple"
    href="https://fonts.google.com/icons"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
  >
    <i>emoticon</i>
    <span>Material Symbols & Icons</span>
    <OpenInBlank />
  </a>

  <SeparatingLabel only-mobile-class="s" text="Account" />

  <a
    class="s ripple"
    target="_blank"
    rel="noopener noreferrer"
    :data-ui="props.mobile_nav ? '#mobile-navigation-dialog' : ''"
    @click.prevent="logout"
  >
    Logout
  </a>
</template>

<script setup lang="ts">
import {ref} from '@vue/runtime-core';
import {RouterLink, useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

import SeparatingLabel from '@/components/navigation/SeparatingLabel.vue';
import OpenInBlank from '@/components/OpenInBlank.vue';

const devMode = ref(import.meta.env.VITE_DEVELOPMENT_MODE === 'true');

const props = defineProps({
  mobile_nav: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.clearToken();
  router.push('/login');
};
</script>

<style scoped>
.router-link-active {
  background-color: var(--primary);
  color: var(--on-primary);

  &:hover {
    color: var(--on-primary-container);
  }
}

/* To make sure not to forget, they all have it, but only the target="blank" ones have it visible */
a:not([target='_blank']) .tooltip {
  display: none;
}
</style>
