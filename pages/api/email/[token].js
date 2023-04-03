import jwt from "jsonwebtoken";
import Faculty from "../../../models/faculty";
import Student from "../../../models/student";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
    try {
        if (req.method === "PUT") {
            dbConnect();
            const { token } = req.query;

            if (!token) {
                return res.status(200).json({ message: "Token not found" });
            }

            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            let user;
            if (decoded.userRole === "faculty") {
                user = await Faculty.findById(decoded._id);
            } else if (decoded.userRole === "student") {
                user = await Student.findById(decoded._id);
            }

            if (user && token === user.emailToken) {
                user.validEmail = true;
                user.emailToken = undefined;
                await user.save();

                return res
                    .status(200)
                    .json({ message: "Email verified successfully!" });
            } else {
                return res.status(200).json({
                    message: "Email already verified!",
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        return res.status(400).send({ message: "Invalid or expired link!" });
    }
}
