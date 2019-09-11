import { ActionType, createAction, createStandardAction } from "./createAction";

/**
 * Check if the type of `ActionType` or the `string` is equal to
 * another type of `ActionType` or the `string`
 * @param source
 * @param target
 *
 * @example
 * const type = "TEST/TYPE";
 * const typeCreator = createAction(type);
 * const isSameType = isTypeOf(type, typeCreator); // ture
 */
export const isTypeOf = (
  source: ActionType | string,
  target: ActionType | string
): boolean => {
  return (
    (typeof source === "string" ? source : source.type) ===
    (typeof target === "string" ? target : target.type)
  );
};

/**
 * Get the type of an action
 * @param action
 *
 * @example
 * const type = "TEST/TYPE";
 * const typeCreator = createAction(type);
 * const creatorType = getTypeOf(typeCreator); // TEST/TYPE
 */
export const getTypeOf = (action: ActionType) => {
  return action.type;
};

/**
 * Get the `ActionCreator` with the prefix.
 * @param prefix
 * @param separator default is `/`
 *
 * @example
 * const creator = getActionCreatorWithPrefix('TEST');
 * const baseActionCreator = creator.createAction("BASE");
 * const standardActionCreator = creator.createStandardAction<number>("STD");
 * // { type = "TEST/BASE" }
 * const baseAction = baseActionCreator();
 * // { type = "TEST/STD", payload: 1 }
 * const standardAction = standardActionCreator(1);
 */
export const getActionCreatorWithPrefix = (
  prefix: string,
  separator: string = "/"
) => {
  return {
    createAction: <P = any, M = any>(type: string) =>
      createAction<P, M>(`${prefix}${separator}${type}`),
    createStandardAction: <P = any, M = any>(type: string) =>
      createStandardAction<P, M>(`${prefix}${separator}${type}`)
  };
};
