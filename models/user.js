const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {Schema, model} = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "No username provided"],
        unique: true,
        trim: true,
        maxlength: [15, "Username too long"]
    },
    password:{
        type: String,
        required: [true, "No password provided"],
        minlength: [8, "Password too short"]
    },
    favorited:{
        type: [mongoose.Types.ObjectId],
        required: true
    },
    recentlyViewed:{
        type: [mongoose.Types.ObjectId],
        required: true
    },
    refreshToken:{
        type: String
    }
});

userSchema.method("generateAuthToken", async function(){
    let user = this;

    let authToken = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "365d"});
    return authToken;
});

userSchema.static("findByCredentials", async function(username, password){
    let foundUser = await User.findOne({username}).exec();

    if(!foundUser){
        throw new Error("Username Not Found");
    };

    return new Promise((resolve, reject) => bcrypt.compare(password, foundUser.password, (err, res) => {
        if(err){
            reject(err);
        }else if(!res){
            reject(new Error("Incorrect Password"));
        }else{
            resolve(foundUser);
        };
    }));
});

userSchema.pre("save", function(next) {
    let user = this;

    if(user.isModified("password")){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else{
        next();
    }
});

const User = model("User", userSchema);

module.exports = {
    User
};