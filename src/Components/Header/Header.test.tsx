import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header/Header";
import renderWithStore from "../../utils/testing/renderWithStore";
test("snapshot test", () => {
  expect(render(<Header />)).toMatchSnapshot();
});
