export const createAction = <P = any, M = any>(
  type: string,
  defaultPayload: P,
  defaultMeta: M
): ActionCreator<P, M> => (
  payload: P = defaultPayload,
  meta: M = defaultMeta
) => {
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
