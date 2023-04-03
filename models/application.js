import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    applicationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    studentId: {
        type: String,
    },
    course: {
        type: String,
    },
    status: {
        type: String,
    },
});

export default mongoose.models.Application ||
    mongoose.model("Application", applicationSchema);
