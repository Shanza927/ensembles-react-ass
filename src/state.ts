export interface Value {
  value?: string;
}

export const SharedState: {
  value: Value;
  setValue: (newValue: Value) => void;
} = {
  value: {value: '0'},
  setValue(newValue: Value) {
    this.value = newValue;
   
  },
};
