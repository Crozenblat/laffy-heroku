import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";

import Trending from './Trending';

describe("Trending Comedians Container", () => {
    it("should render correctly", () => {
        let wrapper = render(
        <BrowserRouter>
            <Trending userId={null}/>
        </BrowserRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("should display 10 trending comedian tabs", async () => {
        render(
        <BrowserRouter>
            <Trending userId={null}/>
        </BrowserRouter>
        );
        let trendingComedians = await screen.findAllByTestId(/trending-tab/);

        expect(trendingComedians).toHaveLength(10);

        test.each([
            [trendingComedians[0], "Jerry Seinfeld", "300"],
            [trendingComedians[1], "Mike Birbiglia", "280"],
            [trendingComedians[2], "Dave Chappelle", "250"],
            [trendingComedians[3], "Kevin Hart", "200"],
            [trendingComedians[4], "Sebastian Maniscalco", "180"],
            [trendingComedians[5], "Jim Gaffigan", "150"],
            [trendingComedians[6], "Tig Notaro", "120"],
            [trendingComedians[7], "Brian Regan", "100"],
            [trendingComedians[8], "John Mulaney", "80"],
            [trendingComedians[9], "Tom Papa", "50"]
        ])("trending comedian %s is displayed", (trendingTab, comedian, viewCount) => {
            expect(trendingTab).toContainElement(screen.getByAltText(comedian));
            expect(trendingTab).toContainElement(screen.getByText(comedian));
            expect(trendingTab).toContainElement(screen.getByText(viewCount));
        });
    });
});