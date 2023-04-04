import dbConnect from "../../config/dbConnect";
import Application from "../../models/application";
import Student from "../../models/student";
import { NextApiRequest, NextApiResponse } from "next/types";
import jwt from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();
        if (req.method === "GET") {
            const { applicationNumber } = req.query;
            if (applicationNumber) {
                const application = await Application.findOne({
                    applicationNumber,
                });
                if (application) {
                    const decodedToken = jwt.verify(
                        application.studentId,
                        process.env.JWT_SECRET ||
                            "BMHmR5NUq6Bpmc9woYQFOed02He5swHp"
                    );

                    const user = await Student.findById(
                        decodedToken?.studentId
                    );
                    if (user) {
                        return res.status(200).json({
                            message: `Successfully fetched application`,
                            user,
                        });
                    }
                }
                return res.status(404).json({
                    message: `Application not found!`,
                });
            }
            const applications = await Application.find();

            return res.status(200).json({
                message: `Successfully fetched ${applications.length} applications`,
                applications,
            });
        }
    } catch (error: any) {
        console.log(error?.response?.data || error?.message);
        return res.status(400).json({ message: error });
    }
}
