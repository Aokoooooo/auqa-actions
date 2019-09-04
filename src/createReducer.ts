import { ReducerCreator } from "./reducerCreator";

/**
 * Call to create the reducer
 * @param initState
 */
export const createReducer = <T = any>(initState: T) =>
  new ReducerCreator<T>(initState);
