# redux-aqua

![NPM](https://img.shields.io/npm/l/redux-aqua)

## 简介

`redux-aqua`可以帮助简化`redux`的样板代码,同时`redux-aqua`由`ts`编写,具备完整的类型推倒,充分提高开发效率.

## 快速开始

### 安装

```sh
// NPM
npm install aqua-actions -S

//YARN
yarn add aqua-actions
```

### 创建`action`

- `redux 原始方法`

  ```typescript
  const ADD_TYPE = "ADD";
  interface IAddAction<T = any> {
    type: typeof ADD_TYPE;
    payload: T;
  }
  const add = <T = any>(payload: T): IAddAction<T> => {
    return { type: ADD_TYPE, payload };
  };

  // add()     --->  { type: "ADD"}
  // add(100)  --->  { type: "ADD", payload: 100}
  ```

- `redux-aqua`

  ```typescript
  const add = createAction<T>("ADD");

  // add()     --->  { type: "ADD"}
  // add(100)  --->  { type: "ADD", payload: 100}
  ```

### 创建异步`action`

创建异步`action`首先需要添加一个`middleware`.

```typescript
import { applyMiddleware, createStore } from "redux";
import aqua from "redux-aqua";

const enhancer = applyMiddleware(aqua);
// reducer 需要自己定义
const store = createStore(reducer, enhancer);
```

异步`action`的使用和`redux-thunk`类似.如果`action`是函数,则执行这个函数,否则派送`action`对象.

```typescript
const asyncAction = (id: number) =>
  createAsyncAction<StoreState>(async dispatch => {
    const size = await getSizeById(id);
    dispatch(size);
  });
```

### 创建`reducer`

- `redux`原始方法
  ```typescript
  const initState = { sum: 0 };
  const reducer = (state = initState, action: IAddAction) => {
    switch (action.type) {
      case ADD_TYPE:
        return { ...state, sum: state.sum + action.payload };
      default:
        return state;
    }
  };
  ```
- `redux-aqua`
  ```typescript
  const initState = { sum: 0 };
  const reducer = createReducer(initState)
    .handleAction(add, (state, action) => {
      return { ...state, sum: state.sum + action.payload };
    })
    .build();
  ```

## API

- `createAction`和`createStandardAction`
  两者的区别在于,`createStandardAction`中`payload`是必填项.

  ```typescript
  const createAction = <P = any, M = any>(
    type: string
  ): BasicActionCreator<P, M> => (payload?: P, meta?: M) => {
    return { type, payload, meta };
  };

  type BasicActionCreator<P = any, M = any> = (
    payload?: P,
    meta?: M
  ) => BasicActionType<P, M>;

  type BasicActionType<P = any, M = any> = {
    type: string;
    payload?: P;
    meta?: M;
  };

  const createStandardAction = <P = any, M = any>(
    type: string
  ): StandardActionCreator<P, M> => (payload: P, meta?: M) => {
    return { type, payload, meta };
  };

  type StandardActionCreator<P = any, M = any> = (
    payload: P,
    meta?: M
  ) => StandardActionType<P, M>;

  type StandardActionType<P = any, M = any> = {
    type: string;
    payload: P;
    meta?: M;
  };

  type ActionType<P = any, M = any> =
    | BasicActionType<P, M>
    | StandardActionType<P, M>;

  type ActionCreator<P = any, M = any> =
    | BasicActionCreator<P, M>
    | StandardActionCreator<P, M>;
  ```

- `createReducer`

  ```typescript
  export const createReducer = <T = any>(initState: T) =>
    new ReducerCreator<T>(initState);
  ```

  - `ReducerCreator`
    通过链式调用`.handleAction`添加处理分支,末尾调用`.build()`返回完整`reducer`.

    - `handleAction`

      ```typescript
          handleAction<A extends ActionType = ActionType>(
          type: ((payload?:any, meta?:any) => A) | string,
          handler: ReducerHandeler<T, A>
      ) :this
      ```

    - `build`

      ```typescript
          build(): (state = this.initState, action: ActionType)=> T
      ```

    - `ReducerHandeler`

      ```typescript
      type ReducerHandeler<T = any, A extends ActionType = ActionType> = (
        state: T,
        action: A
      ) => T;
      ```

  - `createAsyncAction`

    ```typescript
    export const createAsyncAction = <
      StoreState extends ReducerState = {},
      ExtraArg = undefined,
      ReturnType = any
    >(
      aquaAction: AquaAction<StoreState, ReturnType, ExtraArg, ActionType>
    ) => {
      return aquaAction;
    };

    type AquaAction<State, ReturnType, ExtraArg, Action extends ActionType> = (
      dispatch: AquaDispatch<State, ExtraArg, Action>,
      getState: () => State,
      extraArg: ExtraArg
    ) => ReturnType;

    interface AquaDispatch<State, ExtraArg, Action extends ActionType> {
      <ReturnType>(
        aquaAction: AquaAction<State, ReturnType, ExtraArg, Action>
      ): ReturnType;
      <A extends Action>(action: A): A;
      <R, A extends Action>(
        action: A | AquaAction<State, R, ExtraArg, Action>
      ): A | R;
    }
    ```

  - `createMiddleware`

    ```typescript
    export function createAuqaMiddleware<
      ExtraArg,
      State extends ReducerState = {},
      Action extends ActionType = ActionType
    >(extraArg: ExtraArg): AuqaMiddleware<State, Action, ExtraArg> {
      return ({ getState, dispatch }) => (
        next: AquaDispatch<State, ExtraArg, Action>
      ) => <ReturnType = any>(
        action: AquaAction<State, ReturnType, ExtraArg, Action>
      ) => {
        if (typeof action === "function") {
          return action(dispatch, getState, extraArg);
        }
        return next(action);
      };
    }
    ```

    项目中默认导出的`aqua`即为`createMiddleware`的结果.不过这个实例中有一个`withExtraArg`字段,本质也是`createMiddleware`方法,给予一个方便的修改中间件的接口.
