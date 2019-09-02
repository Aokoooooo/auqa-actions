import { createAction } from "../src";

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
});