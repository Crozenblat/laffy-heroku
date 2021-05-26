import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";

import SearchResults from "./SearchResults";

describe("Search Results Page", () => {
    const reactRouterProps = {
        params: {
            searchTerm: "Family"
        }
    };

    beforeEach(() => {
        render(
            <BrowserRouter>
                <SearchResults match={reactRouterProps}/>            
            </BrowserRouter>
        );
    });

    it("should render correctly", () => {
        let wrapper = render(
            <BrowserRouter>
                <SearchResults match={reactRouterProps}/>            
            </BrowserRouter>
        );
    
        expect(wrapper).toMathSnapshot();
    });

    it("should display the 'Search Results' heading", () => {
        let heading = screen.getByText("Search Results");

        expect(heading).toBeInTheDocument();
    });

    it("should display only the 5 comedians who have the 'Family' tag in order of favorites received", async () => {
        let taggedComedians = await screen.findAllByTestId(/comedian-window/);
        let familyTags = screen.getAllByRole("button", {name: "Family"});

        expect(taggedComedians).toHaveLength(5);
        expect(familyTags).toHaveLength(5);

        test.each([
            [taggedComedians[0], "Jim Gaffigan"],
            [taggedComedians[1], "Mike Birbiglia"],
            [taggedComedians[2], "Patton Oswalt"],
            [taggedComedians[3], "Kevin Hart"],
            [taggedComedians[4], "Tom Papa"]
        ])("tagged comedian %s is displayed", (tagged, comedian) => {
            expect(tagged).toContainElement(screen.getByText(comedian));
        });
    });
});