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

/**
 * Create the an action creator for the certain type.
 * No param is required by the creator.
 *
 * @param type a unique string
 */
export const createAction = <P = any, M = any>(
  type: string
): BasicActionCreator<P, M> => (payload?: P, meta?: M) => {
  return { type, payload, meta };
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
/**
 * Create the an action creator for the certain type.
 * But `payload` filed is required.
 * @param type a unique string
 */
export const createStandardAction = <P = any, M = any>(
  type: string
): StandardActionCreator<P, M> => (payload: P, meta?: M) => {
  return { type, payload, meta };
};

export type ActionPayloadType<
  T extends ActionCreator | ActionType
> = T extends ActionCreator
  ? ReturnType<T>["payload"]
  : T extends ActionType
  ? T["payload"]
  : any;

export type ActionMetaType<
  T extends ActionCreator | ActionType
> = T extends ActionCreator
  ? ReturnType<T>["meta"]
  : T extends ActionType
  ? T["meta"]
  : any;

export type ActionType<P = any, M = any> =
  | BasicActionType<P, M>
  | StandardActionType<P, M>;

export type ActionCreator<P = any, M = any> =
  | BasicActionCreator<P, M>
  | StandardActionCreator<P, M>;
