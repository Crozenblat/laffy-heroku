import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";

import seed from "../../backend/seed";

import TopComedians from "./TopComedians";

describe("Top Comedians Container", () => {
    const userOne = seed.users[0];

    it("should render correctly", () => {
        let wrapper = render(
            <BrowserRouter>
                <TopComedians userId={userOne._id}/>
            </BrowserRouter>
        );
        
        expect(wrapper).toMatchSnapshot(); 
    });
        
    it("should display the top 5 most favorited comedian windows", async () => {
        render(
            <BrowserRouter>
                <TopComedians userId={userOne._id}/>
            </BrowserRouter>
        );
        let topComedians = await screen.findAllByTestId(/comedian-window/);

        expect(topComedians).toHaveLength(5);

        test.each([
            [topComedians[0], "Sebastian Maniscalco", seed.comedians[5].tags[0]],
            [topComedians[1], "Deon Cole", seed.comedians[6].tags[0]],
            [topComedians[2], "Aziz Ansari", seed.comedians[7].tags[0]],
            [topComedians[3], "Jim Gaffigan", seed.comedians[8].tags[0]],
            [topComedians[4], "Tig Notaro", seed.comedians[9].tags[0]]
        ])("recently viewed comedian %s is displayed", (topComedian, comedian, tag) => {
            expect(topComedian).toContainElement(screen.getByAltText(comedian));
            expect(topComedian).toContainElement(screen.getByText(comedian));
            expect(topComedian).toContainElement(screen.getByRole("button", {name: tag}))
        });
    });
});