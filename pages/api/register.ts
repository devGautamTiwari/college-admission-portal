import { NextApiRequest, NextApiResponse } from "next";
import absoluteUrl from "next-absolute-url";
import axios, { AxiosError } from "axios";
import Faculty from "../../models/faculty";
import Student from "../../models/student";
import dbConnect from "../../config/dbConnect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        await dbConnect();
        try {
            const formData = req.body;
            let user;
            if (formData.userRole === "faculty") {
                user = await Faculty.create(formData);
            } else if (formData.userRole === "student") {
                const { applicationNumber, ...studentData } = formData;
                user = await Student.create({
                    ...studentData,
                    password: applicationNumber,
                });
            }
            const { origin } = absoluteUrl(req);
            await axios.post(origin + "/api/verify-email", {
                email: formData.email,
                userRole: formData.userRole,
            });
            return res.status(201).json({ user });
        } catch (err) {
            const error = err as AxiosError;
            console.log(error?.response?.data || error?.message);
            return res.status(400).json({ message: error });
        }
    }
}
