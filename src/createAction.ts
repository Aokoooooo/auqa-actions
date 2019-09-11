import { AquaAction } from "./createMiddleware";
import { ReducerState } from "./reduxStoreType";

export type BasicActionCreator<P = any, M = any> = (
  payload?: P,
  meta?: M
) => BasicActionType<P, M>;

export interface BasicActionType<P = any, M = any> {
  type: string;
  payload?: P;
  meta?: M;
}

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

export interface StandardActionType<P = any, M = any> {
  type: string;
  payload: P;
  meta?: M;
}
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
 * create an async action, you should add aqua middleware to redux store before you use it.
 * It's just seem like redux thunk, if the action is an object `ActionType`, dispatch it;
 * or if the action is a function, invoke it.
 * @param aquaAction
 *
 * @example
 * const changeSize = createStandardAction<number>('changeSize');
 * const addSizeAsync = (id: number) => createAsyncAction<StoreState>(
 *  async dispatch => {
 *    const size = await getSizeById(id);
 *    changeSize(size);
 *  }
 * )
 */
export const createAsyncAction = <
  StoreState extends ReducerState = {},
  ExtraArg = undefined,
  ReturnType = any
>(
  aquaAction: AquaAction<StoreState, ReturnType, ExtraArg, ActionType>
) => {
  return aquaAction;
};
