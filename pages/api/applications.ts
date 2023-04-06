import dbConnect from "../../config/dbConnect";
import Application from "../../models/application";
import Student from "../../models/student";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();
        if (req.method === "GET") {
            const { applicationId } = req.query;

            if (!!applicationId) {
                const application = await Application.findById(applicationId);
                if (application) {
                    const studentId = application.studentId;
                    const userFound = await Student.findById(studentId);
                    if (userFound) {
                        return res.status(200).json({
                            message: `Successfully fetched user details`,
                            user: {
                                ...userFound._doc,
                                status: application.status,
                            },
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
        } else if (req.method === "PUT") {
            const { applicationId, status } = req.body;
            const application = await Application.findById(applicationId);
            if (application) {
                application.status = status;
                await application.save();
                return res
                    .status(200)
                    .json({ message: "Updated successfully!" });
            }

            return res.status(404).json({ message: "Application not found!" });
        }
    } catch (error: any) {
        console.log(error?.response?.data || error?.message);
        return res.status(400).json({ message: error });
    }
}
