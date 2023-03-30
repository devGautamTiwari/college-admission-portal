import jwt from "jsonwebtoken";
import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default async function handler(req, res) {
    try {
        if (req.method === "PUT") {
            dbConnect();
            const { token } = req.query;

            // console.log("verifying email using", token);
            if (!token) {
                return res.status(200).json({ message: "no Token" });
            }
            // const decoded = jwt.decode(token);
            // console.log("decoded", decoded.exp);
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            // req.user = decoded;
            // console.log("decoded", decoded);
            // if (decoded.exp < Date.now() / 1000) {
            //     return res.status(404).json({ error: "invalid token" });
            // }

            const user = await User.findById(decoded._id);

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
        return res.status(400).send({ message: "invalid link" });
    }
}
