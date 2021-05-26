import React from "react";
import {getByRole, getByText, render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";

import seed from "../../../backend/seed";

import Comedian from "./Comedian";

describe("Comedian Container", () => {
    const comedian = seed.comedians[0];
    const userOne = seed.users[0];
    const reactRouterProps = {
        params: {
            userId: comedian._id
        }
    };

    it("should render correctly", () =>{
        let wrapper = render(
            <BrowserRouter>
                <Comedian userId={undefined} match={reactRouterProps}/>            
            </BrowserRouter>
        );

        expect(wrapper).toMatchSnapshot();
    });

    describe("Comedian Page Banner", () => {
        beforeEach(() => {
            render(
                <BrowserRouter>
                    <Comedian userId={undefined} match={reactRouterProps}/>
                </BrowserRouter>
            );
        });

        it("should display the correct comedian's name", async () => {
            let heading = await screen.findByText(comedian.name);
    
            expect(heading).toBeInTheDocument();
        });
    
        it("should display the correct comedian subheading", async () => {
            let subheading = await screen.findByText(comedian.description);
    
            expect(subheading).toBeInTheDocument();
        });
    
        it("should display the correct comedian account picture", async () => {
            let accountPicture = screen.getByTestId("comedian-banner-account-picture");
    
            await waitFor(() => expect(accountPicture).toHaveStyle(`background-image: url(${comedian.accountImage})`));
        });
    });
    
    describe("Favorite Button", () => {
        it("should toggle the favorite button when clicked", () => {
            const userSix = seed.users[5];
            render(
            <BrowserRouter>
                <Comedian userId={userSix._id} match={reactRouterProps}/>
            </BrowserRouter>
            );
            let favBtn = screen.getByRole("button", {name: "Favorite"});
    
            expect(favBtn).not.toHaveClass("favorited");
    
            userEvent.click(favBtn);
    
            expect(favBtn).toHaveTextContent("Favorited");
            expect(favBtn).toHaveClass("favorited");
    
            userEvent.click(favBtn);
    
            expect(favBtn).toHaveTextContent("Favorite");
            expect(favBtn).not.toHaveClass("favorited");
        });
    
        it(`should display the "favorited" version of the favorite button when the user has already favorited a comedian`, () => {
            render(
            <BrowserRouter>
                <Comedian userId={userOne._id} match={reactRouterProps}/>
            </BrowserRouter>
            );
            let filledFavBtn = screen.getByRole("button", {name: "Favorited"});

            expect(filledFavBtn).toBeInTheDocument();
            expect(filledFavBtn).toHaveClass("favorited");
        });

        it("should not display the 'favorite' button if the user is not logged in", () => {
            render(
            <BrowserRouter>
                <Comedian userId={undefined} match={reactRouterProps}/>
            </BrowserRouter>
            );
            let favBtn = screen.getByRole("button", {name: "Favorite"});

            expect(favBtn).not.toBeInTheDocument();
        });
    });
    
    describe("Share Button", () => {
        it("should trigger displaying share options when share button is clicked", () => {
            render(
            <BrowserRouter>
                <Comedian userId={undefined} match={reactRouterProps}/>
            </BrowserRouter>
            );
            let shareBtn = screen.getByAltText("Share Button");
            let shareOptions = screen.getAllByTestId(/share-options/);
    
            test.each(shareOptions)("don't display %o before clicking on the share button", option => {
                expect(option).not.toBeVisible();
            });
    
            userEvent.click(shareBtn);
    
            test.each(shareOptions)("display %o after clicking on the share button", option => {
                expect(option).toBeVisible();
            });
        });
    });
    
    describe("Specials", () => {
        let firstSpecial;
        let firstSpecialIndicator;

        let secondSpecial;
        let secondSpecialIndicator;

        let specialInformation;

        beforeEach(async () => {
            render(
                <BrowserRouter>
                    <Comedian userId={undefined} match={reactRouterProps}/>
                </BrowserRouter>
            );

            firstSpecial = await screen.findByTestId("special-im-telling-you-for-the-last-time");
            firstSpecialIndicator = screen.getByTestId("indicator-im-telling-you-for-the-last-time");

            secondSpecial = screen.getByTestId("special-jerry-before-seinfeld");
            secondSpecialIndicator = screen.getByTestId("indicator-jerry-before-seinfeld");
            specialInformation = screen.getByTestId("special-information");
        });

        it("should toggle the special indicator when a special is clicked on", () => {
            userEvent.click(firstSpecial);
    
            expect(firstSpecialIndicator).toBeVisible();
    
            userEvent.click(firstSpecial);
    
            expect(firstSpecialIndicator).not.toBeVisible();
        });
    
        it("should hide the current indicator and show a new indicator when a new special is clicked on", () => {
            userEvent.click(firstSpecial);
    
            expect(firstSpecialIndicator).toBeVisible();
    
            userEvent.click(secondSpecial);
    
            expect(firstSpecialIndicator).not.toBeVisible();
            expect(secondSpecialIndicator).toBeVisible();
        });
    
        it("should toggle special details when a special is clicked on", () => {
            userEvent.click(firstSpecial);

            let firstSpecialTitle = screen.getByText(comedian.specials[0].specialTitle);
            let firstSpecialDescription = screen.getByText(comedian.specials[0].specialDescription);
            let firstSpecialAverageRating = screen.getByText("(3.5)");
    
            expect(specialInformation).toHaveClass("active");
            expect(firstSpecialTitle).toBeInTheDocument();
            expect(firstSpecialDescription).toBeInTheDocument();
            expect(firstSpecialAverageRating).toBeInTheDocument();
    
            userEvent.click(firstSpecial);
    
            expect(specialInformation).not.toHaveClass("active");
            expect(firstSpecialTitle).not.toBeInTheDocument();
            expect(firstSpecialDescription).not.toBeInTheDocument();
            expect(firstSpecialAverageRating).not.toBeInTheDocument();
        });

        it("should display the special cover when a trailer is unavailable", () => {
            userEvent.click(firstSpecial);

            let placeholderImg = screen.getByTestId("trailer-im-telling-you-for-the-last-time");

            expect(placeholderImg).toBeInTheDocument();
            expect(placeholderImg).toHaveAttribute("src", comedian.specials[0].specialCover);

            userEvent.click(secondSpecial);
            let videoTrailer = screen.getByTestId("trailer-jerry-before-seinfeld");

            expect(placeholderImg).not.toBeInTheDocument();

            expect(videoTrailer).toBeInTheDocument();
            expect(videoTrailer).toHaveAttribute("src", comedian.specials[1].specialTrailer);
        });
    
        it("should hide the current special details and show new special details when a new special is clicked on", () => {
            userEvent.click(firstSpecial);

            let firstSpecialTitle = screen.getByText(comedian.specials[0].specialTitle);
            let firstSpecialDescription = screen.getByText(comedian.specials[0].specialDescription);
    
            expect(specialInformation).toHaveClass("active");
            expect(firstSpecialTitle).toBeInTheDocument();
            expect(firstSpecialDescription).toBeInTheDocument();
    
            userEvent.click(secondSpecial);
            let secondSpecialTitle = screen.getByText(comedian.specials[1].specialTitle);
            let secondSpecialDescription = screen.getByText(comedian.specials[1].specialDescription);
    
            expect(firstSpecialTitle).not.toBeInTheDocument();
            expect(firstSpecialDescription).not.toBeInTheDocument();

            expect(secondSpecialTitle).toBeInTheDocument();
            expect(secondSpecialDescription).toBeInTheDocument();
        });
    });
    
    describe("Star Ratings", () => {
        it("should activate all the stars up to the hovered star and deactivate all the stars when the hover ends on an unrated special", async () => {
            render(
            <BrowserRouter>
                <Comedian userId={undefined} match={reactRouterProps}/>
            </BrowserRouter>
            );
            let firstSpecial = await screen.findByTestId("special-im-telling-you-for-the-last-time");
            userEvent.click(firstSpecial);
    
            let stars = screen.getAllByTestId("review-star-im-telling-you-for-the-last-time");
            userEvent.hover(stars[2]);
    
            let activeStars = stars.filter(x => x.className === "active");
    
            expect(activeStars).toHaveLength(3);
    
            userEvent.unhover(stars[2]);
    
            activeStars = stars.filter(x => x.className === "active");
    
            expect(activeStars).toHaveLength(0);
        });
    
        it("should activate all the stars up to the hovered star and deactivate all the stars down to the user rating when the hover ends on a rated special", () => {
            render(
                <BrowserRouter>
                    <Comedian userId={userOne._id} match={reactRouterProps}/>                
                </BrowserRouter>
            );
            let firstSpecial = screen.getByTestId("special-im-telling-you-for-the-last-time");
            userEvent.click(firstSpecial);
    
            let stars = screen.getAllByTestId("review-star-im-telling-you-for-the-last-time");
            let activeStars = stars.filter(x => x.className === "active");
    
            expect(activeStars).toHaveLength(2);
    
            userEvent.hover(stars[4]);
            activeStars = stars.filter(x => x.className === "active");
    
            expect(activeStars).toHaveLength(5);
    
            userEvent.unhover(stars[4]);
            activeStars = stars.filter(x => x.className === "active");
    
            expect(activeStars).toHaveLength(2);
        });
    
        it("should permanently activate stars up to the star that is clicked",() => {
            render(
                <BrowserRouter>
                    <Comedian userId={undefined} match={reactRouterProps}/>
                </BrowserRouter>
            );
            let firstSpecial = screen.getByTestId("special-im-telling-you-for-the-last-time");
            userEvent.click(firstSpecial);
    
            let stars = screen.getAllByTestId("review-star-im-telling-you-for-the-last-time");
            userEvent.click(stars[3]);
    
            let activeStars = stars.filter(x => x.className === "active");
    
            expect(activeStars).toHaveLength(4);
        });
    });
    
    describe("Carousels", () => {
        let allSlides;
        let dots;

        let firstSlideSpecial;
        let secondSlideSpecial;

        beforeAll(async () => {
            const carouselReactRouterProps = {
                params: {
                    userId: seed.comedians[2]._id
                }
            };

            render(
                <BrowserRouter>
                    <Comedian userId={undefined} match={carouselReactRouterProps}/>                
                </BrowserRouter>
            );

            allSlides = await screen.findAllByTestId("special-slide");
            dots = screen.getAllByTestId("carousel-dot");
            firstSlideSpecial = screen.getByTestId("special-killin-them-softly");
            secondSlideSpecial = screen.getByTestId("special-unforgiven");
        });

        it("should cycle right through items when the carousel right button is clicked", () => {    
            expect(allSlides[1]).toContainElement(firstSlideSpecial);
            expect(dots[0]).toHaveClass("active");
            expect(dots[1]).not.toHaveClass("active");
        
            let rightBtn = screen.getByTestId("special-right-button");
            userEvent.click(rightBtn);

            allSlides = getAllByTestId("special-slide");
                
            expect(allSlides[1]).toContainElement(secondSlideSpecial);
            expect(dots[0]).not.toHaveClass("active");
            expect(dots[1]).toHaveClass("active");
        });

        it("should cycle left through items when the carousel left button is clicked", () => {
            let leftBtn = screen.getByTestId("special-left-button");
            userEvent.click(leftBtn);
    
            allSlides = screen.getAllByTestId("special-slide");
            
            expect(allSlides[1]).toContainElement(firstSlideSpecial);
            expect(dots[0]).toHaveClass("active");
            expect(dots[1]).not.toHaveClass("active");
        });

        it("should loop around when the end of the slides is reached", () => {    
            let leftBtn = screen.getByTestId("special-left-button");
            userEvent.click(leftBtn);
    
            allSlides = screen.getAllByTestId("special-slide");
            
            expect(allSlides[1]).toContainElement(secondSlideSpecial);
            expect(dots[0]).not.toHaveClass("active");
            expect(dots[1]).toHaveClass("active");
        });
    });

    describe("Popular Videos Section", () => {
        beforeAll(() => {
            render(
                <BrowserRouter>
                    <Comedian userId={undefined} match={reactRouterProps}/>                
                </BrowserRouter>
            );
        });

        it("should render the 'Popular Videos' header", async () => {
            let heading = await screen.findByText("Popular Videos");

            expect(heading).toBeInTheDocument();
        });

        it("should loop through 4 popular videos in a carousel", () => {
            let rightBtn = screen.getByTestId("video-right-button");

            let allVideos = [
                "video1-jerry-seinfeld", 
                "video2-jerry-seinfeld", 
                "video3-jerry-seinfeld", 
                "video4-jerry-seinfeld", 
                "video1-jerry-seinfeld"
            ];
            
            test.each(allVideos)("display video %#", video => {
                let allSlides = screen.getAllByTestId("video-slide");
                expect(allSlides[1]).toContainElement(screen.getByTestId(video));
                userEvent.click(rightBtn);
            });
        });
    });
    
    describe("Similar Comedian Recommendations", () => {
        it("should show 4 profile windows of comedians similar to the current comedian", async () => {
            render(
                <BrowserRouter>
                    <Comedian userId={undefined} match={reactRouterProps}/>                
                </BrowserRouter>
            );
            let similarComedians = await screen.findAllByTestId(/comedian-window/);
    
            expect(similarComedians).toHaveLength(4);

            test.each([
                [similarComedians[0], "Mike Birbiglia"],
                [similarComedians[1], "Dave Chappelle"],
                [similarComedians[2], "Kevin Hart"],
                [similarComedians[3], "Demetri Martin"]
            ])("similar comedian %s is displayed", (similar, comedian) => {
                expect(similar).toContainElement(screen.getByText(comedian));
            });
        });
    });
    
    describe("Comments", () => {
        describe("Logged In", () => {
            let commentInput;
            let commentSubmit;
            let likeButtons;

            beforeAll(() => {
                render(
                    <BrowserRouter>
                        <Comedian userId={userOne._id} match={reactRouterProps}/>                
                    </BrowserRouter>
                );
    
                commentInput = screen.getByPlaceholderText("Leave a Comment!");
                commentSubmit = screen.getByRole("button", {name: "Submit"});
            });

            it("should add a comment to the page when the comment form is filled out and submitted", async () => { 
                let comments = await screen.findAllByTestId("comment");
    
                expect(comments).toHaveLength(1);
    
                userEvent.type(commentInput, "I love this comedian!");
        
                expect(commentInput).toBeValid();
        
                userEvent.click(commentSubmit);
                comments = screen.getAllByTestId("comment");
    
                expect(commentInput).toBeEmpty();
                expect(comments).toHaveLength(2);
                expect(comments[0]).toContainElement(screen.getByText(userOne.username));
                expect(comments[0]).toContainElement(screen.getByText("11/19/20, 2:15 PM"));
                expect(comments[0]).toContainElement(screen.getByText("I love this comedian!"));
            });
        
            it("should not submit a comment when the comment field is empty", () => {    
                expect(commentInput).toBeInvalid();
                expect(commentSubmit).toBeDisabled();
        
                userEvent.click(commentInput);
                userEvent.click(commentSubmit);
        
                let comments = screen.getAllByTestId("comment");
                let popUpMessage = screen.getByText("Cannot post a blank comment");
        
                expect(comments).toHaveLength(2);
                expect(popUpMessage).toBeInTheDocument();
            });
    
            it("should indicate when a user has previously liked a comment", () => {
                likeButtons = screen.getAllByTestId("comment-like-button");
                expect(likeButtons[0]).toHaveClass("active");
                expect(likeButtons[1]).not.toHaveClass("active");
            });
            
            it("should toggle the like button indicator and incrementation when clicked", () => {
                let likeNumbers = screen.getAllByTestId("comment-like-number")
        
                expect(likeNumbers[1]).not.toHaveTextContent();
                expect(likeButtons[1]).not.toHaveClass("active");
    
                userEvent.click(likeButtons[1]);
            
                expect(likeNumbers[1]).toHaveTextContent("1");
                expect(likeButtons[1]).toHaveClass("active");
    
        
                userEvent.click(likeButtons[1]);
            
                expect(likeNumbers[1]).not.toHaveTextContent();
                expect(likeButtons[1]).not.toHaveClass("active");
            });
        });

        describe("Not Logged In", () => {
            it("should not allow a user to like a comment if they are not logged in", () => {
                render(
                    <BrowserRouter>
                        <Comedian userId={undefined} match={reactRouterProps}/>                
                    </BrowserRouter>
                );
    
                let likeButton = screen.getByTestId("comment-like-button");
                
                expect(likeButton).not.toHaveClass("active");

                userEvent.click(likeButton);

                expect(likeButton).not.toHaveClass("active");
                expect(getByText("You Must Be Logged In To Upvote A Comment")).toBeInTheDocument();
                expect(getByRole("button", {name: "Login"})).toBeInTheDocument();
            });
        });
    });
});