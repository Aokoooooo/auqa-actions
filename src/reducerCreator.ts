import { ActionType } from "./createAction";

export class ReducerCreator<T = any> {
  private initState: T;
  private typeList: Map<string, ReducerHandeler<T>>;

  constructor(initState: T) {
    this.initState = initState;
    this.typeList = new Map<string, ReducerHandeler<T>>();
  }

  public handleAction<P = any, M = any>(
    type: (() => ActionType) | string,
    handler: ReducerHandeler<T, P, M>
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

export type ReducerHandeler<T = any, P = any, M = any> = (
  state: T,
  action: ActionType<P, M>
) => T;
