import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import Register from "../Register";
import FormUserDetails from "../FormUserDetails";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Root from "../../Root";
import sinon from "sinon";

describe("Register", () => {
  test("has a valid snapshot", () => {
    const component = renderer.create(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("User types", () => {
    let wrapper, props, onChange;
    beforeEach(() => {
      wrapper = shallow(<Register />);
      props = {
        values: {
          first_name: "",
          last_name: "",
          email: ""
        },
        onChange: jest.fn()
      };
      onChange = sinon.stub(props, "onChange");
    });
    afterEach(() => {
      onChange.reset();
      wrapper.unmount();
    });
    it("sets state to values enter", () => {
      const childComponent = mount(<FormUserDetails {...props} />);
      const input = childComponent.find("input").first();
      input.simulate("change", {
        target: {
          value: "Something"
        }
      });
      childComponent.update();
      expect(input.props("value")).toEqual("Somthing");
    });
  });
});
