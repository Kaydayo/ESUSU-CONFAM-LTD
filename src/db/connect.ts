import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";

export const connectDB = () => {
    try {
        mongoose.connect(process.env.DATABASE as string).then(() => {
            console.log("%c 💡 Connected to DB", 'color: #2595FB, background: #222');
        });
    } catch (error) {
        console.log(error);
    }
};

export const connectTestDB = () => {
    try {
        MongoMemoryServer.create().then((mongo) => {
            const uri = mongo.getUri();

            mongoose.connect(uri).then(() => {
                console.log("connected to testDB");
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
