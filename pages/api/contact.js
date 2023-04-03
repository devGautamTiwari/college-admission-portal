import sendEmail from "../../lib/sendEmail";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { name, email, subject, message: query } = req.body;
            const message = `<div>From ${name}(${email})</div><br/><div>Subject: ${subject}</div><br/><div>Message: ${query}</div>`;

            await sendEmail({
                to: process.env.SENDER_EMAIL,
                subject: subject,
                message: message,
            });

            return res.status(200).json({
                message: `Email sent to ${email}, please check your email`,
            });
        }
    } catch (error) {
        console.log(error?.response?.data || error?.message);
    }
}
