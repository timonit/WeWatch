const isOpened = ref(false);

export const useControlSide = () => {
  const open = () => isOpened.value = true;
  const close = () => isOpened.value = false;
  const toggle = () => isOpened.value ? close() : open();

  return { isOpened, open, close, toggle };
}
