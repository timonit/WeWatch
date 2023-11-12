import { Placement } from '@floating-ui/vue';
import { DirectiveBinding } from 'vue';

export type TooltipBinding = {
  value: HTMLElement,
  modifiers: {
    fixed?: boolean;
  },
  arg?: Placement,
} & DirectiveBinding<HTMLElement>
