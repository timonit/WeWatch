
/**
 * Хук для управления булевым состоянием (включено/выключено).
 *
 * @param {boolean} [initialValue=false] - Начальное значение состояния.
 * @returns {{
 *   state: Ref<boolean>,
 *   enable: () => void,
 *   disable: () => void,
 *   toggle: () => void
 * }} Объект с состоянием и функциями управления:
 *   - state: реактивное булево значение,
 *   - enable: функция для включения (установки true),
 *   - disable: функция для выключения (установки false),
 *   - toggle: функция для переключения состояния.
 */
export const useEnable = (initialValue: boolean = false): {
  state: Ref<boolean>;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
} => {
  const state = ref<boolean>(initialValue);

  const enable = () => state.value = true;
  const disable = () => state.value = false;
  const toggle = () => state.value = !state.value;

  return {
    state,
    enable,
    disable,
    toggle,
  };
}
