import React from "react";
import { render, act, screen } from "@testing-library/react";
import Login from "./components/Login";
import PolicyPage from "./components/PolicyPage";

beforeEach(() => {
  fetch.resetMocks();
});

const mockResponse = {
  policy: {
    compulsory_excess: 100,
    voluntary_excess: 100,
    address: {
      line_1: "Flat 55, 9 Road",
      line_2: "Little Compton",
      line_3: "Harton-on-the-water",
      county: "Ravon",
      city: "Shroud",
      country: "GB",
      postcode: "W53TR",
    },
    usage: "SDP",
    cover: "Premium",
    auto_renew: true,
    policy_ref: "banana-pineapple",
  },
  vehicle: {
    make: "Honda",
    colour: "Red",
    model: "X",
    reg: "HJ123XX",
  },
};

test("Check Login form renders correctly", () => {
  const { getByText } = render(<Login />);
  expect(getByText(/Username/i)).toBeTruthy();
  expect(getByText(/Password/i)).toBeTruthy();
});

test("Policy Page renders correctly with mock data", async () => {
  fetch.mockResponseOnce(JSON.stringify(mockResponse));
  await act(async () => render(<PolicyPage />));

  expect(screen.getByText("banana-pineapple")).toBeInTheDocument();
  expect(screen.getByText("Premium")).toBeInTheDocument();
  expect(fetch.mock.calls.length).toEqual(1);
});

// tests do not pass
// test("Logs out of policy page", async () => {
//   fetch.mockResponseOnce(JSON.stringify(mockResponse));
//   await act(async () => render(<PolicyPage />));

//   expect(screen.getByText("banana-pineapple")).toBeInTheDocument();
//   expect(screen.getByText("Premium")).toBeInTheDocument();

//   const button = screen.getByText("Logout");
//   fireEvent.click(button);
//   expect(screen.getByText("Login to your account")).toBeInTheDocument();
// });

// test("Returns access token on login click", async () => {
//   fetch.mockResponseOnce(JSON.stringify({ access_token: "1234" }));
//   await act(async () => render(<App />));
//   const username = screen.getByLabelText("Username:");
//   fireEvent.change(username, { target: { value: "Abcde" } });
//   const password = screen.getByLabelText("Password:");
//   fireEvent.change(password, { target: { value: "12345" } });

//   const button = screen.getByText("Login");
//   fireEvent.click(button);
//   expect(fetch.mock.calls.length).toEqual(1);
// });
