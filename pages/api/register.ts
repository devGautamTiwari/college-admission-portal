import User from "../../models/user";
import dbConnect from "../../config/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        dbConnect();

        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password });

        res.status(201).json({ user });
    }
}
