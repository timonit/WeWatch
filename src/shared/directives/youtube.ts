import { createManager } from '@vue-youtube/core';

export default defineNuxtPlugin({
  hooks: {
    'app:mounted'(app) {
      app.use(
        createManager({
          deferLoading: {
            enabled: false,
            autoLoad: false
          }
        })
      );
    } 
  }
});
