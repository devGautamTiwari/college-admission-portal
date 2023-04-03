import { NextApiRequest, NextApiResponse } from "next/types";
import dbConnect from "../../config/dbConnect";
import Application from "../../models/application";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect();
        if (req.method === "GET") {
            const { applicationNumber } = req.query;

            const application = await Application.findOne({
                applicationNumber: applicationNumber,
            });
            if (!application) {
                return res
                    .status(404)
                    .json({ message: "No such application number found!" });
            }
            return res.status(200).json({
                name: application.name,
                course: application.course,
                status: application.status,
                applicationNumber: application.applicationNumber,
            });
        }
    } catch (error: any) {
        console.log(error?.response?.data || error?.message);
        return res.status(400).json({ message: error });
    }
}
