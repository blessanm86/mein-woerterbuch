import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import useFirebase from "../../hooks/useFirebase";
import { act } from "react-test-renderer";

jest.mock("../../hooks/useFirebase");

test("Login Page", () => {
  useFirebase.mockReturnValue({
    user: null,
    getAllWords: () =>
      Promise.resolve([
        { type: "noun", word: "Tisch", article: "Der", meaning: "Table" }
      ])
  });

  const { getByDisplayValue, getByPlaceholderText, getByText } = render(
    <App />
  );
  const usernameInput = getByDisplayValue(/blessanm86/i);
  const passwordInput = getByPlaceholderText(/password/i);
  const loginButton = getByText(/login/i);

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeDisabled();
});
