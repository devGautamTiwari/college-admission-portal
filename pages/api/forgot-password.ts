import dbConnect from "../../config/dbConnect";
import sendEmail from "../../lib/sendEmail";
import Student from "../../models/student";
import Faculty from "../../models/faculty";
import absoluteUrl from "next-absolute-url";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // console.log(req.body);

    try {
        dbConnect();
        if (req.method === "POST") {
            const { email, userRole } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email is required!" });
            }

            let user;
            if (userRole === "faculty") {
                user = await Faculty.findOne({ email });
            } else if (userRole === "student") {
                user = await Student.findOne({ email });
            }

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            const numberOfMinutes = 10;
            const token = jwt.sign(
                { _id: user._id, userRole },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: Math.floor(numberOfMinutes * 60),
                }
            );

            const { origin } = absoluteUrl(req);

            const link = `${origin}/create-new-password/${token}`;

            const message = `<div>Click on the link below to reset your password, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`;

            await sendEmail({
                to: user.email,
                subject: "Password Reset Link",
                message: message,
            });

            return res.status(200).json({
                message: `Email sent to ${user.email}, please check your email.`,
            });
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log(error?.response?.data || error?.message);
    }
}
