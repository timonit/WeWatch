import type { Placement } from '@floating-ui/vue';
import type { DirectiveBinding } from 'vue';

export type TooltipBinding = {
  value: HTMLElement,
  modifiers: {
    fixed?: boolean;
  },
  arg?: Placement,
} & DirectiveBinding<HTMLElement>
