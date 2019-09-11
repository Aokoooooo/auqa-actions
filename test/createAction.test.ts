import { createAction, createAsyncAction, createStandardAction } from "../src";

describe("test createAction", () => {
  test("with type", () => {
    const action = createAction("withType")();
    expect(action).toEqual({ type: "withType" });
  });
  test("with payload", () => {
    const action = createAction("withPayload")({ width: 100 });
    expect(action).toEqual({
      type: "withPayload",
      payload: { width: 100 }
    });
  });
  test("with meta", () => {
    const action = createAction("withMeta")(undefined, { width: 200 });
    expect(action).toEqual({
      type: "withMeta",
      meta: { width: 200 }
    });
  });
  test("with meta and payload", () => {
    let action = createAction("withMetaAndPayload")(null, null);
    expect(action).toEqual({
      type: "withMetaAndPayload",
      payload: null,
      meta: null
    });
    action = createAction("withMetaAndPayload")(1, 2);
    expect(action).toEqual({
      type: "withMetaAndPayload",
      payload: 1,
      meta: 2
    });
  });
  test("create standard action", () => {
    const standardAction = createStandardAction<number>("TEST/STAND");
    expect(standardAction(20)).toEqual({ type: "TEST/STAND", payload: 20 });
  });
  test("createThunkAction work well", () => {
    const mockFn = jest.fn((a: any) => a);
    const testCallback = (dispatch: (a: any) => any) => {
      dispatch("testCallback");
    };
    const action = () => createAsyncAction(testCallback);
    action()(
      mockFn,
      () => {
        return {};
      },
      undefined
    );
    expect(mockFn).toHaveBeenCalledWith("testCallback");
  });
});
