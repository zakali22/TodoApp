import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import Homepage from "../Homepage";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Root from "../../Root";
import sinon from "sinon";

describe("Homepage", () => {
  test("has a valid snapshot", () => {
    const component = renderer.create(
      <MemoryRouter>
        <Root>
          <Homepage />
        </Root>
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("componentDidMount", () => {
    let push, props, wrapper;

    beforeEach(() => {
      props = {
        history: {
          push: jest.fn()
        },
        auth: true
      };
      push = sinon.stub(props.history, "push");
    });
    afterEach(() => {
      push.reset();
    });
    it("redirects if auth is true", () => {
      wrapper = mount(
        <MemoryRouter>
          <Root>
            <Homepage {...props} />
          </Root>
        </MemoryRouter>
      );
      wrapper.update();
      expect(push.calledOnce).toBe(true);
    });
  });
});
