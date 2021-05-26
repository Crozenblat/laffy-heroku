import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";

import seed from "../../../backend/seed";

import SignUp from "./SignUp";

describe("Sign Up Form", () => {
    const userOne = seed.users[0];
    let usernameField;
    let passwordField;
    let signUpBtn;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <SignUp/>
            </BrowserRouter>
        );

        usernameField = screen.getByTestId("signup-username-field");
        passwordField = screen.getByTestId("signup-password-field");
        signUpBtn = screen.getByRole("button", {name: "Sign Up"});
    });

    it("should render correctly", () => {
        let wrapper = render(
            <BrowserRouter>
                <SignUp/>
            </BrowserRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("should disable the 'sign up' button if one or more of the fields is empty", () => {
        expect(usernameField).toBeInvalid();
        expect(passwordField).toBeInvalid();
        expect(signUpBtn).toBeDisabled();
    });

    it("should display a loading animation whilst attempting to sign up", () => {
        userEvent.type(usernameField, "nonExistentUsername");
        userEvent.type(passwordField, userOne.password);

        eexpect(usernameField).toBeValid();
        expect(passwordField).toBeValid();

        userEvent.click(signUpBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        expect(loadingAnimation).toBeInTheDocument();
    });

    it("should accept a unique username and a password at least 8 characters long", async () => {
        userEvent.type(usernameField, "uniqueUsername");
        userEvent.type(passwordField, "newPassword");

        userEvent.click(signUpBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        expect(usernameField).toBeValid();
        expect(passwordField).toBeValid();
        await waitFor(() => expect(signUpBtn).toHaveClass("success"));
        expect(loadingAnimation).not.toBeInTheDocument();

    });

    it("should display an error message if the username is already taken", async () => {
        userEvent.type(usernameField, userOne.username);
        userEvent.type(passwordField, "newPassword");

        userEvent.click(signUpBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        expect(usernameField).toBeValid();
        expect(passwordField).toBeValid();
        expect(await screen.findByText("Username already taken"));
        expect(signUpBtn).toHaveClass("failure");
        expect(loadingAnimation).not.toBeInTheDocument();
    });

    it("should display an error message if the password is less than 8 characters", async () => {
        userEvent.type(usernameField, "uniqueUsername");
        userEvent.type(passwordField, "short");

        userEvent.click(signUpBtn);

        expect(usernameField).toBeValid();
        expect(passwordField).toBeInvalid();
        expect(await screen.findByText("Password must be at least 8 characters"));
        await waitFor(() => expect(signUpBtn).toHaveClass("failure"));
    });
});