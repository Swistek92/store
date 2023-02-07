import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SideBar from "./SideBar";

test("snapshot test", () => {
  expect(render(<SideBar />)).toMatchSnapshot();
});
