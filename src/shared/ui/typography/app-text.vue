<script setup lang="ts">
type Variant = 'paragraph' | 'simple' | 'bold' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const props = defineProps<{variant: Variant}>();
</script>

<template>
  <div>
    <p v-if="props.variant === 'paragraph'" class="mt-2">
      <slot></slot>
    </p>
    <span v-if="props.variant === 'simple'">
      <slot></slot>
    </span>
    <b v-if="props.variant === 'bold'">
      <slot></slot>
    </b>
    <h1 v-if="props.variant === 'h1'">
      <slot></slot>
    </h1>
    <h2 v-if="props.variant === 'h2'">
      <slot></slot>
    </h2>
    <h3 v-if="props.variant === 'h3'">
      <slot></slot>
    </h3>
    <h4 v-if="props.variant === 'h4'">
      <slot></slot>
    </h4>
    <h5 v-if="props.variant === 'h5'">
      <slot></slot>
    </h5>
    <h6 v-if="props.variant === 'h6'">
      <slot></slot>
    </h6>  
  </div>
</template>

<style scoped lang="scss">
  div {
    display: inline;
  }

  p,span,b {
    font-size: 13pt;
  }
  
  p::first-letter {
    padding-left: 1em;
    font-size: 15pt;
  }

  p {
    line-height: 1.2em;
  }

  b { 
    font-weight: 900;
  }

  h1 {
    font-size: 30pt;
    font-weight: 800;
  }

  h2 {
    font-size: 22pt;
    font-weight: 700; 
  }

  h3 {
    font-size: 22pt;
    font-weight: 300;
  }

  h4 {
    font-size: 20pt;
    font-weight: 700;
  }

  h5 {
    font-size: 20pt;
    font-weight: 300;
  }

  h6 {
    font-size: 16pt;
    font-weight: 600;
  }
</style>
