import { ActionType } from "./createAction";

export class ReducerCreator<T = any> {
  private initState: T;
  private typeList: Map<string, ReducerHandeler>;

  constructor(initState: T) {
    this.initState = initState;
    this.typeList = new Map<string, ReducerHandeler>();
  }

  public handleAction<P = any, M = any, E = any>(
    type: (() => ActionType) | string,
    handler: ReducerHandeler<T, P, M, E>
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
    return (state = this.initState, action: ActionType) => {
      if (this.typeList.has(action.type)) {
        const handler = this.typeList.get(action.type);
        if (handler) {
          return handler(state, action);
        }
        console.error(`no handler for action ${action.type}`);
        return state;
      }
      return state;
    };
  }
}

export type ReducerHandeler<T = any, P = any, M = any, E = any> = (
  state: T,
  action: ActionType<P, M, E>
) => T;
