# auqa actions

## 简介

`aqua actions`可以帮助简化`redux`的样板代码,同时`auqa actions`由`ts`编写,具备完整的类型推倒,充分提高开发效率.

整个库包含由两个 API `createAction`,`createReducer`和一个`reducer`生成类`ReducerCreator`构成,具体详情见下文.

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

- `auqa actions`

  ```typescript
  const add = createAction<T>("ADD");

  // add()     --->  { type: "ADD"}
  // add(100)  --->  { type: "ADD", payload: 100}
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
- `aqua actions`
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
