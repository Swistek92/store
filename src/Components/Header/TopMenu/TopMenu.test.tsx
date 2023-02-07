import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopMenu from "./TopMenu";

test("snapshot test", () => {
  expect(render(<TopMenu />)).toMatchSnapshot();
});
