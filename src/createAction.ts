export const createAction = <P = any, M = any>(
  type: string
): ActionCreator<P, M> => (payload?: P, meta?: M) => {
  return { type, payload, meta };
};

// tslint:disable-next-line: interface-over-type-literal
export type ActionType<P = any, M = any> = {
  type: string;
  payload?: P;
  meta?: M;
};

export type ActionCreator<P = any, M = any> = (
  payload?: P,
  meta?: M
) => ActionType<P, M>;
