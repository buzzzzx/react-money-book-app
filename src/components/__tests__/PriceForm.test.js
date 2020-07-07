import React from "react";
import { mount } from "enzyme";

import PriceForm from "../PriceForm";
import { testItem } from "../../utility";

const props = {
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn(),
};

const propsWithItem = {
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn(),
  item: testItem,
};

const getInputValue = (selector, wrapper) => {
  return wrapper.find(selector).instance().value;
};

const setInputValue = (selector, wrapper, value) => {
  wrapper.find(selector).instance().value = value;
};

let wrapperCreate;
let wrapperEdit;
let formInstance;

describe("test <PriceForm />", () => {
  beforeEach(() => {
    wrapperCreate = mount(<PriceForm {...props} />);
    wrapperEdit = mount(<PriceForm {...propsWithItem} />);
    formInstance = wrapperCreate.instance();
  });

  it("should render component to match the Snapshot", () => {
    expect(wrapperCreate).toMatchSnapshot();
    expect(wrapperEdit).toMatchSnapshot();
  });

  describe("test create mode <PriceForm />", () => {
    it("should render three inputs, one form, two buttons", () => {
      expect(wrapperCreate.find("input").length).toEqual(3);
      expect(wrapperCreate.find("form").length).toEqual(1);
      expect(wrapperCreate.find("button").length).toEqual(2);
    });

    it("three inputs should be empty", () => {
      expect(getInputValue("#title", wrapperCreate)).toEqual("");
      expect(getInputValue("#price", wrapperCreate)).toEqual("");
      expect(getInputValue("#date", wrapperCreate)).toEqual("");
    });

    it("submit form with empty input should show alert message", () => {
      wrapperCreate.find("form").simulate("submit");
      expect(formInstance.state.validatePass).toEqual(false);
      expect(wrapperCreate.find(".alert").length).toEqual(1);
      expect(props.onFormSubmit).not.toHaveBeenCalled();
    });

    it("submit form with invalid price should show alert message", () => {
      setInputValue("#title", wrapperCreate, "buy a phone");
      setInputValue("#price", wrapperCreate, "-20");
      setInputValue("#date", wrapperCreate, "2020-07-07");
      wrapperCreate.find("form").simulate("submit");
      expect(wrapperCreate.find(".alert").length).toEqual(1);
      expect(props.onFormSubmit).not.toHaveBeenCalled();
    });

    it("submit form with correct values should trigger callback with right object", () => {
      setInputValue("#title", wrapperCreate, "buy a phone");
      setInputValue("#price", wrapperCreate, "4000");
      setInputValue("#date", wrapperCreate, "2020-07-07");
      const newItem = {
        title: "buy a phone",
        price: 4000,
        date: "2020-07-07",
      };
      wrapperCreate.find("form").simulate("submit");
      expect(formInstance.state.validatePass).toEqual(true);
      expect(wrapperCreate.find(".alert").length).toEqual(0);
      expect(props.onFormSubmit).toHaveBeenCalledWith(newItem, false);
    });

    it("click cancel button should trigger right callback", () => {
      wrapperCreate.find("button").last().simulate("click");
      expect(props.onCancelSubmit).toHaveBeenCalled();
    });
  });

  describe("test edit mode with <PriceForm />", () => {
    it("render PriceForm with item should render the correct data to inputs", () => {
      expect(getInputValue("#title", wrapperEdit)).toEqual(testItem.title);
      expect(getInputValue("#price", wrapperEdit)).toEqual(
        testItem.price.toString()
      );
      expect(getInputValue("#date", wrapperEdit)).toEqual(testItem.date);
    });

    it("submit with changed value, should trigger the right callback with right object", () => {
      setInputValue("#title", wrapperEdit, "buy a HHKB");
      setInputValue("#price", wrapperEdit, 2300);
      const changedItem = {
        ...testItem,
        title: "buy a HHKB",
        price: 2300,
      };
      wrapperEdit.find("form").simulate("submit");
      expect(formInstance.state.validatePass).toEqual(true);
      expect(wrapperCreate.find(".alert").length).toEqual(0);
      expect(propsWithItem.onFormSubmit).toHaveBeenCalledWith(
        changedItem,
        true
      );
    });
  });
});
