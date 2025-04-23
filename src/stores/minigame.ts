import {defineStore} from 'pinia';
import {ref} from '@vue/runtime-core';

export const useMinigameActivated = defineStore('minigame', () => {
  const isMinigameActivated = ref(localStorage.getItem('isMinigameActivated') === 'true');

  function setValue(val) {
    isMinigameActivated.value = val;
    localStorage.setItem('isMinigameActivated', val.toString());
  }

  return {isMinigameActivated, setValue};
});
