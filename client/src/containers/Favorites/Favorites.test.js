import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";

import seed from "../../../backend/seed";

import Favorites from "./Favorites";

describe("Favorites Container", () => {
    const userTwentyThree = seed.users[22];

    it("should render correctly", () => {
        let wrapper = render(
            <BrowserRouter>
                <Favorites userId={userTwentyThree._id}/>
            </BrowserRouter>
        );
    
        expect(wrapper).toMatchSnapshot();
    });
    
    it("should display the user's favorited comedians", async () => {
        render(
            <BrowserRouter>
                <Favorites userId={userTwentyThree._id}/>            
            </BrowserRouter>
        );
        let favoriteComedians = await screen.findAllByTestId(/comedian-window/);

        expect(favoriteComedians).toHaveLength(5);

        test.each([
            [favoriteComedians[0], "John Mulaney", seed.comedians[14].tags[0]],
            [favoriteComedians[1], "Katherine Ryan", seed.comedians[15].tags[0]],
            [favoriteComedians[2], "Hannibal Buress", seed.comedians[16].tags[0]],
            [favoriteComedians[3], "Colin Quinn", seed.comedians[17].tags[0]],
            [favoriteComedians[4], "Tom Papa", seed.comedians[18].tags[0]]
        ])("favorite comedian %s is displayed", (favorited, comedian, tag) => {
            expect(favorited).toContainElement(screen.getByAltText(comedian));
            expect(favorited).toContainElement(screen.getByText(comedian));
            expect(tag).toContainElement(screen.getByRole("button", {name: tag}));
        });
    });

    it("should display a message to user who hasn't favorited any comedians encouraging them to favorite some comedians", async () => {
        render(
            <BrowserRouter>
                <Favorites userId={null}/>
            </BrowserRouter>
        );
        let favoriteComedians = await screen.findAllByTestId(/comedian-window/);
        let message = screen.getByText("You haven't favorited any comedians yet. Go favorite some and they'll show uo here!");
        let exploreBtn = screen.getByRole("button", {name: "Explore"});

        expect(favoriteComedians).toHaveLength(0);
        expect(message).toBeInTheDocument();
        expect(exploreBtn).toBeInTheDocument();
    });

    it("should display a message to a non-logged in user encouraging them to sign up for an account", async () => {
        render(
            <BrowserRouter>
                <Favorites userId={null}/>
            </BrowserRouter>
        );
        let favoriteComedians = await screen.findAllByTestId(/comedian-window/);
        let message = screen.getByText("Whoops! It looks like you don't have an account. Sign up now!");
        let signUpBtn = screen.getByRole("button", {name: "Sign Up!"});

        expect(favoriteComedians).toHaveLength(0);
        expect(message).toBeInTheDocument();
        expect(signUpBtn).toBeInTheDocument();
    });
});