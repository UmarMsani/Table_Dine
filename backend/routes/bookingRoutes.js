import express from 'express';
import { sendBookingEmail } from '../services/emailServices.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, date, time, guests, message } = req.body;

  try {
    await sendBookingEmail({ name, email, phone, date, time, guests, message });
    res.status(200).json({ message: 'Booking request sent successfully!' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ message: 'Failed to send booking request' });
  }
});

export default router;
