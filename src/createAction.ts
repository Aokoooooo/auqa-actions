import { ReducerState } from "./reduxStoreType";

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
 *
 * @example
 * const changeHide = createAction("changeHide");
 * // { type : "changeHide" }
 * const changeHideAction = changeHide();
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
 *
 * @example
 * const changeSize = createStandardAction<number>("changeSize");
 * // { type : "changeSize", payload: 12}
 * const changeSizeAction = changeSize(12);
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

/**
 * redux-thunk action creator, to dispatch the actions asynchronously.
 * @param dispatch redux store api
 * @param callback the specific service that how to dispatch the actions asynchronously.
 *
 * @example
 * const dispatch = store.dispatch;
 * const add = createStandardAction<number>("add");
 * const asyncAdd = (id:number) => createThunkAction(
 *  dispatch,
 *  async (dispatch) => {
 *    const size = await getSizeById(id);
 *    dispatch(add(size));
 * })
 *
 * asyncAdd(1);
 */
export const createThunkAction = <
  StoreState extends ReducerState = {},
  ExtraArg = undefined,
  ReturnType = void,
  // tslint:disable-next-line: ban-types
  DispatchType extends Function = Function
>(
  dispatch: DispatchType,
  callback: (
    dispatch: <Action extends ActionType | string = ActionType | string>(
      action: Action
    ) => Action,
    getState: () => StoreState,
    extraArg?: ExtraArg
  ) => ReturnType
) => {
  return dispatch(callback) as ReturnType;
};
