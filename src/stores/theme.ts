import {defineStore} from 'pinia';

const theme = async from => {
  await ui('theme', from);
};

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'yellow',
    isDark: false,
    customColor: null,
    customImage: null,
    colors: {
      red: '#F44336',
      pink: '#E91E63',
      purple: '#9C27B0',
      'deep-purple': '#673AB7',
      indigo: '#3F51B5',
      blue: '#2196F3',
      'light-blue': '#03A9F4',
      cyan: '#00BCD4',
      teal: '#009688',
      green: '#4CAF50',
      'light-green': '#8BC34A',
      lime: '#CDDC39',
      yellow: '#FFEB3B',
      amber: '#FFC107',
      orange: '#FF9800',
      'deep-orange': '#FF5722',
      brown: '#795548',
      grey: '#9E9E9E',
      'blue-grey': '#607D8B',
    },
  }),

  getters: {
    currentColor: state => {
      if (state.customColor) return state.customColor;
      return state.colors[state.currentTheme] || '#FFEB3B';
    },
  },

  actions: {
    async setTheme(name: string) {
      this.currentTheme = name;
      this.customColor = null;
      this.customImage = null;
      await theme(this.colors[name]);
      this.persistState();
    },

    async setCustomColor(color: string) {
      this.customColor = color;
      this.currentTheme = 'custom';
      this.customImage = null;
      await theme(color);
      this.persistState();
    },

    async setCustomImage(imageUrl: string) {
      this.customImage = imageUrl;
      this.currentTheme = 'custom';
      this.customColor = null;
      await theme(imageUrl);
      this.persistState();
    },

    toggleMode() {
      this.isDark = !this.isDark;
      const newMode = this.isDark ? 'dark' : 'light';
      ui('mode', newMode);
      this.persistState();
    },

    persistState() {
      localStorage.setItem(
        'theme-store',
        JSON.stringify({
          currentTheme: this.currentTheme,
          isDark: this.isDark,
          customColor: this.customColor,
          customImage: this.customImage,
        }),
      );
    },

    loadPersistedState() {
      const stored = localStorage.getItem('theme-store');
      if (stored) {
        const data = JSON.parse(stored);
        this.currentTheme = data.currentTheme;
        this.isDark = data.isDark;
        this.customColor = data.customColor;
        this.customImage = data.customImage;
      } else {
        // Set defaults based on OS preference
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme = this.isDark ? 'amber' : 'red';
      }

      // Reapply theme
      if (this.customColor) {
        theme(this.customColor);
      } else if (this.customImage) {
        theme(this.customImage);
      } else {
        theme(this.colors[this.currentTheme]);
      }

      // Reapply mode
      ui('mode', this.isDark ? 'dark' : 'light');
    },
  },
});
