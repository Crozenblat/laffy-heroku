import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import seed from "../../../backend/seed";

describe("Change Password Form", () => {
    const userOne = seed.users[0];
    let currentPasswordField;
    let newPasswordField;
    let changePasswordBtn;

    beforeEach(() => {
        render(<ChangePassword userId={userOne._id}/>);

        currentPasswordField = screen.getByPlaceholder("Current Password");
        newPasswordField = screen.getByPlaceholder("New Password");
        changePasswordBtn = screen.getByRole("button", {name: "Change Password"});
    });

    it("should render correctly", () => {
        let wrapper = render(<ChangePassword userId={userOne._id}/>);

        expect(wrapper).toMatchSnapshot();
    });

    it("should disable the 'change password' button if one or more of the fields is empty", () => {
        expect(currentPasswordField).toBeInvalid();
        expect(newPasswordField).toBeInvalid();
        expect(changePasswordBtn).toBeDisabled();
    });

    it("should display a loading animation whilst attempting to change the password in the database", () => {
        userEvent.type(currentPasswordField, "incorrectPassword");
        userEvent.type(newPasswordField, "newUserOnePassword");

        expect(currentPasswordField).toBeValid();
        expect(newPasswordField).toBeValid();

        userEvent.click(changePasswordBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        expect(loadingAnimation).toBeInTheDocument();
    });

    it("should display a success message if the password is successfully changed", async () => {
        userEvent.type(currentPasswordField, userOne.password);
        userEvent.type(newPasswordField, "newUserOnePassword");

        expect(currentPasswordField).toBeValid();
        expect(newPasswordField).toBeValid();

        userEvent.click(changePasswordBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        await waitFor(() => expect(changePasswordBtn).toHaveClass("success"));
        expect(screen.getByText("Password Changed Successfully")).toBeInTheDocument();
        expect(loadingAnimation).not.toBeInTheDocument();
    });

    it("should display an error message if the user fails to enter the current password", async () => {
        userEvent.type(currentPasswordField, "incorrectPassword");
        userEvent.type(newPasswordField, "newUserOnePassword");

        expect(currentPasswordField).toBeValid();
        expect(newPasswordField).toBeValid();

        userEvent.click(changePasswordBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        await waitFor(() => expect(signUpBtn).toHaveClass("failure"));
        expect(screen.getByText("Current Password Is Incorrect")).toBeInTheDocument();
        expect(loadingAnimation).not.toBeInTheDocument();
    });

    it("should display an error message if the proposed password is too short", async () => {
        userEvent.type(currentPasswordField, userOne.password);
        userEvent.type(newPasswordField, "short");

        expect(currentPasswordField).toBeValid();
        expect(newPasswordField).toBeInvalid();

        userEvent.click(changePasswordBtn);

        expect(signUpBtn).toHaveClass("failure");
        expect(screen.getByText("New Password Must Be At Least 8 Characters Long")).toBeInTheDocument();
    });
    
    it("should display an error message if the proposed password is the same as the current password", () => {
        userEvent.type(currentPasswordField, userOne.password);
        userEvent.type(newPasswordField, userOne.password);

        expect(currentPasswordField).toBeValid();
        expect(newPasswordField).toBeValid();

        userEvent.click(changePasswordBtn);
        
        expect(signUpBtn).toHaveClass("failure");
        expect(screen.getByText("New Password Must Be Different Than the Current Password")).toBeInTheDocument();
    });
});