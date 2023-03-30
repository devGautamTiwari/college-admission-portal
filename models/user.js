import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
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
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = Math.floor(Math.random() * 5 + 12);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.User || mongoose.model("User", userSchema);
