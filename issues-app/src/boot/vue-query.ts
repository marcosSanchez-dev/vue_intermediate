import { boot } from 'quasar/wrappers';
import { VueQueryPlugin } from '@tanstack/vue-query';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

// * app es la instancia de la app de VUE
export default boot(async ({ app }) => {
  // something to do
  VueQueryPlugin.install(app, {});
});
