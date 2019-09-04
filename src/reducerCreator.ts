import { ActionType } from "./createAction";

/**
 * Reducer builder, chain call the "handleAction()" and "build()" to generate a reducer.
 */
export class ReducerCreator<T = any> {
  private initState: T;
  // tslint:disable-next-line: ban-types
  private typeMap: Map<string, Function>;

  constructor(initState: T) {
    this.initState = initState;
    this.typeMap = new Map();
  }

  /**
   * Add a handler for the certain action to the reducer.
   * The type of action should be unqiue.
   * Recommend to pass an action creator to get a better generic push support.
   *
   * @param type an action creator or a string
   * @param handler a function to compute a new state
   */
  public handleAction<A extends ActionType = ActionType>(
    type: ((payload?: any, meta?: any) => A) | string,
    handler: ReducerHandeler<T, A>
  ) {
    if (typeof type === "function") {
      type = type().type;
    }
    if (this.typeMap.has(type)) {
      throw new Error(`${type} is already existed`);
    }
    this.typeMap.set(type, handler);
    return this;
  }

  /**
   * Call to return the reducer
   */
  public build() {
    return (state = this.initState, action: ActionType): T => {
      if (this.typeMap.has(action.type)) {
        const handler = this.typeMap.get(action.type);
        return handler!(state, action);
      }
      return state;
    };
  }
}

export type ReducerHandeler<T = any, A extends ActionType = ActionType> = (
  state: T,
  action: A
) => T;
