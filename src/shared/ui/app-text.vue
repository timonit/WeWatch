<script setup lang="ts">
import { reactive } from '#imports';

type Variant = 'paragraph' | 'simple' | 'bold' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

enum FONT_SIZE {
  'sm' = '0.8em',
  'md' = '1em',
  'lg' = '1.2em',
}

const props = defineProps<{ size?: keyof typeof FONT_SIZE; variant: Variant; }>();

const style = reactive({
    'font-size': FONT_SIZE[props.size || 'md']
});
</script>

<template>
  <div>
    <p v-if="props.variant === 'paragraph'" class="mt-2" :style="style">
      <slot></slot>
    </p>
    <span v-if="props.variant === 'simple'" :style="style">
      <slot></slot>
    </span>
    <b v-if="props.variant === 'bold'" :style="style">
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


p {
  line-height: 1.2em;
  
  &::first-letter {
    padding-left: 1em;
  }
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
