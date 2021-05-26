require("./config/envConfig");

const express = require("express");
const request = require("request");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

const db = require("./db/db");

const {authenticate} = require("./middleware/authenticate");

const mongoose = require("mongoose");

const {Comedian} = require("./models/comedian");
const {User} = require("./models/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors());

db.initDb();

app.get("/comedians/top-comedians", (req, res) => {
    Comedian.aggregate([
        {$sort: {"metrics.favoritesCount": -1}},
        {$limit: 5},
        {$project: {name: 1, accountImage: 1, tags: 1}}
    ]).exec()
    .then(docs => {
        res.send(docs)
    })
    .catch(err => res.status(400).send(err));
});

app.get("/comedians/trending", (req, res) => {
    Comedian.aggregate([
        {$sort: {"metrics.views": -1}},
        {$limit: 5},
        {$project: {name: 1, accountImage: 1, "metrics.views": 1, "metrics.favoritesCount": 1}}
    ]).exec()
    .then(docs => {
        res.send(docs)
    })
    .catch(err => res.status(400).send(err));
});

app.get("/search", async (req, res) => {
    try{
        if(req.query["search-term"].trim().length === 0){
            throw new Error("No search term entered.");
        };
        let searchTerm = req.query["search-term"].replace(/-/gi, " ").replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let matchingComedians = await Comedian.find({$or: [{name: {$regex: new RegExp(searchTerm), $options: "ig"}}, {tags: {$regex: new RegExp(searchTerm), $options: "ig"}}]});
            
        res.send(matchingComedians);
    }catch(err){
        return res.status(400).send(err.message);
    };
});

app.get("/shows", (req, res) => {
    request(
        {url: decodeURIComponent(req.query.apiUrl)},
        (err, response, body) => {
            console.log(err);
            console.log(response.statusCode);
            if(err || response.statusCode !== 200){
                console.log(err);
                return res.status(500).json({type: "error", message: err});
            };
            res.header('Access-Control-Allow-Origin', '*');
            res.json(JSON.parse(body));
        }
    );
});

app.get("/featured-specials", async (req, res) => {
    try{
        let featuredSpecialComedians = [
            {comedianName: "Demetri Martin", specialTitle: "Demetri Martin: Live (At the Time)"}, 
            {comedianName: "John Mulaney", specialTitle: "Kid Gorgeous at Radio City"}, 
            {comedianName: "Tom Papa", specialTitle: "Human Mule"}
        ];
        let featuredComedianNames = featuredSpecialComedians.map(featuredComedian => featuredComedian.comedianName);
        let featuredSpecials = featuredSpecialComedians.map(featuredComedian => featuredComedian.specialTitle);
    
        let getFeaturedSpecials = await Comedian.find({$and: [{name: {$in: featuredComedianNames}}, {"specials.specialTitle": {$in: featuredSpecials}}]});
    
        let formattedFeaturedSpecials = getFeaturedSpecials.map((fetchedComedian) => {
            let foundComedian = featuredSpecialComedians.find(featuredComedian => featuredComedian.comedianName === fetchedComedian.name);
            console.log(foundComedian);
            let featuredSpecial = fetchedComedian.specials.find(special => special.specialTitle === foundComedian.specialTitle);
            return {
                comedianId: fetchedComedian.id,
                specialCover: featuredSpecial.specialCover,
                specialTitle: featuredSpecial.specialTitle
            };
        });

        res.send(formattedFeaturedSpecials);
    }catch(err){
        res.status(400).send(err);
    };
});

app.get("/comedians/:comedianId", (req, res) => {
    Comedian.aggregate([
        {$match: {_id: mongoose.Types.ObjectId(req.params.comedianId)}},
        {$lookup: {
            from: "users",
            localField: "metrics.favoritesReceived",
            foreignField: "_id",
            as: "usersWhoFavorited"
            }   
        }
    ]).exec()
    .then(document => {
        let [doc] = document;
        let similarComediansIds = [];

        doc.usersWhoFavorited.forEach(user => {
            user.favorited.forEach(favoritedComedianId => {
                if(favoritedComedianId.toHexString() === doc._id.toHexString()){
                    return;
                };

                let foundComedian = similarComediansIds.find(x => x._id.toHexString() === favoritedComedianId.toHexString())

                if(foundComedian){
                    foundComedian.weight++;
                }else{
                    similarComediansIds.push({
                        _id: favoritedComedianId,
                        weight: 1
                    });
                };
            });
        });

        let formattedSimilarComedianIds = similarComediansIds.sort((a,b) => b.weight - a.weight).splice(0, 4);

        let similarComedians = formattedSimilarComedianIds.map(async comedian => {
            let {_id, name, accountImage, tags} = await Comedian.findById(comedian);
            return {
                _id,
                name,
                accountImage,
                tags
            };
        });

        Promise.all(similarComedians).then(value => {
            doc.similarComedians = value;
            delete doc.usersWhoFavorited;
            res.send(doc);
        });
    })
    .catch(err => res.status(400).send(err));
});

app.get("/user/recommended", authenticate, async (req, res) => {
    try{
        requestedUser = await User.findById(req.body.userId);
        commonUsers = await User.find({$and: [{favorited: {$in: requestedUser.favorited}}, {_id: {$ne: requestedUser._id}}]});

        let weightedRecommendations = commonUsers.map(user => {
            let weight = 0;
            let recommendations = [];
    
            user.favorited.forEach(comedian => {
                if(requestedUser.favorited.includes(comedian)){
                    weight++;
                }else{
                    recommendations.push(comedian)
                };
            });
    
            return recommendations.map(comedian => {
                return {
                    comedian,
                    weight
                };
            });
        })
        .flat()
        .reduce((accumulator, currentValue) => {
            let existing = accumulator.find(item => item.comedian.toHexString() === currentValue.comedian.toHexString());
            if(existing){
                existing.weight += currentValue.weight;
            }else{
                accumulator.push(currentValue);
            };
            return accumulator;
        }, [])
        .slice(0, 5);

        let recommendedComedians = await Comedian.find({_id: {$in: weightedRecommendations.map(entry => entry.comedian)}}, {name: 1, accountImage: 1, tags: 1});

        recommendedComedians.forEach(recommendedComedian => {
            let foundWeight = weightedRecommendations.find(weightedComedian => weightedComedian.comedian.toHexString() === recommendedComedian._id.toHexString()).weight;
            recommendedComedian.weight = foundWeight
        });

        recommendedComedians.sort((a, b) => b.weight - a.weight);

        res.send(recommendedComedians);
    }catch(err){
        res.status(400).send(err);
    };
});

app.get("/user/favorited", authenticate, async (req, res) => {
    try{
        let foundUser = await User.findById(req.body.userId);
        let favorited = await Comedian.find({_id: {$in: foundUser.favorited}}, {name: 1, accountImage: 1, tags: 1});
        let orderedFavorited = favorited.sort((a, b) => {
            return foundUser.favorited.indexOf(a._id) - foundUser.favorited.indexOf(b._id);
        });

        res.send(orderedFavorited);
    }catch(err){
        res.status(400).send(err);
    };
});

app.get("/user/recently-viewed", authenticate, async (req, res) => {
    try{
        let foundUser = await User.findById(req.body.userId);
        let recentlyViewed = await Comedian.find({_id: {$in: foundUser.recentlyViewed}}, {name: 1, accountImage: 1, tags: 1});
        let orderedRecentlyViewed = recentlyViewed.sort((a, b) => {
            return foundUser.recentlyViewed.indexOf(a._id) - foundUser.recentlyViewed.indexOf(b._id);
        });

        res.send(orderedRecentlyViewed);
    }catch(err){
        res.status(400).send(err);
    };
});

app.post("/login", async (req, res) => {
    try{
        if(req.cookies.authToken && !req.body.username){
            let authToken = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
            return res.send({userId:authToken.userId , username:authToken.username});
        };

        let fetchedUser = await User.schema.statics.findByCredentials(req.body.username, req.body.password);
        let authToken = await fetchedUser.generateAuthToken();
        res.cookie("authToken", authToken, {path:"/", httpOnly: true, secure: true});
        let body = jwt.verify(authToken, process.env.JWT_SECRET);
        res.send({userId: body.userId, username: body.username});
    } catch(err){
        console.log(err)
        if(err.message === "Username Not Found"){
            res.status(404).send({
                input: "loginUsername",
                message: err.message
            });
        }else if(err.message === "Incorrect Password"){
            res.status(401).send({
                input: "loginPassword",
                message: err.message
            });
        }else{
            res.status(400).send(err.message);
        };
    };
});

app.post("/signup", async (req, res) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        favorited: [],
        recentlyViewed: []
    });

    try{
        await newUser.save();
        res.status(201).send("Account Signup Successful");
    }catch(err){
        console.log(err);
        if(err.code && err.code === 11000){
            res.status(403).send({
                input: "signUpUsername",
                message: "Username Already Exists"
            });
        }else{
            res.status(400).send(err);
        };
    };
});

