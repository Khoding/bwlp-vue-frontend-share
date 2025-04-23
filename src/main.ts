import '@/assets/css/main.css';
import 'beercss';
import 'material-dynamic-colors';

import {createApp} from '@vue/runtime-dom';
import {createPinia} from 'pinia';

import App from '@/App.vue';
import router from '@/router';
import i18n from '@/i18n';

/// Set the direction of the page based on the language
/// Set the languages that are RTL in this array
/// This is all the still spoken languages that are RTL,
/// some of them are also sometimes written LTR,
/// and anyway they are basically only spoken on tiny islands
/// We don't need to support them, so we don't include them here
/// This array is just IN CASE
/// const RTL_LANGUAGES = [
///     'ar',    // Arabic
///     'arc',   // Aramaic
///     'ckb',   // Central Kurdish (Sorani)
///     'dv',    // Divehi
///     'fa',    // Persian (Farsi)
///     'ha',    // Hausa
///     'he',    // Hebrew
///     'khw',   // Khowar
///     'ks',    // Kashmiri
///     'ku',    // Kurdish
///     'mde',   // Mende
///     'men',   // Mende Kikakui
///     'mnd',   // Mandaic
///     'nb',    // N'Ko
///     'nqo',   // N'Ko
///     'ps',    // Pashto
///     'sam',   // Samaritan
///     'syr',   // Syriac
///     'ur',    // Urdu
///     'yi'     // Yiddish
/// ];

/// For now, use this array
/// Note that most languages won't be supported anyway, but we lose nothing keeping them here
/// If someone with their device in any of these but it's not supported, they'll be displayed English in LTR, so no harm done
/// Arrays provided by Claude AI
const RTL_LANGUAGES = [
  'ar', // Arabic
  'arc', // Aramaic
  'dv', // Divehi
  'fa', // Persian (Farsi)
  'ha', // Hausa
  'he', // Hebrew
  'khw', // Khowar
  'ks', // Kashmiri
  'ku', // Kurdish
  'ps', // Pashto
  'ur', // Urdu
  'yi', // Yiddish
];
document.documentElement.dir = RTL_LANGUAGES.includes(i18n.global.locale.value) ? 'rtl' : 'ltr';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');
