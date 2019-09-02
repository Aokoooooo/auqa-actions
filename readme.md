# auqa actions

## 简介

`aqua actions`可以帮助简化`redux`的样板代码,同时`auqa actions`由`ts`编写,具备完整的类型推倒,充分提高开发效率.

整个库包含由两个 API 构成`createAction`和`createReducer`,具体详情见下文.

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
  const add = <T = any>(payload: T): IAddAction => {
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
    .handleAction(add, (state, action<ReturnType<typeof add>) => {
      return { ...state, sum: state.sum + action.payload };
    })
    .build();
  ```

## API

- `createAction`

  ```typescript
  const createAction = <P = any, M = any>(type: string) => (
    payload?: P,
    meta?: M
  ): ActionType<P> => {
    return { type, payload, meta };
  };

  type ActionType<P = any, M = any> = {
    type: string;
    payload?: P;
    meta?: M;
  };
  ```

- `createReducer`

  ```typescript
  export const createReducer = <T = any>(initState: T) =>
    new ReducerCreator<T>(initState);
  ```

- `ReducerCreator`
  通过链式调用`.handleAction`添加处理分支,末尾调用`.build()`返回完整`reducer`.

  ```typescript
    handleAction<P = any, M = any>(
    type: (() => ActionType) | string,
    handler: ReducerHandeler<T, P, M>
  ) :this

    build(): (state = this.initState, action: ActionType)=> T

    type ReducerHandeler<T = any, P = any, M = any> = (
  state: T,
  action: ActionType<P, M>
  ) => T;
  ```
