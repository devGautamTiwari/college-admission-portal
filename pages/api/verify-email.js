import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import Faculty from "../../models/faculty";
import Student from "../../models/student";
import sendEmail from "../../lib/sendEmail";
import dbConnect from "../../config/dbConnect";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            dbConnect();
            const { email, userRole } = req.body;

            if (!email) {
                return res.status(400).json({
                    message: "Email is required!",
                });
            }
            let user;
            if (userRole === "faculty") {
                user = await Faculty.findOne({ email });
            } else if (userRole === "student") {
                user = await Student.findOne({ email });
            }

            // const token = jwt.sign(
            //     { _id: user._id },
            //     process.env.JWT_SECRET,
            //     {
            //         expiresIn: Date.now() + 10 * 60,
            //     }
            // );
            if (!user) {
                return res.status(404).json({
                    message: "User not found!",
                });
            }
            const numberOfMinutes = 10;
            const token = jwt.sign(
                { _id: user._id, userRole },
                process.env.JWT_SECRET,
                {
                    expiresIn: Math.floor(numberOfMinutes * 60),
                }
            );

            user.emailToken = token;
            await user.save();

            const { origin } = absoluteUrl(req);

            const link = `${origin}/verify-email/${token}`;

            const message = `<div>Click on the link below to verify your email, if the link is not working then please paste into the browser. This link is valid for ${numberOfMinutes} minutes only.</div></br>
    <div>link:${link}</div>`;

            // console.log("message", message)

            // console.log("here")

            await sendEmail({
                to: user.email,
                subject: "SAITM -Verify your email",
                message: message,
            });

            return res.status(200).json({
                message: `Email sent to ${user.email}, please check your email`,
            });
        }
    } catch (error) {
        console.log(error?.response?.data || error?.message);
        return res.status(400).json({
            message: "Something went wrong!",
        });
    }
}
