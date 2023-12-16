import sendEmail from "../../lib/sendEmail";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            const { name, email, subject, message: query } = req.body;
            const message = `<div>From ${name}(${email})</div><br/><div>Subject: ${subject}</div><br/><div>Message: ${query}</div>`;

            await sendEmail({
                to: process.env.SENDER_EMAIL || "",
                subject: subject,
                message: message,
            });

            return res.status(200).json({
                message: `Email sent to ${email}, please check your email`,
            });
        }
    } catch (err) {
        const error = err as AxiosError;
        console.log(error?.response?.data || error?.message);
    }
}
