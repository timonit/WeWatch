import { Placement } from '@floating-ui/vue';
import { DirectiveBinding } from 'nuxt/dist/app/compat/capi';

export type TooltipBinding = {
  value: HTMLElement,
  modifiers: {
    fixed?: boolean;
  },
  arg?: Placement,
} & DirectiveBinding<HTMLElement>
