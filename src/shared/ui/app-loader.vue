<template>
  <div class="loader">
    <div class="spinner-stator animate-spin"></div>
    <div class="spinner animate-spin"></div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  width: 30px;
  height: 30px;
  position: relative;
}

.spinner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: solid 4px var(--brand-first);
  clip: rect(10px, auto, 20px, auto);
  position: absolute;
  top: 0;
  left: 0;
}

.spinner-stator {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: solid 4px var(--brand-second);
  clip: rect(auto, 20px, auto, 10px);
  position: absolute;
  top: 0;
  left: 0;
}
</style>
