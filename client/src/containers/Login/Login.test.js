import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import seed from "../../../backend/seed";

import Login from "./Login";

describe("Login Container", () => {
    const userOne = seed.users[0];
    let usernameField;
    let passwordField;
    let loginBtn;

    beforeEach(() => {
        render(<Login/>);

        usernameField = screen.getByPlaceholder("login-username-field");
        passwordField = screen.getByPlaceholder("login-username-field");
        loginBtn = screen.getByRole("button", {name: "Log In"});
    });

    it("should render correctly", () => {
        let wrapper = render(<Login/>);

        expect(wrapper).toMatchSnapshot();
    });

    it("should disable the 'log in' button if one or more of the fields is empty", () => {
        expect(usernameField).toBeInvalid();
        expect(passwordField).toBeInvalid();
        expect(loginBtn).toBeDisabled();
    });

    it("should display a loading animation whilst attempting to log in", () => {
        userEvent.type(usernameField, "nonExistentUsername");
        userEvent.type(passwordField, userOne.password);

        eexpect(usernameField).toBeValid();
        expect(passwordField).toBeValid();

        userEvent.click(loginBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        expect(loadingAnimation).toBeInTheDocument();
    });

    it("should display an error message if the username is not found", async () => {
        userEvent.type(usernameField, "nonExistentUsername");
        userEvent.type(passwordField, userOne.password);

        expect(usernameField).toBeValid();
        expect(passwordField).toBeValid();

        userEvent.click(loginBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        expect(await screen.findByText("User Not Found")).toBeInTheDocument();
        expect(loginBtn).toHaveClass("failure");
        expect(loadingAnimation).not.toBeInTheDocument();
    });

    it("should display an error message if the password is incorrect", async () => {
        userEvent.type(usernameField, seed.users[0].username);
        userEvent.type(passwordField, "incorrectPassword");

        userEvent.click(loginBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        expect(usernameField).toBeValid();
        expect(passwordField).toBeValid();
        expect(await screen.findByText("Incorrect Password")).toBeInTheDocument();
        expect(loginBtn).toHaveClass("failure");
        expect(loadingAnimation).not.toBeInTheDocument();
    });
});