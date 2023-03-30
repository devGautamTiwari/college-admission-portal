import jwt from "jsonwebtoken";
import dbConnect from "../../../config/dbConnect";
import User from "../../../models/user";
export default async function handler(req, res) {
    try {
        if (req.method === "PUT") {
            dbConnect();
            const { token } = req.query;

            const { password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ error: "Passwords do not match" });
            }
            if (password.length < 6) {
                return res.status(400).json({
                    error: "Password needs to be at least 6 characters",
                });
            }

            if (!token) {
                return res.status(400).json({ error: "No token" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log(decoded);
            const user = await User.findById(req.user._id);

            if (user) {
                user.password = password;
                await user.save();

                return res
                    .status(200)
                    .json({ message: "success in updating user password" });
            } else {
                // console.log("user not found");
                return res.status(400).send({ message: "user not found" });
            }
        }
    } catch (error) {
        // console.log("create-new-password", error);
        return res.status(400).send({ message: "invalid link" });
    }
}
