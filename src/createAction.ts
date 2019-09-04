export const createAction = <P = any, M = any>(
  type: string
): BasicActionCreator<P, M> => (payload?: P, meta?: M) => {
  return { type, payload, meta };
};

export const createStandardAction = <P = any, M = any>(
  type: string
): StandardActionCreator<P, M> => (payload: P, meta?: M) => {
  return { type, payload, meta };
};

export type BasicActionCreator<P = any, M = any> = (
  payload?: P,
  meta?: M
) => BasicActionType<P, M>;

// tslint:disable-next-line: interface-over-type-literal
export type BasicActionType<P = any, M = any> = {
  type: string;
  payload?: P;
  meta?: M;
};

export type StandardActionCreator<P = any, M = any> = (
  payload: P,
  meta?: M
) => StandardActionType<P, M>;

// tslint:disable-next-line: interface-over-type-literal
export type StandardActionType<P = any, M = any> = {
  type: string;
  payload: P;
  meta?: M;
};

export type ActionType<P = any, M = any> =
  | BasicActionType<P, M>
  | StandardActionType<P, M>;

export type ActionCreator<P = any, M = any> =
  | BasicActionCreator<P, M>
  | StandardActionCreator<P, M>;
