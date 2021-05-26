require("./config/envConfig");

const request = require("supertest");
const app = require("./server.js").app;
const seed = require("./seed");

const jwt = require("jsonwebtoken");

const {Comedian} = require("./models/comedian");
const {User} = require("./models/user");

const {authenticate} = require("./middleware/authenticate");

const db = require("./db/db");

const populateMockDb = async () => {
    const collections = await db.getDb().collections;

    for(let collection in collections){
        collections[collection].drop();
    };

    await Comedian.insertMany(seed.comedians);
    await User.insertMany(seed.users);
};

beforeAll(async () => {
    await db.initDb();
});

afterAll(() => {
    db.killDb();
});

let userOne = seed.users[0];
let userOneJWTToken = jwt.sign({userId: userOne._id}, process.env.JWT_SECRET);

let comedianOne = seed.comedians[0];

let mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

describe("Server", () => {
    beforeEach(async () => {
        await populateMockDb();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /comedians/:comedianId", () => {
        it("should retrieve comedian information and 4 similar comedians from the database", async () => {
            let getComedian = await request(app).get(`/comedians/${comedianOne._id}`);
            let formatSimilarComedian = ({name, accountImage, tags}) => {
                return{
                    name,
                    accountImage,
                    tags
                };
            };

            let desiredSimilarComediansArray = [
                formatSimilarComedian(seed.comedians[1]),
                formatSimilarComedian(seed.comedians[2]),
                formatSimilarComedian(seed.comedians[3]),
                formatSimilarComedian(seed.comedians[4])
            ];

            let receivedSimilarComediansArray = getComedian.body.similarComedians.map(comedian => {
                return formatSimilarComedian(comedian);
            });

            expect(getComedian.statusCode).toBe(200);
            expect(getComedian.body.name).toEqual(comedianOne.name);
            expect(receivedSimilarComediansArray).toEqual(desiredSimilarComediansArray);
        });
    });
    
    describe("GET /comedians/top-comedians", () => {
        it("should retrieve the top 5 comedians by total favorites", async () => {
            let getTopComedians = await request(app).get("/comedians/top-comedians");
            let comedians = getTopComedians.body.map(x => x.name);

            expect(getTopComedians.statusCode).toBe(200);
            expect(comedians).toHaveLength(5);
            expect(comedians).toEqual(["Sebastian Maniscalco", "Deon Cole", "Aziz Ansari", "Jim Gaffigan", "Tig Notaro"]);
        });
    });

    describe("GET /comedians/trending", () => {
        it("should retrieve top 5 comedians by view count", async () => {
            let getTrendingComedians = await request(app).get("/comedians/trending");
            let comedians = getTrendingComedians.body.map(x => x.name);

            expect(getTrendingComedians.statusCode).toBe(200);
            expect(comedians).toHaveLength(5);
            expect(comedians).toEqual(["Jim Gaffigan", "Jerry Seinfeld", "Brian Regan", "Dave Chappelle", "Sebastian Maniscalco"]);
        });
    });

    describe("GET /user/recommended", () => {
        it("should retrieve 5 comedians favorited by other users with the same favorites as the current user", async () => {
            let userSeventeen = seed.users[16];
            let userSeventeenJWT = jwt.sign({userId: userSeventeen._id}, process.env.JWT_SECRET);
            let getRecommendedComedians = await request(app).get("/user/recommended")
            .set("cookie", `authToken=${userSeventeenJWT}`);

            let comedians = getRecommendedComedians.body.map(x => x.name);

            expect(getRecommendedComedians.statusCode).toBe(200);
            expect(comedians).toEqual(["Marc Maron", "Patton Oswalt", "D.L. Hughley", "John Mulaney", "Katherine Ryan"]);
        });
    });

    describe("GET /user/favorited", () => {
        it("should retrieve a user's favorited comedians", async () => {
            let userTwentyThree = seed.users[22];
            let userTwentyThreeAccessToken = jwt.sign({userId: userTwentyThree._id}, process.env.ACCESS_JWT_SECRET);
            let getFavorites = await request(app).get("/user/favorited")
            .auth(userTwentyThreeAccessToken, {type: bearer});
            let comedians = getFavorites.body.map(x => x.name);

            expect(getFavorites.statusCode).toBe(200);
            expect(comedians).toEqual(["John Mulaney", "Katherine Ryan", "Hannibal Buress", "Colin Quinn", "Tom Papa"]);
        });
    });

//     describe("GET /user/recentlyViewed", () => {
//         it("should retrieve a user's 4 most recently viewed comedians", async () => {
//             let getRecentlyViewed = await request(app).get("/user/recentlyViewed")
//             .auth(userOneAccessToken, {type: bearer});
//             let comedians = getRecentlyViewed.body.map(x => x.name);

//             expect(getRecentlyViewed.statusCode).toBe(200);
//             expect(comedians).toEqual(["Deon Cole", "Aziz Ansari", "Tig Notaro", "Brian Regan"]);
//         });
//     });

//     describe("GET /comedians/search?search-term=user-input", () => {
//         it("should retrieve comedians by their full name", async () => {
//             let getComedianFullName = await request(app).get("/comedians/search?search-term=d.l.-hughley");

//             expect(getComedianFullName.statusCode).toBe(200);
//             expect(getComedianFullName.body).toHaveLength(1);
//             expect(getComedianFullName.body[0].name).toBe("D.L. Hughley");
//         });

//         it("should retrieve comedians by their first name", async () => {
//             let getComedianFirstName = await request(app).get("/comedians/search?search-term=aziz");

//             expect(getComedianFirstName.statusCode).toBe(200);
//             expect(getComedianFirstName.body).toHaveLength(1);
//             expect(getComedianFirstName.body[0].name).toBe("Aziz Ansari");
//         });

//         it("should retrieve comedians by their last name", async () => {
//             let getComedianLastName = await request(app).get("/comedians/search?search-term=chappelle");

//             expect(getComedianLastName.statusCode).toBe(200);
//             expect(getComedianLastName.body).toHaveLength(1);
//             expect(getComedianLastName.body[0].name).toBe("Dave Chappelle");
//         });

//         it("should retrieve comedians by tag", async () => {
//             let getComediansByTag = await request(app).get("/comedians/search?search-term=story-telling");
//             let comedians = getComediansByTag.body.map(x => x.name);

//             expect(getComediansByTag.statusCode).toBe(200);
//             expect(comedians).toHaveLength(5);
//             expect(comedians).toEqual(["Mike Birbiglia", "Kevin Hart", "Marc Maron", "Patton Oswalt", "Colin Quinn"]);
//         });

//         it("should retrieve comedians by special title", async () => {
//             let getComediansByTag = await request(app).get("/comedians/search?search-term=king-baby");

//             expect(getComediansByTag.statusCode).toBe(200);
//             expect(getComediansByTag).toHaveLength(1);
//             expect(getComediansByTag.body[0].name).toBe("Jim Gaffigan");
//         });

//         it("should return an empty array if no matching comedians were found", async () => {
//             let nonMatchingSearchRequest = request(app).get("/comedians/search/search-term=eiufbsrsef");

//             expect(nonMatchingSearchRequest.statusCode).toBe(404);
//             expect(nonMatchingSearchRequest).toBe("No search results found");
//         });

//         it("should return a 404 error if no search term is inputted", async () => {
//             let emptySearchRequest = request(app).get("/comedians/search?search-term=");

//             expect(emptySearchRequest.statusCode).toBe(404);
//             expect(emptySearchRequest).toBe("No search term entered");
//         });
//     });

//     describe("POST /login", () => {
//         it("should issue a refresh JWT and an access JWT in response to valid user credentials and redirect to the homepage", async () => {
//             let userLogin = await request(app).post("/login", {
//                 username: userOne.username,
//                 password: userOne.password
//             });

//             expect(userLogin.statusCode).toBe(200);
//             expect(userLogin.headers["Set-Cookie"]).toBe(`refreshJwtToken=${userOneRefreshToken}`);
//             expect(userLogin.body.accessToken).toBe(userOneAccessToken);
//             expect(mockHistoryPush).toHaveBeenCalledWith("/");
//         });

//         it("should return a 404 error if the submitted username doesn't exist", async () => {
//             let wrongUserLogin = await request(app).post("/login", {
//                 username: "nonexistentUsername",
//                 password: "madeUpPassword"
//             });

//             expect(wrongUserLogin.statusCode).toBe(404);
//             expect(wrongUserLogin.statusMessage).toBe("Username not found");
//             expect(mockHistoryPush).not.toHaveBeenCalled();
//         });

//         it("should return a 401 error if the submitted username doesn't match the recorded password", async () => {
//             let wrongUserLogin = await request(app).post("/login", {
//                 username: userOne.username,
//                 password: "madeUpPassword"
//             });

//             expect(wrongUserLogin.statusCode).toBe(401);
//             expect(wrongUserLogin.statusMessage).toBe("Incorrect Password");
//             expect(mockHistoryPush).not.toHaveBeenCalled();
//         });
//     });

//     describe("GET /newAccessToken", () => {
//         it("should return a new access token in response to a valid refresh token", async () => {
//             let newTokenRequest = await request(app).get("/newAccessToken")
//             .set("cookie", `refreshJwtToken=${userOneRefreshToken}`);

//             expect(newTokenRequest.statusCode).toBe(200);
//             expect(newTokenRequest.accessToken).toBe(userOneAccessToken);
//         });

//         it("should return a 401 error in response to an invalid refresh token", async () => {
//             let expiredRefreshToken = jwt.sign({userId: userOne._id}, process.env.REFRESH_JWT_SECRET, {expiresIn: "0s"});
//             let newTokenRequest = await request(app).post("/newAccessToken")
//             .set("cookie", `refreshJwtToken=${expiredRefreshToken}`);

//             expect(newTokenRequest.statusCode).toBe(403);
//             expect(wrongUserLogin.statusMessage).toBe("Refresh JWT Invalid");
//         });
//     });

//     describe("GET /logout", () => {
//         it("should destroy refresh token cookie", async () => {
//             let userLogout = await request(app).get("/logout")
//             .set("cookie", `refreshJwtToken=${userOneRefreshToken}`);

//             expect(userLogout.statusCode).toBe(200);
//             expect(userLogout.headers["Set-Cookie"]).toBe(`refreshJwtToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`);
//             expect(mockHistoryPush).toHaveBeenCalledWith("/");
//         });

//         it("should return an error if trying to logout of an account which no longer exists", async () => {
//             let nonExistentUserRefreshToken = jwt.sign({userId: "nonExistentUserId"}, process.env.REFRESH_JWT_SECRET);
//             let userLogout = await request(app).get("/logout")
//             .set("cookie", `refreshJwtToken=${nonExistentUserRefreshToken}`);

//             expect(userLogout.statusCode).toBe(404);
//         });
//     });

//     describe("POST /signup", () => {
//         it("should return a 403 error is the submitted username is not unique", async () => {
// //Try to create new user with an existing username
//             let newUser = {
//                 _id: "newUserId",
//                 username: userOne.username,
//                 password: "newUserPassword"
//             };

//             let newUserSignup = await request(app).post("/signup", newUser);

//             expect(newUserSignup.statusCode).toBe(403);
//             expect(newUserSignup.statusMessage).toBe("Username Already Exists");
//         });

//         it("should add a new user to the database if the username is unique and be able to log in as that user", async () => {
// //Try to create new user with a unique username.
//             let newUser = {
//                 _id: "newUserId",
//                 username: "newUser",
//                 password: "newUserPassword"
//             };

//             let newUserSignup = await request(app).post("/signup", newUser);

//             expect(newUserSignup.statusCode).toBe(201);
// //Try to log in as new user.
//             let newUserLogin = await request(app).post("/login", {
//                 username: "newUser",
//                 password: "newUserPassword"
//             });

//             let newUserRefreshToken = jwt.sign({userId: newUser._id}, process.env.REFRESH_JWT_SECRET);

//             expect(newUserLogin.statusCode).toBe(200);
//             expect(userLogin.headers["Set-Cookie"]).toBe(`refreshJwtToken=${newUserRefreshToken}`);
//         });
//     });

//     describe("PATCH /comedians/:comedianId/favoritesReceived", () => {
//         it("should add a new userId to a comedian's 'favoritesRecieved' array in the database", async () => {
//             let userSix = seed.users[5];
//             let userSixAccessToken = jwt.sign({userId: userSix._id}, process.env.ACCESS_JWT_SECRET)

//             let getComedian = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(getComedian.statusCode).toBe(200);
//             expect(getComedian.body.metrics.favoritesReceived).toEqual(expect.not.arrayContaining([seed.users[5]._id]));

//             let addFavorite = await request(app).patch(`/comedians/${comedianOne._id}`)
//             .auth(userSixAccessToken, {type: bearer});

//             expect(addFavorite.statusCode).toBe(201);

//             let getUpdatedComedian = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(getUpdatedComedian.statusCode).toBe(200);
//             expect(getUpdatedComedian.body.metrics.favoritesReceived).toEqual(expect.arrayContaining([seed.users[5]._id]));
//         });

//         it("should remove an existing userId from a comedian's 'favoritesRecieved' array in the database", async () => {
//             let userThree = seed.users[2];
//             let userThreeAccessToken = jwt.sign({userId: userThree._id}, process.env.ACCESS_JWT_SECRET)

//             let getComedian = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(getComedian.statusCode).toBe(200);
//             expect(getComedian.body.metrics.favoritesReceived).toEqual(expect.arrayContaining([seed.users[2]._id]));

//             let addFavorite = await request(app).patch(`/comedians/${comedianOne._id}`)
//             .auth(userThreeAccessToken, {type: bearer});

//             expect(addFavorite.statusCode).toBe(201);

//             let getUpdatedComedian = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(getUpdatedComedian.statusCode).toBe(200);
//             expect(getUpdatedComedian.body.metrics.favoritesReceived).toEqual(expect.not.arrayContaining([seed.users[2]._id]));
//         });
//     });

//     describe("PATCH /user/password", () => {
//         it("should return a 403 error if the 'current password' field is incorrect", async () => {
// //check that logging in with current username is successful.
//             let userLogin = await request(app).post("/login", {
//                 username: userOne.username,
//                 password: userOne.password
//             });

//             expect(userLogin.statusCode).toBe(200);
// //try to change password using an incorrect currentPassword field.
//             let changePassword = await request(app).patch("/user/password", {
//                 currentPassword: "incorrectPassword",
//                 newPassword: "newUserOnePassword"
//             }).auth(userOneAccessToken, {type: bearer});

//             expect(changePassword.statusCode).toBe(403);
//             expect(changePassword.statusMessage).toBe("Incorrect Password");
// //check that the original password is still accepted
//             let newUserLogin = await request(app).post("/login", {
//                 username: userOne.username,
//                 password: userOne.password
//             });

//             expect(newUserLogin.statusCode).toBe(200);
//         });

//         it("should update the user's password if the new password is different", async () => {
// //check that logging in with current username is successful.
//             let userLogin = await request(app).post("/login", {
//                 username: userOne.username,
//                 password: userOne.password
//             });

//             expect(userLogin.statusCode).toBe(200);
// //try to change password to a different password.
//             let changePassword = await request(app).patch("/user/password", {
//                 currentPassword: userOne.password,
//                 newPassword: "newUserOnePassword"
//             }).auth(userOneAccessToken, {type: bearer});

//             expect(changePassword.statusCode).toBe(201);
//             expect(changePassword.statusMessage).toBe("Password Successfully Changed");
// //trying to log in with the old password
//             let oldUserLogin = await request(app).post("/login", {
//                 username: userOne.username,
//                 password: userOne.password
//             });
// //checking that you cannot log in to the account using the old password
//             expect(oldUserLogin.statusCode).toBe(403);
//             expect(oldUserLogin.statusMessage).toBe("Incorrect Password");
// //trying to log in with the new password
//             let newUserLogin = await request(app).post("/login", {
//                 username: "userOne",
//                 password: "newUserOnePassword"
//             });
// //checking that logging in with the new password was successful
//             expect(newUserLogin.statusCode).toBe(200);
//             expect(newUserLogin.headers["Set-Cookie"]).toBe(`refreshJwtToken=${userOneRefreshToken}`);
//         });
//     });

//     describe("PATCH /user/favorited", () => {
//         it("should add a comedian to a user's favorites", async () => {
//             let oldFavorites = await request(app).get("/user/favorites")
//             .auth(userOneAccessToken, {type: bearer});
//             let oldComedians = oldFavorites.body.map(x => x.name);

//             expect(oldComedians).toEqual(["Bill Burr", "Jim Gaffigan", "Katherine Ryan", "Patton Oswalt", "Sarah Silverman", "Tig Notaro"]);

//             let addComedian = await request(app).patch(`/user/favorites`, "Deon Cole")
//             .auth(userOneAccessToken, {type: bearer});

//             expect(addComedian.statusCode).toBe(201);

//             let newFavoritesAdded = await request(app).get("/user/favorites")
//             .auth(userOneAccessToken, {type: bearer});
//             let newComediansAdded = newFavoritesAdded.body.map(x => x.name);

//             expect(newComediansAdded).toEqual(["Deon Cole", "Bill Burr", "Jim Gaffigan", "Katherine Ryan", "Patton Oswalt", "Sarah Silverman", "Tig Notaro"]);
//         });

//         it("should remove a comedian from a user's favorites", async () => {
//             let oldFavorites = await request(app).get("/user/favorites")
//             .auth(userOneAccessToken, {type: bearer});
//             let oldComedians = oldFavorites.body.map(x => x.name);

//             expect(oldComedians).toEqual(["Deon Cole", "Bill Burr", "Jim Gaffigan", "Katherine Ryan", "Patton Oswalt", "Sarah Silverman", "Tig Notaro"]);

//             let removeComedian = await request(app).patch("/user/favorites", "Patton Oswalt")
//             .auth(userOneAccessToken, {type: bearer});

//             expect(removeComedian.statusCode).toBe(201);

//             let newFavoritesSubtracted = await request(app).get("/user/favorites")
//             .auth(userOneAccessToken, {type: bearer});
//             let newComediansSubtracted = newFavoritesSubtracted.body.map(x => x.name);

//             expect(newComediansSubtracted).toEqual(["Deon Cole", "Bill Burr", "Jim Gaffigan", "Katherine Ryan", "Sarah Silverman", "Tig Notaro"]);
//         });
//     });

//     describe("PATCH /user/recentlyViewed", () => {
//         it("should add a new comedian to the user's recently viewed comedians", async () => {
//             let oldViewed = await request(app).get("/user/recentlyViewed")
//             .auth(userOneAccessToken, {type: bearer});
//             let oldComedians = oldViewed.body.map(x => x.name);

//             expect(oldComedians).toEqual(["John Mulaney", "Dave Chappelle", "Marc Maron", "Ron White"]);

//             let addRecentlyViewed = await request(app).patch(`/user/recentlyViewed`, "Sebastian Maniscalco")
//             .auth(userOneAccessToken, {type: bearer});

//             expect(addRecentlyViewed.statusCode).toBe(201);

//             let newViewedAddedComedian = await request(app).get("/user/recentlyViewed")
//             .auth(userOneAccessToken, {type: bearer});
//             let newComediansAdded = newViewedAddedComedian.body.map(x => x.name);

//             expect(newComediansAdded).toEqual(["Sebastian Maniscalco", "John Mulaney", "Dave Chappelle", "Marc Maron"]);
//         });

//         it("should move an already viewed comedian to the top of the list when viewed again", async () => {
//             let oldViewed = await request(app).get("/user/recentlyViewed")
//             .auth(userOneAccessToken, {type: bearer});
//             let oldComedians = oldViewed.body.map(x => x.name);

//             expect(oldComedians).toEqual(["Sebastian Maniscalco", "John Mulaney", "Dave Chappelle", "Marc Maron"]);

//             let moveRecentlyViewed = await request(app).patch(`/user/recentlyViewed`, "Dave Chappelle")
//             .auth(userOneAccessToken, {type: bearer});

//             expect(moveRecentlyViewed.statusCode).toBe(201);

//             let newViewedSameComedian = await request(app).get("/users/recentlyViewed")
//             .auth(userOneAccessToken, {type: bearer});
//             let newComediansSame = newViewedSameComedian.body.map(x => x.name);

//             expect(newComediansSame).toEqual([ "Dave Chappelle", "Sebastian Maniscalco", "John Mulaney", "Marc Maron"]);
//         });
//     });

//     describe("PATCH /comedians/:comedianId/special-ratings", () => {
//         it("should add a new user special rating", async () => {
// //Check the initial special ratings
//             let userRatings = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(userRatings.statusCode).toBe(200);
//             expect(userRatings.body.specials[0].specialRatings).not.toEqual(expect.arrayContaining([{
//                 _id: userOne._id,
//                 rating: 3
//             }]));

//             let addUserRating = await request(app).patch(`/comedians/${comedianOne._id}/${comedianOne.specials[0]}/special-ratings`, {
//                 _id: userOne._id,
//                 rating: 3
//             }).auth(userOneAccessToken, {type: bearer});

//             expect(addUserRating.statusCode).toBe(201);

//             let newUserRatings = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(newUserRatings.statusCode).toBe(200);
//             expect(newUserRatings.body.specials[0].specialRatings).toEqual(expect.arrayContaining([{
//                 _id: userOne._id,
//                 rating: 3
//             }]));
//         });

//         it("should update an existing user special rating", async () => {
//             let userTwo = seed.users[1];
//             let userTwoAccessToken = jwt.sign({userId: userTwo._id}, process.env.ACCESS_JWT_SECRET);
// //Check the initial special ratings
//             let userRatings = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(userRatings.statusCode).toBe(200);
//             expect(userRatings.body.specials[0].specialRatings).toEqual(expect.arrayContaining([{
//                 _id: userTwo._id,
//                 rating: 3
//             }]));

//             let updateUserRating = await request(app).patch(`/comedians/${comedianOne._id}/${comedianOne.specials[0]}/special-ratings`, {
//                 _id: userTwo._id,
//                 rating: 4
//             }).auth(userTwoAccessToken, {type: bearer});

//             expect(updateUserRating.statusCode).toBe(201);

//             let updatedUserRatings = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(updatedUserRatings.statusCode).toBe(200);
//             expect(updatedUserRatings.body.specials[0].specialRatings).not.toEqual(expect.arrayContaining([{
//                 _id: userTwo._id,
//                 rating: 3
//             }]));
//             expect(updatedUserRatings.body.specials[0].specialRatings).toEqual(expect.arrayContaining([{
//                 _id: userTwo._id,
//                 rating: 4
//             }]));
//         });
//     });

//     describe("PATCH /comedians/:comedianId/viewCount", () => {
//         it("should increment the comedian's view count in the database", async () => {
//             let viewCount = await request(app).get("/comedians/bill-burr");
//             expect(viewCount.body.metrics.views).toBe(10);
            
//             let addViewCount = await request(app).patch("/comedians/bill-burr/viewCount");
//             expect(addViewCount.statusCode).toBe(201);

//             let newViewCount = await request(app).get("/comedians/bill-burr");
//             expect(newViewCount.body.metrics.views).toBe(11);
//         });
//     });

//     describe("PATCH /comedians/:comedianId/comments", () => {
//         it("should add a comment to a comedian's information in the database", async () => {
//             let oldComments = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(oldComments.body.comments).toHaveLength(1);

//             let addComment = await request(app).patch(`/comedians/${comedianOne._id}/comments`, {
//                 author: userOne.username,
//                 date: "November 20, 2020",
//                 content: "We went to a show last Tuesday in Indiana. Very funny!"
//             }).auth(userOneAccessToken, {type: bearer});

//             expect(addComment.statusCode).toBe(201);

//             let newComments = await request(app).get(`/comedians/${comedianOne._id}`);

//             expect(newComments.body.comments).toHaveLength(2);
//             expect(newComments.body.comments[1]).toEqual({
//                 author: userOne.username,
//                 date: "November 20, 2020",
//                 content: "We went to a show last Tuesday in Indiana. Very funny!"
//             });
//         });
//     });

//     describe("PATCH /comedians/:comedianId/comments/:commentId/commentLikes", () => {
//         it("should increment a comment's likes from a new user liking the comment", async () => {
//             let userFour = seed.users[3];
//             let oldLikes = await request(app).get(`/comedians/${comedianOne._id}`);
//             expect(oldLikes.body.comments[0].commentLikes).toHaveLength(3);

//             let addLike = await request(app).patch(`/comedians/${comedianOne._id}/comments/${comedianOne.comments[0]._id}/commentLikes`, {
//                 _id: userFour._id
//             }).auth(userOneAccessToken, {type: bearer});

//             expect(addLike.statusCode).toBe(201);

//             let newLikes = await request(app).get("/comedians/bill-burr");
//             expect(newLikes.body.comments[0].commentLikes).toHaveLength(4);
//         });
        
//         it("should decrement a comment's likes from a user unliking a comment", async () => {
//             let oldLikes = await request(app).get(`/comedians/${comedianOne._id}`);
//             expect(oldLikes.body.comments[0].commentLikes).toHaveLength(4);

//             let subtractLike = await request(app).patch(`/comedians/${comedianOne._id}/comments/${comedianOne.comments[0]._id}/commentLikes`, {
//                 _id: userOne._id
//             }).auth(userOneAccessToken, {type: bearer});

//             expect(subtractLike.statusCode).toBe(201);

//             let newLikes = await request(app).get("/comedians/bill-burr");
//             expect(newLikes.body.comments[0].commentLikes).toHaveLength(3);
//         });
//     });

//     describe("DELETE /user", () => {
//         it("should remove a user from the database", async() => {
//             let goodUserLogin = await request(app).post("/login", {
//                 username: userOne.username,
//                 password: userOne.password
//             });

//             expect(goodUserLogin.statusCode).toBe(200);

//             let deleteUser = await request(app).delete(`/user`)
//             .auth(userOneAccessToken, {type: bearer});

//             expect(deleteUser.statusCode).toBe(200);
            
//             let badUserLogin = await request(app).post("/login", {
//                 username: userOne.username,
//                 password: userOne.password
//             });

//             expect(badUserLogin.statusCode).toBe(404);
//             expect(badUserLogin.statusMessage).toBe("User Not Found");
//         });
//     });
});

