import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import App from "../App";
import Root from "../../Root";
import Homepage from "../Homepage";
import NotFound from "../NotFound";

describe("App", () => {
  test("has a valid snapshot", () => {
    const component = renderer.create(
      <MemoryRouter>
        <Root>
          <App />
        </Root>
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Root>
          <App />
        </Root>
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  describe("React Router", () => {
    it("redirects to 404 if invalid path", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={["/invalidPath"]}>
          <Root>
            <App />
          </Root>
        </MemoryRouter>
      );
      expect(wrapper.find(Homepage)).toHaveLength(0);
      expect(wrapper.find(NotFound)).toHaveLength(1);
    });
    it("doesn't redirect to 404 if path is valid", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={["/"]}>
          <Root>
            <App />
          </Root>
        </MemoryRouter>
      );
      expect(wrapper.find(Homepage)).toHaveLength(1);
      expect(wrapper.find(NotFound)).toHaveLength(0);
    });
  });
});
