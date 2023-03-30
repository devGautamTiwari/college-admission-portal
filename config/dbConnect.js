import mongoose from "mongoose";

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connect(process.env.DB_URI);
    mongoose.connection.on("error", (err) => {
        console.error("DB Connection Error", err);
    });
    mongoose.connection.on("connected", () => {
        console.log("DB Connected");
    });
};

export default dbConnect;
