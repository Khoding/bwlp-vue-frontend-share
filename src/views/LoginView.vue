<template>
  <div class="login-view">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <div class="field label round border">
        <input type="text" id="username" v-model="username" required />
        <label>Username</label>
      </div>

      <div class="field label round border">
        <input type="password" id="password" v-model="password" required />
        <label>Password</label>
      </div>

      <button type="submit">Login</button>

      <p>
        <span class="bold">INFORMATION&nbsp;:</span> This is a modified
        <span class="bold">demo version</span> of the project I worked on at Uni-Freiburg's
        Rechenzentrum. It doesn't represent perfectly the job I did while I was there and a few
        things are broken. It is for example lacking the data saving since all the data was
        localised into a JSON file.
      </p>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/auth-store';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('test@test.de');
const password = ref('123456');
const error = ref('');

const login = () => {
  error.value = '';

  if (username.value === 'test@test.de' && password.value === '123456') {
    const fakeToken = `fake-token-${Date.now()}`;
    authStore.setToken(fakeToken);
    router.push('/image');
  } else {
    error.value = 'Invalid username or password.';
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  inline-size: 320px;
  margin-inline: auto;

  button {
    display: flex;
    margin-inline: auto;
  }

  .error-message {
    margin-block-start: 1em;
    color: red;
  }
}
</style>
