// routes/contactRoutes.js

import express from 'express';
import { sendEmail } from '../services/emailServices.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, address, message } = req.body;
  
  try {
    // Send email
    await sendEmail(name, email, phone, address, message);
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;

