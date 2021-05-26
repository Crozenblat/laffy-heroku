import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";

import seed from "../../../backend/seed";

import TourFeed from "./TourFeed";

describe("Tour Date Container", () => {
    const userOne = seed.users[0];

    it("should render correctly", () => {
        let wrapper = render(
            <BrowserRouter>
                <TourFeed userId={userOne._id} comedian={null}/>            
            </BrowserRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("should render tour dates correctly from multiple ccomedians", async () => {
        render(
            <BrowserRouter>
                <TourFeed userId={userOne._id} comedian={null}/>            
            </BrowserRouter>
        );
        let tourDates = await screen.findAllByTestId("tour-date");
        
        expect(tourDates).toHaveLength(2);

        test.each([
            [tourDates[0], "Hannibal Buress", "Miami", "FL", "New World Center", "December 8th", "2020", "Sunday", "8:30pm"],
            [tourDates[1], "Tig Notaro", "New York", "NY", "Apollo Theater", "November 17th", "2020", "Tuesday", "TBA"]
        ])("display a tour date for %s", (tourDate, comedian, city, state, venue, date, year, day, time) => {
            expect(tourDate).toContainElement(screen.getAllByAltText(comedian));
            expect(tourDate).toContainElement(screen.getByText(comedian));
            expect(tourDate).toContainElement(screen.getByText(city));
            expect(tourDate).toContainElement(screen.getByText(state));
            expect(tourDate).toContainElement(screen.getByText(venue));
            expect(tourDate).toContainElement(screen.getByText(date));
            expect(tourDate).toContainElement(screen.getByText(year));
            expect(tourDate).toContainElement(screen.getByText(day));
            expect(tourDate).toContainElement(screen.getByText(time));
            expect(tourDate).toContainElement(screen.getByRole("button", {name: "Get Tickets!"}));
        });
    });

    it("should display an alert when a tour date has been announced recently", async () => {
        render(
            <BrowserRouter>
                <TourFeed userId={userOne._id} comedian={null}/>
            </BrowserRouter>
        );
        let tourDates = await screen.findAllByTestId("tour-date");

        expect(tourDates[0]).toContainElement(screen.getByText("Hannibal Buress"));
        expect(tourDates[0]).toContainElement(screen.getByText("New Date!"));

        expect(tourDates[1]).toContainElement(screen.getByText("Tig Notaro"));
        expect(tourDates[1]).not.toContainElement(screen.getByText("New Date!"));

    });

    it("should correctly render upcoming shows from a single comedian", async () => {
        render(
            <BrowserRouter>
                <TourFeed userId={null} comedian={seed.comedians[0].name}/>
            </BrowserRouter>
        );
        let tourDates = await screen.findAllByTestId("tour-date");
        
        expect(tourDates).toHaveLength(3);

        test.each([
            [tourDates[0], "Jerry Seinfeld", "Tampa", "FL", "Straz Center", "January 26th", "2021", "Tuesday", "8:30pm"],
            [tourDates[1], "Jerry Seinfeld", "Los Angeles", "CA", "The Comedy Store", "TBD", "2020"],
            [tourDates[2], "Jerry Seinfeld", "New York", "NY", "Radio City Music Hall", "TBA", "2020"]
        ])("display a tour date for %s", (tourDate, comedian, city, state, venue, date, year, day, time) => {
            expect(tourDate).toContainElement(screen.getAllByAltText(comedian));
            expect(tourDate).toContainElement(screen.getByText(comedian));
            expect(tourDate).toContainElement(screen.getByText(city));
            expect(tourDate).toContainElement(screen.getByText(state));
            expect(tourDate).toContainElement(screen.getByText(venue));
            expect(tourDate).toContainElement(screen.getByText(date));
            expect(tourDate).toContainElement(screen.getByText(year));
            expect(tourDate).toContainElement(screen.getByText(day));
            expect(tourDate).toContainElement(screen.getByText(time));
            expect(tourDate).toContainElement(screen.getByRole("button", {name: "Get Tickets!"}));
        });
    });

    it("should display a message when a comedian has no current shows scheduled", async () => {
        render(
            <BrowserRouter>
                <TourFeed userId={null} comedian={seed.comedians[0].name}/>
            </BrowserRouter>
        );
        let tourDates = await screen.findAllByTestId("tour-date");
        let message = screen.getByText("No tour dates currently scheduled.");

        expect(tourDates).toHaveLength(0);
        expect(screen.getByText(message)).toBeInTheDocument();
    });

    it("should display a message when there are no current shows coming near a user", async () => {
        render(
            <BrowserRouter>
                <TourFeed userId={userOne._id} comedian={null}/>
            </BrowserRouter>
        );
        let tourDates = await screen.findAllByTestId("tour-date");
        let message = screen.getByText("No tours currently coming near you.");

        expect(tourDates).toHaveLength(0);
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});