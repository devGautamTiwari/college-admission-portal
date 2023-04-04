import mongoose from "mongoose";

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connection.on("error", (error) => {
        console.error("DB Connection Error", error);
    });
    mongoose.connection.on("connected", () => {
        console.log("DB Connected");
    });
    console.log(process.env.DB_URI);
    return mongoose.connect(process.env.DB_URI);
};

export default dbConnect;
