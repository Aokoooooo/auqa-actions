import { ActionType } from "./createAction";

export class ReducerCreator<T = any> {
  private initState: T;
  // tslint:disable-next-line: ban-types
  private typeList: Map<string, Function>;

  constructor(initState: T) {
    this.initState = initState;
    this.typeList = new Map();
  }

  public handleAction<A extends ActionType = ActionType>(
    type: (() => A) | string,
    handler: ReducerHandeler<T, A>
  ) {
    if (typeof type === "function") {
      type = type().type;
    }
    if (this.typeList.has(type)) {
      throw new Error(`${type} is already existed`);
    }
    this.typeList.set(type, handler);
    return this;
  }

  public build() {
    return (state = this.initState, action: ActionType): T => {
      if (this.typeList.has(action.type)) {
        const handler = this.typeList.get(action.type);
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
