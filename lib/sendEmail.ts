import nodemailer from "nodemailer";

export default function sendEmail(options: {
    to: string;
    subject: string;
    message: string;
}) {
    const { to, subject, message } = options;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: to,
        subject: subject,
        html: message,
    };

    transporter.sendMail(mailOptions, function (error, _info) {
        if (error) {
            console.log("Error while sending email", error);
        } else {
            console.log("Email successfully sent");
        }
    });
}
