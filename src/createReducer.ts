import { ReducerCreator } from "./reducerCreator";

export const createReducer = <T = any>(initState: T) =>
  new ReducerCreator<T>(initState);
