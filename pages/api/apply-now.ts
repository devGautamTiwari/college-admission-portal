import dbConnect from "../../config/dbConnect";
import sendEmail from "../../lib/sendEmail";
import Student from "../../models/student";
import Application from "../../models/application";
import axios from "axios";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import { NextApiRequest, NextApiResponse } from "next/types";
const random = () => Math.floor(1000 + Math.random() * 9000);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();
        if (req.method === "POST") {
            const formData = req.body;

            const user = await Student.findOne({ aadhaar: formData.aadhaar });

            if (user) {
                return res
                    .status(400)
                    .json({ message: "User already exists!" });
            }

            const applicationNumber = `SAITM${formData.aadhaar.slice(
                4,
                8
            )}${random()}`;

            const application = await Application.create({
                name: formData.name,
                applicationNumber,
                status: "pending",
                course: formData.course,
            });

            const { origin } = absoluteUrl(req);
            const { data } = await axios.post(origin + "/api/register", {
                ...formData,
                userRole: "student",
            });
            const { user: newUser } = data;

            const message = `<div>Your application has been received. Use the application no. below to track your application.<br/><strong>Application number: ${applicationNumber}</strong><br/>You can now sign in to the portal using a password. To create a password first, click on forgot password on the Sign in page</div>`;

            application.studentId = jwt.sign(
                { studentId: newUser._id },
                process.env.JWT_SECRET || "BMHmR5NUq6Bpmc9woYQFOed02He5swHp"
            );

            await application.save();

            await sendEmail({
                to: newUser.email,
                subject: "SAITM - Admission application received",
                message: message,
            });

            return res.status(200).json({
                message: `Email sent to ${newUser.email}, please check your email.`,
            });
        }
    } catch (error: any) {
        console.log(error?.response?.data || error?.message);
        return res.status(400).json({ message: error });
    }
}
