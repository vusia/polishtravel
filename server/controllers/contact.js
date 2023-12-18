const nodemailer = require("nodemailer");

var contactEmail = nodemailer.createTransport("SMTP", {
host: "smtp.gmail.com", // hostname
secureConnection: false,
port: 587, // port for secure SMTP
requiresAuth: true,
domains: ["gmail.com", "googlemail.com"],
tls: {ciphers:'SSLv3'},
auth: {
user: "projetpolishtravel@gmail.com",
pass: "Projetpolish2023"
}
});

/*const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "projetpolishtravel",
    pass: "Projetpolish2023",
  },
});*/

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

export default function contact (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "projetpolishtravel@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
};