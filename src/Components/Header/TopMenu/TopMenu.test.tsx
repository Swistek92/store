import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopMenu from "./TopMenu";
import { Provider } from "react-redux";
import renderWithStore from "../../../utils/testing/renderWithStore";

test("snapshot test", () => {
  expect(renderWithStore(<TopMenu />)).toMatchSnapshot();
});
