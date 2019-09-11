import aqua, { createAction, createAsyncAction } from "../src";

describe("test createMiddleware", () => {
  const mockDispatch = jest.fn((a: any) => a);
  const mockGetState = jest.fn(() => {
    return { mock: true };
  });
  const mockNext = aqua({ dispatch: mockDispatch, getState: mockGetState });
  const action = createAction("TEST")();

  test("Next handler should return a function", () => {
    expect(typeof mockNext).toEqual("function");
  });

  describe("handle next", () => {
    test("handle general action object", () => {
      const r = mockNext(mockDispatch)(action);
      expect(r).toEqual(action);
      expect(mockDispatch).toHaveBeenCalledWith(action);
    });
    test("handle function action", () => {
      const asyncAction = jest.fn(() =>
        createAsyncAction(dispatch => {
          dispatch(action);
        })
      );
      const r = mockNext(mockDispatch)(asyncAction);
      expect(typeof r).toEqual("function");
      expect(asyncAction).toHaveBeenCalledTimes(1);
    });
    test("handle error", () => {
      const asyncAction = () =>
        createAsyncAction(() => {
          throw new Error("error");
        });
      expect(mockNext(mockDispatch)(asyncAction)).toThrowError("error");
    });
  });

  describe("withExtraArg", () => {
    const aqua2 = aqua.withExtraArg("extraArg");
    const mockNext2 = aqua2({ dispatch: mockDispatch, getState: mockGetState });
    const r = mockNext2(mockDispatch)(action);
    expect(r).toEqual(action);
    expect(mockDispatch).toHaveBeenCalledWith(action);

    const asyncAction = jest.fn(() =>
      createAsyncAction(dispatch => {
        dispatch(action);
      })
    );
    const r2 = mockNext2(mockDispatch)(asyncAction);
    expect(typeof r2).toEqual("function");
    expect(asyncAction).toHaveBeenCalledTimes(1);
  });
});
