import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (options) => {
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: "gmail",
        secure: true, 
        auth: {
            user: process.env.SMTP_MAIL,       
            pass: process.env.SMTP_PASSWORD,   
        },
    });

    
    const mailOptions = {
        from: `"${process.env.SMTP_MAIL}" <${process.env.SMTP_MAIL}>`, 
        to: options.email,       
        subject: options.subject, 
        text: options.message,   
        html: options.html,       
    };

    
    await transporter.sendMail(mailOptions);
};