export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  gtag('config', 'G-GQJLQSBNKT');
})
