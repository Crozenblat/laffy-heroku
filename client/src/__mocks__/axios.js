const seed = require("../backend/seed");

export default {
    get: jest.fn().mockImplementation(url => {
        switch(url){
            case `/comedians/${seed.comedians[0]._id}`:
                return new Promise(resolve => {
                    let comedian = {
                        ...seed.comedians[0]
                    };
                    
                    let similarComedians = [];

                    comedian.metrics.favoritesReceived.forEach(user => {
                        let locatedUser = seed.users.find(x => x._id.toHexString() === user._id.toHexString());

                        locatedUser.favorited.forEach(favoritedComedianId => {
                            if(favoritedComedianId.toHexString() === comedian._id.toHexString()){
                                return;
                            };

                            let foundComedian = similarComedians.find(x => x._id.toHexString() === favoritedComedianId.toHexString());

                            if(foundComedian){
                                foundComedian.weight++;
                            }else{
                                let {_id, name, accountImage, tags} = seed.comedians.find(x => x._id.toHexString() === favoritedComedianId.toHexString());

                                similarComedians.push({
                                    _id,
                                    name,
                                    accountImage,
                                    tags,
                                    weight: 1
                                });
                            };
                        });
                    });
                     comedian.similarComedians = similarComedians.sort((a, b) => b.weight - a.weight).splice(0, 4);

                    resolve(comedian);
                });
            break;
            case "/comedians/top-comedians":
                return new Promise(resolve => {
                    let formattedTopComedians = seed.comedians.slice(0, seed.comedians.length).sort((a, b) => {
                        b.metrics.favoritesReceived.length - a.metrics.favoritesReceived.length
                    })
                    .splice(0, 5)
                    .map(({_id, name, accountImage, tags}) => {
                        return {
                            _id,
                            name,
                            accountImage,
                            tags
                        }
                    });

                    resolve(formattedTopComedians);
                });
            break;
            case "comedians/trending":
                return new Promise(resolve => {
                    let orderedTrending = seed.comedians.slice(0, seed.comedians.length)
                    .sort((a, b) => {
                        b.metrics.views - a.metrics.views
                    })
                    .splice(0, 10)
                    .map(({_id, name, accountImage, tags}) => {
                        return {
                            _id,
                            name,
                            accountImage,
                            tags
                        }
                    });

                    resolve(orderedTrending);
                });
            break;
            case `users/${seed.users[16]._id}/recommended`:
                return new Promise(resolve => {
                    let userSeventeenFavorited = seed.users[16].favorited;

                    let commonUsers = seed.users.filter(x => x.favorited.some(item => userSeventeenFavorited.includes(item)));

                    let weightedRecommendations = commonUsers.map(user => {
                        let weight = 0;
                        let recommendations = [];

                        user.favorited.forEach(comedian => {
                            if(userSeventeenFavorited.includes(comedian)){
                                weight++;
                            }else{
                                recommendations.push(comedian);
                            }
                        });

                        return recommendations.map(comedian => {
                            return {
                                comedian,
                                weight
                            };
                        });
                    });

                    let condensedRecommendations = weightedRecommendations.flat()
                    .reduce((accumulator, currentValue) => {
                        let existing = accumulator.find(item => item.comedian === currentValue.comedian);
                        if(existing){
                            existing.weight += currentValue.weight;
                        }else{
                            accumulator.push(currentValue);
                        }
                        return accumulator;
                    }, [])
                    .sort((a, b) => {
                        b.weight - a.weight;
                    })
                    .slice(0, 5);

                    resolve(condensedRecommendations);
                });
            break;
            case `/users/${seed.users[22]._id}/favorited`:
                return new Promise(resolve => {
                    let formattedFavorited = seed.users[22].favorited.map(({_id, name, accountImage, tags}) => {
                        return {
                            _id,
                            name,
                            accountImage,
                            tags
                        };
                    });

                    resolve(formattedFavorited);
                });
            break;
            case `/users/${seed.users[0]._id}/recently-viewed`:
                return new Promise(resolve => {
                    let formattedRecentlyViewed = seed.user[0].recentlyViewed.map(({_id, name, accountImage, tags}) => {
                        return {
                            _id,
                            name, 
                            accountImage,
                            tags
                        };
                    });

                    resolve(formattedRecentlyViewed);
                });
            break;
            case `/search?search-term=family`:
                return new Promise(resolve => {
                    let filteredComedians = seed.comedians.filter(x => {
                        x.tags.includes("Family");
                    });
    
                    let formattedTaggedComedians = filteredComedians.map(({_id, name, accountImage, tags}) => {
                        return{
                            _id,
                            name,
                            accountImage,
                            tags
                        }
                    });

                    resolve(formattedTaggedComedians);
                });
            break;
            case /https:\/\/app\.ticketmaster\.com\/discovery\/v2\/events\.json\?size=\d+&apikey=.+&classificationName=comedy&geohash=.+/:
                return Promise.resolve(seed.tourDatesGeneral);
            break;
            case /https:\/\/app\.ticketmaster\.com\/discovery\/v2\/events\.json\?size=\d+&apikey=.+&classificationName=comedy&geohash=.+&keyword=.+/:
                return Promise.resolve(seed.tourDatesSingleComedian);
            break;
        }
    }),
    post: jest.fn().mockImplementation((url, info) => {
        switch(url){
            case "/users/login":
                return new Promise((resolve, reject) => {
                    let locatedUser = seed.users.find(x => x.username === info.username);

                    if(!locatedUser){
                        reject({
                            statusCode: 404,
                            statusMessage: "User not found"
                        });
                    }else if(locatedUser.password !== info.password){
                        reject({
                            statusCode: 401,
                            statusMessage: "Incorrect Password"
                        });
                    }else{
                        resolve({
                            statusCode: 200,
                            statusMessage: "OK"
                        })
                    }

                });
            break;
            case "/users/signup":
                return new Promise((resolve, reject) => {
                    let locatedUser = seed.users.find(x => x.username === info.username);

                    if(locatedUser){
                        reject({
                            statusCode: 400,
                            statusMessage: "Username Already Taken"
                        });
                    }else{
                        resolve({
                            statusMessage: 200,
                            statusMessage: "OK"
                        });
                    }
                });
            break;
        };
    }),
    patch: jest.fn().mockImplementation((url, info) => {
        switch(url){
            case `/users/${seed.users[0]._id}/password`:
                return new Promise((resolve, reject) => {
                    let locatedUser = seed.users.find(x => x._id === seed.users[0]._id);

                    if(info.currentPassword !== locatedUser.password){
                        reject({
                            statusCode: 401,
                            statusMessage: "Incorrect Password"
                        });
                    }else{
                        resolve({
                            statusCode: 200,
                            statusMessage: "OK"
                        });
                    };
                });
            break;
        };
    }),
    delete: jest.fn().mockImplementation((url) => {
        switch(url){
            case `/users/${seed.users[0]._id}`:
                return new Promise((resolve, reject) => {
                    let locatedUser = seed.users.find(x => x._id === seed.users[0]._id);

                    if(locatedUser){
                        resolve({
                            statusCode: 200,
                            statusMessage: "Account Deleted"
                        })
                    }else{
                        reject({
                            statusCode: 404,
                            statusMessage: "User not found"
                        });
                    };
                });
            break;
        }
    })
};