describe("Authorization Middleware", () => {

    // const reqStub = {
    //     cookies:{
    //         authToken: null
    //     },
    //     params:{
    //         userId: userOne._id
    //     },
    //     body:{

    //     }
    // };

    // const mockResponse = () => {
    //     const res = {};

    //     res.status = (statusCode) => {
    //         res.statusCode = statusCode;
    //         return res;
    //     };

    //     res.send = () => {
    //         return res;
    //     };
        
    //     return res;
    // };

    // let resStub = mockResponse();

    // let mockNext = jest.fn();

    // beforeEach(() => {
    //     resStub.statusCode = null;

    //     mockNext.mockClear();
    // });

    // it("should verify a valid JWT", async () => {
    //     reqStub.cookies.authToken = userOneJWTToken;

    //     await authenticate(reqStub, resStub, mockNext);

    //     expect(reqStub.body.userId).toBeTruthy();
    //     expect(mockNext).toHaveBeenCalled();
    // });

    // it("should return a 401 error if the JWT signature is invalid", async () => {
    //     reqStub.cookies.authToken = jwt.sign({userId: userOne._id}, "incorrectJWTSecretString");

    //     await authenticate(reqStub, resStub, mockNext);

    //     expect(resStub.statusCode).toBe(401);
    //     expect(mockNext).not.toHaveBeenCalled();
    // });
});