app.get("/logout", async (req, res) => {
    try{
        res.clearCookie("authToken", {path:"/", httpOnly: true, secure: true});
        return res.status(200).send("Logout Successful");
    }catch(err){
        if(err.message === "User Not Found"){
            res.status(404).send(err);
        } else if(err.message === "Auth JWT Invalid"){
            res.status(403).send(err);
        }else{
            res.status(401).send(err);
        };
        res.send(err)
    };
});

app.patch("/comedians/:comedianId/favoritesReceived", authenticate, async (req, res) => {
    try{
        let fetchedComedian = await Comedian.findById(req.params.comedianId);
        let arrayUserIdIndex = fetchedComedian.metrics.favoritesReceived.findIndex(arrayId => arrayId.equals(req.body.userId));

        if(arrayUserIdIndex > -1){
            fetchedComedian.metrics.favoritesReceived.splice(arrayUserIdIndex, 1);
            fetchedComedian.metrics.favoritesCount--;
        } else{
            fetchedComedian.metrics.favoritesReceived.push(req.body.userId);
            fetchedComedian.metrics.favoritesCount++;
        };
        fetchedComedian.markModified("metrics.favoritesReceived");        
        fetchedComedian.markModified("metrics.favoritesCount");
        await fetchedComedian.save()
        res.status(201).send("Comedian favoritesReceived Patched");
    }catch(err){
        res.status(400).send(err);
    };
});

