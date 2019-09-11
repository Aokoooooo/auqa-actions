import { Middleware } from "redux";
import { ActionType } from "./createAction";
import { ReducerState } from "./reduxStoreType";

/**
 * The callback function that dispatched to the redux store.
 */
export type AquaAction<
  State,
  ReturnType,
  ExtraArg,
  Action extends ActionType
> = (
  dispatch: AquaDispatch<State, ExtraArg, Action>,
  getState: () => State,
  extraArg: ExtraArg
) => ReturnType;

/**
 * The dispatch function modified by aqua.
 * If the action is a function, then call it.
 * If the action is typically action object that was created by `ActoinCreator`, then dispatch it.
 */
export interface AquaDispatch<State, ExtraArg, Action extends ActionType> {
  <ReturnType>(
    aquaAction: AquaAction<State, ReturnType, ExtraArg, Action>
  ): ReturnType;
  <A extends Action>(action: A): A;
  <R, A extends Action>(action: A | AquaAction<State, R, ExtraArg, Action>):
    | A
    | R;
}

/**
 * The type of aqua middleware.
 */
export type AuqaMiddleware<
  State,
  Action extends ActionType,
  ExtraArg = undefined
> = Middleware<
  AquaDispatch<State, ExtraArg, Action>,
  State,
  AquaDispatch<State, ExtraArg, Action>
>;

/**
 * Call to create the middleware.
 * @param extraArg
 */
export function createAuqaMiddleware<
  ExtraArg,
  State extends ReducerState = {},
  Action extends ActionType = ActionType
>(extraArg: ExtraArg): AuqaMiddleware<State, Action, ExtraArg> {
  return ({ getState, dispatch }) => (
    next: AquaDispatch<State, ExtraArg, Action>
  ) => <ReturnType = any>(
    action: AquaAction<State, ReturnType, ExtraArg, Action>
  ) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArg);
    }
    return next(action);
  };
}

/**
 * Init middleware,and add the function `createAuqaMiddleware` as name `withExtraArg` on it.
 */
const aqua = Object.assign(createAuqaMiddleware(undefined), {
  withExtraArg: <ExtraArg>(extraArg: ExtraArg) => createAuqaMiddleware(extraArg)
});

export default aqua;
