import jwt from "jsonwebtoken";
import dbConnect from "../../../config/dbConnect";
import Student from "../../../models/student";
import Faculty from "../../../models/faculty";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "PUT") {
            dbConnect();
            const token = req.query.token || "";

            const { password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ message: "Passwords do not match" });
            }
            if (password.length < 6) {
                return res.status(400).json({
                    error: "Password needs to be at least 6 characters",
                });
            }

            if (!token) {
                return res.status(400).json({ message: "No token found!" });
            }

            const decoded = jwt.verify(
                token as string,
                process.env.JWT_SECRET as string
            ) as jwt.JwtPayload & { userRole: string; _id: any };

            let user;

            if (decoded.userRole === "faculty") {
                user = await Faculty.findById(decoded._id);
            } else if (decoded.userRole === "student") {
                user = await Student.findById(decoded._id);
            }

            if (user) {
                user.password = password;
                await user.save();

                return res
                    .status(200)
                    .json({ message: "User password updated successfully!" });
            } else {
                // console.log("user not found");
                return res.status(400).send({ message: "User not found!" });
            }
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log("create-new-password", error);
        return res.status(400).send({ message: "Invalid or expired link!" });
    }
}
