const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "house.of.devP5@gmail.com",
      pass: "slaqwnhbdymtocnd",
    },
  });

module.exports = transporter