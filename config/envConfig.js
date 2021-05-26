const envConfig = {
    test:{
        PORT: 3000,
        MONGODB_URI: "mongodb://127.0.0.1:27017/laffyTest",
        JWT_SECRET: Buffer.from("thisisasecretjwtstring").toString("base64")
    },
    development:{
        PORT: 3000,
        MONGODB_URI: "mongodb+srv://crozenblat:9tymrbqn@cluster0.keyb7.mongodb.net/laffy?retryWrites=true&w=majority",
        JWT_SECRET: Buffer.from("eoiseifunseofesinfoseifuns9fsenf0uesf0wbpuenf0sfp9").toString("base64")
    }
};

if(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"){
    let activeEnvConfig = envConfig[process.env.NODE_ENV];

    Object.keys(activeEnvConfig).forEach(key => {
        process.env[key] = activeEnvConfig[key];
    });
};