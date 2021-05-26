import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {BrowserRouter} from "react-router-dom";

import seed from "../../../backend/seed";

import Recommended from "./Recommended";

describe("Recommended Comedians Container", () => {
    const userSeventeen = seed.users[16];
    
    it("should render correctly", () => {
        let wrapper = render(
            <BrowserRouter>
                <Recommended userId={userSeventeen._id}/>
            </BrowserRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("should display the top 5 recommended comedian windows for a logged in user", async () => {
        render(
            <BrowserRouter>
                <Recommended userId={userSeventeen._id}/>
            </BrowserRouter>
        );
        let recommendedComedians = await screen.findAllByTestId(/comedian-window/);

        expect(recommendedComedians).toHaveLength(5);

        test.each([
            [recommendedComedians[0], "Marc Maron", seed.comedians[11].tags[0]],
            [recommendedComedians[1], "Patton Oswalt", seed.comedians[12].tags[0]],
            [recommendedComedians[2], "D.L. Hughley", seed.comedians[13].tags[0]],
            [recommendedComedians[3], "John Mulaney", seed.comedians[14].tags[0]],
            [recommendedComedians[4], "Katherine Ryan", seed.comedians[15].tags[0]],
        ])("recently viewed comedian %s is displayed", (recentlyViewed, comedian, tag) => {
            expect(recentlyViewed).toContainElement(screen.getByAltText(comedian));
            expect(recentlyViewed).toContainElement(screen.getByText(comedian));
            expect(recentlyViewed).toContainElement(screen.getByRole("button", {name: tag}));
        });
    });

    it("should display a message to user who hasn't favorited any comedians encouraging them to favorite some comedians to recieve recommendations", async () => {
        render(
            <BrowserRouter>
                <Recommended userId={null}/>
            </BrowserRouter>
        );
        let recommendedComedians = await screen.findAllByTestId(/comedian-window/);
        let message = screen.getByText("You haven't favorited any comedians yet. Go favorite some so we can recommended more that we thnk you'll like!");
        let exploreBtn = screen.getByRole("button", {name: "Explore"});

        expect(recommendedComedians).toHaveLength(0);
        expect(message).toBeInTheDocument();
        expect(exploreBtn).toBeInTheDocument();
    });

    it("should display a message to a non-logged in user encouraging them to sign up for an account", () => {
        render(
            <BrowserRouter>
                <Recommended userId={null}/>
            </BrowserRouter>
        );
        let message = screen.getByText("Whoops! It looks like you're not currently logged in. Sign up now!");
        let signUpBtn = screen.getByRole("button", {name: "Sign Up!"});

        expect(message).toBeInTheDocument();
        expect(signUpBtn).toBeInTheDocument();
    });
});