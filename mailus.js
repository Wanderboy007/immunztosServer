// var nodemailer = require('nodemailer');
import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dav121242121@gmail.com',
        pass: 'zzgk bhzr zmlw fxrl'
    }
});



export default function sendEmail(to, text) {

    console.log(to)
    console.log(text)
    var mailOptions = {
        from: 'dav121242121@gmail.com',
        to,
        subject: 'otp to verify',
        text: `${text}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}