import jwt from "jsonwebtoken";
import User from "../../models/user";
import sendEmail from "../../utils/sendEmail";
import dbConnect from "../../config/dbConnect";
import absoluteUrl from "next-absolute-url";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            dbConnect();
            const { email } = req.body;

            const user = await User.findOne({ email });

            // const token = jwt.sign(
            //     { _id: user._id },
            //     process.env.JWT_SECRET,
            //     {
            //         expiresIn: Date.now() + 10 * 60,
            //     }
            // );
            const numberOfMinutes = 10;
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: Math.floor(numberOfMinutes * 60),
            });

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
                subject: "Verify your Email",
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
