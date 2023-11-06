import { Directive } from 'nuxt/dist/app/compat/capi'; 
import { computePosition, ComputePositionConfig, flip, offset, Placement } from '@floating-ui/dom';
import { TooltipBinding } from './types';

type Options = {
  open: boolean,
} & ComputePositionConfig

const compute = async (el: HTMLElement, tooltipEl: HTMLElement, options: Options) => {
  const ctx = await computePosition(el, tooltipEl, {
    placement: options.placement,
    strategy: options.strategy,
    middleware: options.middleware,
  });
  tooltipEl.style.left = `${ctx.x}px`;
  tooltipEl.style.top = `${ctx.y}px`;
}

/**
 * tooltip на основе floating-ui
 * @param el 
 * @param param1 
 * 
 * @example 
 * <div ref="tooltipRef">tooltip<div>
 * <button v-tooltip:right.fixed="tooltipRef"><button>
 */
const tooltip: Directive<HTMLElement, HTMLElement> = (
  el: HTMLElement,
  {
    value: tooltipEl,
    modifiers: {fixed},
    arg: placement
  }: TooltipBinding
) => {
  if (!tooltipEl) return;
  
  el.addEventListener('mouseenter', () => {
    compute(el, tooltipEl, {
      placement,
      strategy: fixed ? 'fixed' : 'absolute',
      middleware: [flip(), offset(45)],
      open: true,
    });
    tooltipEl.style.visibility = 'visible';
  });
  el.addEventListener('mouseleave', () => {
    tooltipEl.style.visibility = 'hidden';
  });
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', tooltip);
});
