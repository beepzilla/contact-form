const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any SMTP service provider
    auth: {
      user: 'your-email@gmail.com', // Your email
      pass: 'your-password', // Your email password or app password
    },
  });

  const mailOptions = {
    from: email,
    to: 'your-receiving-email@gmail.com', // Your email where you want to receive messages
    subject: `Message from ${name}: ${subject}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ status: 'success', message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).send({ status: 'error', message: 'Failed to send email' });
  }
};
