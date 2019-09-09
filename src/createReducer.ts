import { ReducerCreator } from "./reducerCreator";

/**
 * Call to create the reducer
 * @param initState
 * @example
 * const initState = { size: 0, hide: false };
 * const changeSize = createStandardAction<number>("changeSize");
 * const changeHide = createAction("changeHide");
 * const reducer = createReducer(initState)
 *  .handleAction(changeSize, (state, action)=>{
 *    return {...state, size: action.payload}})
 *  .handleAction(changeHide, (state)=>{
 *    return {...state, hide: !state.hide}})
 *  .build();
 */
export const createReducer = <T = any>(initState: T) =>
  new ReducerCreator<T>(initState);
