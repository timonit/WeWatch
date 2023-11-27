type NotifyDTO = {
  id: number;
  message: string;
};
type Queue = NotifyDTO[];
type NotifyState = {
  queue: Queue,
}

const state = ref<Queue>([]);

export const useNotify = (): {state: Ref<Queue>, notify: (message: string) => void, remove: (id: number) => void} => {
  const notify = (message: string) => {
    state.value.push({id: Date.now(), message});
  };

  const remove = (id: number) => {
    state.value = state.value.filter(item => item.id !== id);
  }

  return {
    state,
    notify,
    remove,
  }
}
