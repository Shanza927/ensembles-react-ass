export interface Value {
  value?: string;
}

export const SharedState: { value: Value } = {
  value: { value: '7' },
}