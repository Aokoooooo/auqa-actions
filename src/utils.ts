import { ActionType, createAction, createStandardAction } from "./createAction";

/**
 * Check if the type of `ActionType` or the `string` is equal to
 * another type of `ActionType` or the `string`
 * @param source
 * @param target
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
 */
export const getType = (action: ActionType) => {
  return action.type;
};

/**
 * Get the `ActionCreator` with the prefix.
 * @param prefix
 * @param separator default is `/`
 */
export const getActionCreatorWithPrefix = (
  prefix: string,
  separator: string = "/"
) => {
  return {
    createAction: (type: string) =>
      createAction(`${prefix}${separator}${type}`),
    createStandardAction: (type: string) =>
      createStandardAction(`${prefix}${separator}${type}`)
  };
};
