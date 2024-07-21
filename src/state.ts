export interface Value {
  value?: string;
}
type Listener = (value: Value) => void;

export const SharedState: {
  value: Value;
  listeners: Set<Listener>;
  subscribe: (listener: Listener) => void;
  unsubscribe: (listener: Listener) => void;
  setValue: (newValue: Value) => void;
} = {
  value: {},
  listeners: new Set(),

  subscribe(listener: Listener) {
    this.listeners.add(listener);
  },

  unsubscribe(listener: Listener) {
    this.listeners.delete(listener);
  },

  setValue(newValue: Value) {
    this.value = newValue;
    this.listeners.forEach(listener => listener(newValue));
  },
};
