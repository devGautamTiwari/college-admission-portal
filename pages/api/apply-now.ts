import dbConnect from "../../config/dbConnect";
import sendEmail from "../../lib/sendEmail";
import Student from "../../models/student";
import Application from "../../models/application";
import axios, { AxiosError } from "axios";
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
                paymentStatus: "pending",
            });

            const { origin } = absoluteUrl(req);
            const { data } = await axios.post(origin + "/api/register", {
                ...formData,
                applicationId: application._id,
                applicationNumber: application.applicationNumber,
                paymentStatus: "pending",
                userRole: "student",
            });
            const { user: newUser } = data;

            const message = `<div>Your application has been received!<br/>You can use the application number to track your application and sign in to your dashboard.<br/><strong>Application number: ${applicationNumber}</strong></div>`;

            // application.studentId = jwt.sign(
            //     { studentId: newUser._id },
            //     process.env.JWT_SECRET || "BMHmR5NUq6Bpmc9woYQFOed02He5swHp"
            // );
            application.studentId = newUser._id;
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
    } catch (err) {
        const error = err as AxiosError;
        console.log(error?.response?.data || error?.message);
        return res.status(400).json({ message: error });
    }
}