app.patch("/user/password", authenticate, async (req, res) => {
    try{
        let fetchedUser = await User.schema.statics.findByCredentials(req.body.username, req.body.currentPassword);
        fetchedUser.password = req.body.newPassword;
        await fetchedUser.save();
        res.status(201).send("Password Sucessfully Changed")
    }catch(err){
        if(err.message === "Incorrect Password"){
            res.status(403).send(err.message);
        } else{
            res.status(400).send(err);
        }
    };
});

app.patch("/user/favorited", authenticate, async (req, res) => {
    try{
        let fetchedUser = await User.findById(req.body.userId);
        let arrayUserIdIndex = fetchedUser.favorited.findIndex(arrayId => arrayId.equals(req.body.comedianId));
        if(arrayUserIdIndex > -1){
            fetchedUser.favorited.splice(arrayUserIdIndex, 1);
        } else{
            fetchedUser.favorited.push(req.body.comedianId);
        };
        fetchedUser.markModified("favorited");        
        await fetchedUser.save()
        res.status(201).send("User Favorited Comedians Patched");
    }catch(err){
        res.status(400).send(err);
    };
});

app.patch("/user/recentlyViewed", authenticate, async (req, res) => {
    try{
        let fetchedUser = await User.findById(req.body.userId);
        let arrayUserIdIndex = fetchedUser.recentlyViewed.findIndex(arrayId => arrayId.equals(req.body.comedianId));
        if(arrayUserIdIndex > -1){
            let foundComedianId = fetchedUser.recentlyViewed.splice(arrayUserIdIndex, 1);
            fetchedUser.recentlyViewed.unshift(foundComedianId);
        }else{
            fetchedUser.recentlyViewed.unshift(req.body.comedianId);
            fetchedUser.recentlyViewed.length > 4 ? fetchedUser.recentlyViewed.pop() : null;
        };
        fetchedUser.markModified("recentlyViewed");        
        await fetchedUser.save()
        res.status(201).send("User Recently Viewed Comedians Patched");
    }catch(err){
        res.status(400).send(err);
    };
});

