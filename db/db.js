const mongoose = require("mongoose");

let db;

const initDb = async () => {
    if(db){
        console.log("Database already initialized");
        return;
    };
    
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try{
        await mongoose.connect(process.env.MONGODB_URI, mongooseOpts);
        db = mongoose.connection;
        db.on("error", err => {
            console.log(err);
        });
    
        db.once("open", () => {
            console.log(`MongoDB successfully connected to database: ${mongoDbURI}`);
        });
    }catch(err){
        console.log(err);
    };
};

const getDb = () => {
    if(!db){
        throw Error("Database not initialized")
    }
    return db;
};

const killDb = () => {
    db.close();
};

module.exports = {
    initDb,
    getDb,
    killDb
};