import {
  getActionCreatorWithPrefix,
  getTypeOf,
  isTypeOf,
  createAction,
  createStandardAction
} from "../src";

describe("test utils", () => {
  const actionTypeA = "TEST/actionTypeA";
  const actionTypeB = "TEST#actionTypeB";
  const actionCreatorA = createAction(actionTypeA);
  const actionCreatorB = createAction(actionTypeB);
  const standardActionCreatorA = createStandardAction(actionTypeA);
  const standardActionCreatorB = createStandardAction(actionTypeB);

  test("isTypeOf work well", () => {
    expect(isTypeOf(actionTypeA, actionTypeA)).toEqual(true);
    expect(isTypeOf(actionTypeA, actionCreatorA())).toEqual(true);
    expect(isTypeOf(actionTypeA, standardActionCreatorA(""))).toEqual(true);
    expect(isTypeOf(actionTypeA, actionTypeB)).toEqual(false);
    expect(isTypeOf(actionTypeA, actionCreatorB())).toEqual(false);
    expect(isTypeOf(actionTypeA, standardActionCreatorB(""))).toEqual(false);

    expect(isTypeOf(actionCreatorA(), actionTypeA)).toEqual(true);
    expect(isTypeOf(actionCreatorA(), actionCreatorA())).toEqual(true);
    expect(isTypeOf(actionCreatorA(), standardActionCreatorA(""))).toEqual(
      true
    );
    expect(isTypeOf(actionCreatorA(), actionTypeB)).toEqual(false);
    expect(isTypeOf(actionCreatorA(), actionCreatorB())).toEqual(false);
    expect(isTypeOf(actionCreatorA(), standardActionCreatorB(""))).toEqual(
      false
    );

    expect(isTypeOf(standardActionCreatorA(""), actionTypeA)).toEqual(true);
    expect(isTypeOf(standardActionCreatorA(""), actionCreatorA())).toEqual(
      true
    );
    expect(
      isTypeOf(standardActionCreatorA(""), standardActionCreatorA(""))
    ).toEqual(true);
    expect(isTypeOf(standardActionCreatorA(""), actionTypeB)).toEqual(false);
    expect(isTypeOf(standardActionCreatorA(""), actionCreatorB())).toEqual(
      false
    );
    expect(
      isTypeOf(standardActionCreatorA(""), standardActionCreatorB(""))
    ).toEqual(false);
  });

  test("getType work well", () => {
    expect(getTypeOf(actionCreatorA())).toEqual(actionTypeA);
    expect(getTypeOf(standardActionCreatorA(""))).toEqual(actionTypeA);
    expect(getTypeOf(actionCreatorA())).not.toEqual(actionTypeB);
    expect(getTypeOf(standardActionCreatorA(""))).not.toEqual(actionTypeB);
  });

  test("getActionCreatorWithPrefix work well", () => {
    const creator = getActionCreatorWithPrefix("TEST");
    expect(creator.createAction("actionTypeA")()).toEqual(actionCreatorA());
    const standardActionCreator = getActionCreatorWithPrefix("TEST", "#");
    expect(
      standardActionCreator.createStandardAction("actionTypeB")("")
    ).toEqual(standardActionCreatorB(""));
  });
});
