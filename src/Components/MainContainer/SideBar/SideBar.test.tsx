import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SideBar from "./SideBar";
import renderWithStore from "../../../utils/testing/renderWithStore";
test("snapshot test", () => {
  expect(renderWithStore(<SideBar />)).toMatchSnapshot();
});
