const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')

const contactController = asyncHandler(async (req, res) => {
    console.log(req.body)
 
    const { name, email, subject, message } = req.body || {};

if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Invalid request body' });
}
    console.log(name, email, subject, message);

    try {
        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth:{
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS, 
            }
        })
        console.log("google mail receiver inside>>", process.env.GOOGLE_MAIL);
        console.log("email sender inside>>", email);
        console.log("google pass inside>>", process.env.GOOGLE_PASS);
        const mailOptions = {
            from: email,
            to: process.env.GOOGLE_MAIL,
            subject: subject,
            text: `A message was sent: ${message}. Contact details - Email: ${email},`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return false;
            } else {
              console.log("Email sent: " + info.response);
              return true;
            }
          });
          res.status(200).json("message sent successfull on email");

    } catch (error) {
        console.log(error);
    res.status(500).json(error);
    }



})
module.exports = {contactController}