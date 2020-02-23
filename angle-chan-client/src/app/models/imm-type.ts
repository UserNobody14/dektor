export type ImmutableInput<T> = {
  [P in keyof T]?: T[P];
};

