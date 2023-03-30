import dbConnect from "../../config/dbConnect";
import sendEmail from "../../utils/sendEmail";
import User from "../../models/user";
import absoluteUrl from "next-absolute-url";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    // console.log(req.body);

    try {
        dbConnect();
        if (req.method === "POST") {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: "user not found" });
            }

            const numberOfMinutes = 10;
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: Math.floor(numberOfMinutes * 60),
            });

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
                message: `Email sent to ${user.email}, please check your email`,
            });
        }
    } catch (error) {
        console.log(error);
    }
}
