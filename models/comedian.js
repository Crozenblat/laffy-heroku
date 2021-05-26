const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const comedianSchema = new Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        required: [true, "No ObjectId provided"]
    },
    name:{
        type: String,
        required: [true, "Comedian name not provided"]
    },
    description:{
        type: String,
        required: [true, "Comedian description not provided"]
    },
    accountImage:{
        type: String,
        required: [true, "Comedian account picture not provided"]
    },
    specials:{
        type: [
            {
                specialTitle:{
                    type: String,
                    required: [true, "Special title not provided"]
                },
                specialCover:{
                    type: String,
                    required: [true, "Special cover not provided"]
                },
                specialDescription:{
                    type: String,
                    required:[true, "Special title not provided"]
                },
                releaseYear:{
                    type: Number,
                    required:[true, "Release year not provided"]
                },
                specialRatings:{
                    type: [
                        {
                            _id: false,
                            userId:{
                                type: mongoose.Types.ObjectId,
                                required:[true, "userId not provided"]
                            },
                            rating:{
                                type: Number,
                                required: [true, "Rating not provided"],
                                min: 1,
                                max: 5
                            }
                        }
                    ],
                    required: [true, "Special ratings array not provided"]
                },
                specialTrailer:{
                    type: Schema.Types.Mixed,
                },
                specialAvailability:{
                    type: [
                        {
                            _id: false,
                            service:{
                                type: String,
                                required: [true, "Streaming service not provided"]
                            },
                            specialPage:{
                                type: String,
                                required: [true, "Special page not provided"]
                            }
                        }
                    ],
                    required: [true, 'Special availability field not provided']
                },
                
            }
        ],
        required: [true, "Specials field not provided"]
    },
    popularVideos:{
        type:[String],
        required:[true, "Popular videos field not provided"],
        maxLength: 4
    },
    comments:{
        type:[
            {
                commentAuthor:{
                    type: String,
                    required:[true, "Comment author not provided"]
                },
                commentDate:{
                    type: String,
                    required:[true, "Comment date not provided"]
                },
                commentContent:{
                    type: String,
                    required:[true, "Comment content not provided"]
                },
                commentLikes:[mongoose.Types.ObjectId]
            }
        ],
        required: [true, "Comment field not provided"]
    },
    metrics:{
        type:{
            favoritesReceived:{
                type:[mongoose.Types.ObjectId],
                index: true,
                required: [true, "FavoritesRecieved field not provided"]
            },
            favoritesCount: {
                type: Number,
                index: true,
                required: [true, "FavoritesCount field not provided"]
            },
            views:{
                type:Number,
                index: true,
                required: [true, "Views field not provided"]
            } 
        },
        required: [true, "Metrics field not provided"]
    },
    tags:{
        type:[String],
        maxLength: 6,
        required: [true, "Tags field not provided"]
    }
});

comedianSchema.path('specials').validate(function (value) {
    let specialTrailers = value.map(entry => {
        return entry.specialTrailer
    });
    return specialTrailers.every(trailer => trailer === null || typeof trailer === "string");
}, 'specialTrailer must be a string or null');

const Comedian = model("Comedian", comedianSchema);

module.exports = {
    Comedian
};