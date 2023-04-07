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
        if (req.method === "POST") {
            const studentSearch = await Student.findOne({ ...req.body });
            const student = studentSearch._doc;
            if (student) {
                const application = await Application.findById(
                    student.applicationId
                );

                student.status = application ? application.status : "";
                student.applicationNumber = application
                    ? application.applicationNumber
                    : "";

                return res.status(200).json({
                    message: `Successfully fetched user details`,
                    user: { ...student },
                });
            }
            return res.status(404).json({
                message: `User not found!`,
            });
        } else if (req.method === "PUT") {
            const { _id, ...update } = req.body;
            const student = await Student.findById(_id);

            if (student) {
                student.set(update);
                await student.save();
                if (update?.paymentStatus || update?.name) {
                    const application = await Application.findById(
                        student.applicationId
                    );
                    if (application) {
                        application.set({
                            paymentStatus:
                                update.paymentStatus ||
                                application.paymentStatus,
                            name: update.name || application.name,
                        });
                        await application.save();
                    }
                }

                return res
                    .status(200)
                    .json({ message: "Updated successfully!" });
            }
            return res.status(404).json({ message: "Student not found!" });
        }
    } catch (error: any) {
        console.log(error?.response?.data || error?.message);
        return res.status(400).json({ message: error });
    }
}
