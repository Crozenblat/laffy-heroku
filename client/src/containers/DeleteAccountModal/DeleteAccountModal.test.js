import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event"

import DeleteAccountModal from "./DeleteAccountModal";

describe("Delete Account Modal", () => {
    beforeEach(() => {
        render(<DeleteAccountModal/>);
    });

    it("should render correctly", () => { 
        let wrapper = render(<DeleteAccountModal/>);

        expect(wrapper).toMatchSnapshot();
    });

    it("should display the proper heading", () => {
        let heading = screen.getByText("Delete Account?");

        expect(heading).toBeInTheDocument();
    })

    it("should display the proper message", () => {
        let message = screen.getByText("Are you sure you want to delete your account? There is no way to reverse this action.");

        expect(message).toBeInTheDocument();
    });

    it("should disappear when the 'cancel' button is clicked", () => {
        let deleteAccountModal = screen.getByTestId("delete-account-modal");

        expect(deleteAccountModal).toBeVisible();

        let cancelBtn = screen.getByRole("button", {name: "Cancel"});
        userEvent.click(cancelBtn);

        expect(deleteAccountModal).not.toBeVisible();
    });

    it("should display a loading animation when the 'delete' button is clicked", async () => {
        let deleteBtn = screen.getByRole("button", {name: "Delete"});
        userEvent.click(deleteBtn);
        let loadingAnimation = screen.getByTestId("loading-animation");

        expect(loadingAnimation).toBeInTheDocument();
        expect(screen.getByText("Delete Account?")).not.toBeInTheDocument();
    });

    describe("Confirmation Box", () => {
        it("should appear after the 'delete' button is clicked declaring that the account has been successfully deleted", async () => {
            let deleteBtn = screen.getByRole("button", {name: "Delete"});
            userEvent.click(deleteBtn);
            let confirmationMessage = await screen.findByText("Your account has been successfully deleted.");
            let loadingAnimation = screen.getByTestId("loading-animation");
    
            expect(screen.getByText("Delete Account?")).not.toBeInTheDocument();
            expect(confirmationMessage).toBeInTheDocument();
            expect(loadingAnimation).not.toBeInTheDocument();
        });

        it("should disappear when the 'OK' button is clicked", async () => {
            let deleteAccountModal = screen.getByTestId("delete-account-modal");
    
            expect(deleteAccountModal).toBeVisible();

            let okBtn = screen.getByRole("button", {name: "OK"});
            userEvent.click(okBtn);

            expect(deleteAccountModal).not.toBeVisible();
        });
    });
});