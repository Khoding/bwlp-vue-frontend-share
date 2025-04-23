import {defineStore} from 'pinia';
import {ref} from '@vue/runtime-core';

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref(localStorage.getItem('authToken') || '');

  function setToken(token: any) {
    authToken.value = token;
    localStorage.setItem('authToken', token);
  }

  function clearToken() {
    authToken.value = '';
    localStorage.removeItem('authToken');
  }

  return {authToken, setToken, clearToken};
});
