import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

jest.mock("./Login", () => {
  return {};
});

test("Check Login form renders correctly", () => {
  const { getByText } = render(<Login />);
  expect(getByText(/Username/i)).toBeTruthy();
  expect(getByText(/Password/i)).toBeTruthy();
});

test("test login post request", () => {
  fetch.mockResponseOnce(
    JSON.stringify({ username: "Hello", password: "World" })
  );
  const { getByText } = render(<Login />);
  expect(getByText(/Username/i)).toBeTruthy();
  expect(getByText(/Password/i)).toBeTruthy();
});
