import {
  ActionType,
  createAction,
  createStandardAction,
  ActionCreator
} from "./createAction";

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
export const getTypeOf = (action: ActionType) => {
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

interface IUseActionsActionCreators {
  [name: string]: ActionCreator;
}

/**
 * Is similar to the `Redux` API `bindActionCreators()`,but with some differences.
 * The first is this api could give you the whole generic support.
 * And you are only allowed to pass an object to call it,which `Redux` allow you to pass like an array,a function ,or whatever.
 * Be sure to pass an available `dispatcher` which is provided by `redux store`.
 * @param actionCreators an object contains some `ActionCreator`s
 * @param dispatch `Redux` API
 */
export const bindActionCreators = <T extends IUseActionsActionCreators>(
  actionCreators: T,
  // tslint:disable-next-line: ban-types
  dispatch: Function
) => {
  const bindActionCreator = <P extends T[keyof T]>(
    actionCreator: P,
    // tslint:disable-next-line: ban-types
    dispatch: Function
  ) => {
    return (
      payload?: ReturnType<P>["payload"],
      meta?: ReturnType<P>["meta"]
    ) => {
      return dispatch(actionCreator(payload, meta));
    };
  };

  type AoundActionCreators = {
    [K in keyof T]: T[K];
  };
  const boundActionCreators: any = {};
  Object.keys(actionCreators).map((i: keyof T) => {
    boundActionCreators[i] = bindActionCreator(actionCreators[i], dispatch);
  });

  return boundActionCreators as AoundActionCreators;
};
