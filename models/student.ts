import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
// import Application from "./application";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
        type: String,
    },

    userRole: { type: String },
    validEmail: { type: Boolean, default: 0 },
    emailToken: { type: String },
    aadhaar: { type: String },
    phone: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String },
    course: { type: String },
    courseType: { type: String },
    metricMarksheet: { type: String },
    interMarksheet: { type: String },
    graduationMarksheet: { type: String },
    applicationId: { type: String },
    paymentStatus: { type: String },
});

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    if (this.password) {
        const salt = Math.floor(Math.random() * 5 + 12);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

// studentSchema.pre("remove", function (next) {
//     Application.remove({ studentId: this._id }).exec();
//     next();
// });
export default mongoose.models.Student ||
    mongoose.model("Student", studentSchema);
