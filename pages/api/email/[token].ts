import jwt from "jsonwebtoken";
import Faculty from "../../../models/faculty";
import Student from "../../../models/student";
import dbConnect from "../../../config/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "PUT") {
            dbConnect();
            const { token } = req.query;

            if (!token) {
                return res.status(200).json({ message: "Token not found" });
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
    } catch (err) {
        const error = err as AxiosError;
        console.log("error", error);
        return res.status(400).send({ message: "Invalid or expired link!" });
    }
}
