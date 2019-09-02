import { createAction, createReducer } from "../src";

describe("test createReducer", () => {
  const initReducer1 = {
    name: "r1",
    size: 100,
    width: 5
  };
  const changeSize = createAction("R1/CHANGE_SIZE");
  const changeWidth = createAction("R1/CHANGE_WIDTH");
  const reducer1 = createReducer(initReducer1)
    .handleAction(changeSize, (state, action) => {
      return { ...state, size: action.payload };
    })
    .handleAction(changeWidth, (state, action) => {
      return { ...state, width: action.payload };
    })
    .build();

  const initReducer2 = {
    name: "r2",
    page: 60,
    isGod: true
  };
  const changePage = createAction("R2/CHANGE_PAGE");
  const changeIsGod = createAction("R2/CHANGE_IS_GOD");
  const reducer2 = createReducer(initReducer2)
    .handleAction("R2/CHANGE_PAGE", (state, action) => {
      return { ...state, page: action.payload };
    })
    .handleAction("R2/CHANGE_IS_GOD", state => {
      return { ...state, isGod: !state.isGod };
    })
    .build();

  test("action handler should be unique", () => {
    const error = () => {
      createReducer(initReducer1)
        .handleAction(changeSize, s => s)
        .handleAction(changeSize, s => s)
        .build();
    };
    expect(error).toThrowError("R1/CHANGE_SIZE is already existed");
  });

  test("change size to 200", () => {
    expect(reducer1(undefined, changeSize(200))).toEqual({
      ...initReducer1,
      size: 200
    });
  });
  test("change width to 10", () => {
    expect(reducer1(undefined, changeWidth(10))).toEqual({
      ...initReducer1,
      width: 10
    });
  });
  test("reducer1 not changed", () => {
    expect(reducer1(undefined, changePage(10))).toEqual({
      ...initReducer1
    });
    expect(reducer1(undefined, changeIsGod())).toEqual({
      ...initReducer1
    });
  });

  test("change page to 200", () => {
    expect(reducer2(undefined, changePage(200))).toEqual({
      ...initReducer2,
      page: 200
    });
  });
  test("change isGod to false", () => {
    expect(reducer2(undefined, changeIsGod())).toEqual({
      ...initReducer2,
      isGod: false
    });
  });
  test("reducer2 not changed", () => {
    expect(reducer2(undefined, changeSize(10))).toEqual({
      ...initReducer2
    });
    expect(reducer2(undefined, changeWidth(-20))).toEqual({
      ...initReducer2
    });
  });
});
