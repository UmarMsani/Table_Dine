//import Booking from '../models/bookingModel.js';
//import { sendBookingEmail } from '../services/emailService.js';
const Booking = require('../models/Booking');
const { sendBookingEmail } = require('../services/emailService');

export const bookTable = async (req, res) => {
  const { name, email, phone, date, time, guests, message } = req.body;

  try {
    // Save booking to the database
    const booking = new Booking({
      name,
      email,
      phone,
      date,
      time,
      guests,
      message,
    });

    await booking.save();

    // Send booking email
    await sendBookingEmail({ name, email, phone, date, time, guests, message });

    res.status(200).json({ message: 'Booking request sent and saved successfully!' });
  } catch (error) {
    console.error('Error saving booking or sending email:', error);
    res.status(500).json({ message: 'Failed to save booking or send booking request' });
  }
};
