const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const Contact = require("../models/contactModel")
const contactMiddleware = require("../middleware/contactMiddleware");
const nodemailer = require("nodemailer");

// console.log("google mail controller>>", process.env.GOOGLE_MAIL);
// console.log("google pass contoller>>", process.env.GOOGLE_PASS);

const contactController = asyncHandler(async (req, res) => {
  const { name, email, phone, countryCode, subject, message } = req.body;
  console.log(name, email, phone, countryCode, subject, message);

  // contactMiddleware(name, email, phone, subject, message)

  //-----------------------------------------------------------------------------------------------------------------------
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASS,
      },
    });
    console.log("google mail receiver inside>>", process.env.GOOGLE_MAIL);
    console.log("email sender inside>>", email);
    console.log("google pass inside>>", process.env.GOOGLE_PASS);

    const mailOptions = {
      from: email,
      to: process.env.GOOGLE_MAIL,
      subject: subject,
      text: `A message was sent: ${message}. Contact details - Email: ${email}, Phone: ${countryCode} ${phone}`,
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

  //-----------------------------------------------------------------------------------------------------------------------
});

// module.exports = { contactController };