app.patch("/comedians/:comedianId/special-ratings", authenticate, async (req, res) => {
    try{
        let fetchedComedian = await Comedian.findById(req.params.comedianId);
        let ratedSpecial = fetchedComedian.specials[fetchedComedian.specials.findIndex(special => special.specialTitle === req.body.specialTitle)];
        let arrayUserReviewIndex = ratedSpecial.specialRatings.findIndex(review => review.userId.equals(req.body.userId));
        let userReview = {
            userId: req.body.userId,
            rating: req.body.rating
        };
        if(arrayUserReviewIndex > -1){
            ratedSpecial.specialRatings[arrayUserReviewIndex] = userReview;
        } else{
            ratedSpecial.specialRatings.push(userReview);
        };
        fetchedComedian.markModified("specials");        
        await fetchedComedian.save()
        res.status(201).send("Special Ratings Successfully Updated");
    }catch(err){
        console.log("Failure!");
        res.status(400).send(err);
    };
});

app.patch("/comedians/:comedianId/viewCount", async (req, res) => {
    try{
        let fetchedComedian = await Comedian.findById(req.params.comedianId);
        fetchedComedian.metrics.views++;
        fetchedComedian.markModified("metrics");        
        await fetchedComedian.save();
        res.status(201).send("Comedian views successfully updated");
    }catch(err){
        res.status(400).send(err)
    }
});

app.patch("/comedians/:comedianId/comments", async (req, res) => {
    try{
        let fetchedComedian = await Comedian.findById(req.params.comedianId);
        fetchedComedian.comments.push({
            commentAuthor: req.body.commentAuthor,
            commentDate: req.body.commentDate,
            commentContent: req.body.commentContent,
            commentLikes: []
        });
        fetchedComedian.markModified("comments");
        await fetchedComedian.save();
        res.status(201).send("Comedian comments successfully updated");
    }catch(err){
        res.status(400).send(err);
    }
});

app.patch("/comedians/:comedianId/comments/:commentId/commentLikes", authenticate, async (req, res) => {
    try{
        let fetchedComedian = await Comedian.findById(req.params.comedianId);
        let selectedCommentLikes = fetchedComedian.comments[fetchedComedian.comments.findIndex(comment => comment._id.equals(req.params.commentId))].commentLikes;
        let userIdLikedIndex = selectedCommentLikes.findIndex(userId => userId.equals(req.body.userId));
        if(userIdLikedIndex > -1){
            selectedCommentLikes.splice(userIdLikedIndex, 1);
        }else{
            selectedCommentLikes.push(req.body.userId);
        };
        fetchedComedian.markModified("comments");
        await fetchedComedian.save();
        res.status(201).send("Comedian comments successfully updated");
    }catch(err){
        res.status(400).send(err);
    };
});

app.delete("/user", authenticate, async (req, res) => {
    console.log(req.body)
    try{
        await User.deleteOne({_id: req.body.userId});
        res.status(200).send("User Account Successfully Deleted");
    }catch(err){
        res.status(400).send(err);
    };
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
};

if(process.env.NODE_ENV !== "test"){
    app.listen(process.env.PORT, () => {
        console.log(`Started on port ${process.env.PORT}`);
    });
};

module.exports = {
    app
};