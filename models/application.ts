import mongoose from "mongoose";

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
    paymentStatus: {
        type: String,
    },
});

export default mongoose.models.Application ||
    mongoose.model("Application", applicationSchema);
