export const createAction = <T = any, M = any, E = any>(type: string) => (
  payload?: T,
  meta?: M,
  error?: E
): ActionType<T, M, E> => {
  return { type, payload, meta, error };
};

// tslint:disable-next-line: interface-over-type-literal
export type ActionType<T = any, M = any, E = any> = {
  type: string;
  payload?: T;
  meta?: M;
  error?: E;
};
