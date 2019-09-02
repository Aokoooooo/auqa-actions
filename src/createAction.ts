export const createAction = <P = any, M = any>(type: string) => (
  payload?: P,
  meta?: M
): ActionType<P> => {
  return { type, payload, meta };
};

// tslint:disable-next-line: interface-over-type-literal
export type ActionType<P = any, M = any> = {
  type: string;
  payload?: P;
  meta?: M;
};
