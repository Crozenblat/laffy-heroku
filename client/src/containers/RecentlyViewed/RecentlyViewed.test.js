import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";

import seed from "../../../backend/seed";

import RecentlyViewed from "./RecentlyViewed";

describe("Recently Viewed Comedians Container", () => {
    const userOne = seed.users[0];
    
    it("should render correctly", () => {
        let wrapper = render(
            <BrowserRouter>
                <RecentlyViewed userId={userOne._id}/>
            </BrowserRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("should render a user's 4 most recently viewed comedians", async () => {
        render(
            <BrowserRouter>
                <RecentlyViewed userId={userOne._id}/>            
            </BrowserRouter>
        );
        let recentlyViewedComedians = await screen.findAllByTestId(/comedian-window/);

        expect(recentlyViewedComedians).toHaveLength(4);

        test.each([
            [recentlyViewedComedians[0], "Deon Cole", seed.comedians[6].tags[0]],
            [recentlyViewedComedians[1], "Aziz Ansari", seed.comedians[7].tags[0]],
            [recentlyViewedComedians[2], "Tig Notaro", seed.comedians[9].tags[0]],
            [recentlyViewedComedians[3], "Brian Regan", seed.comedians[10].tags[0]]
        ])("recently viewed comedian %s is displayed", (recentlyViewed, comedian, tag) => {
            expect(recentlyViewed).toContainElement(screen.getByAltText(comedian));
            expect(recentlyViewed).toContainElement(screen.getByText(comedian));
            expect(recentlyViewed).toContainElement(screen.getByRole("button", {name: tag}));
        });
    });

    it("should display a message to user who hasn't recently viewed any comedians", async () => {
        render(
            <BrowserRouter>
                <RecentlyViewed userId={null}/>
            </BrowserRouter>
        );
        let recentlyViewedComedians = await screen.findAllByTestId(/comedian-window/);
        let message = screen.getByText("You haven't viewed any comedians recently.");

        expect(recentlyViewedComedians).toHaveLength(0);
        expect(message).toBeInTheDocument();
    });

    it("should display a message to a non-logged in user encouraging them to sign up for an account", async () => {
        render(
            <BrowserRouter>
                <RecentlyViewed userId={null}/>
            </BrowserRouter>
        );
        let recentlyViewedComedians = await screen.findAllByTestId(/comedian-window/);
        let message = screen.getByText("Whoops! It looks like you don't have an account. Sign up now!");
        let signUpBtn = screen.getByRole("button", {name: "Sign Up!"});

        expect(recentlyViewedComedians).toHaveLength(0);
        expect(message).toBeInTheDocument();
        expect(signUpBtn).toBeInTheDocument();
    });
});