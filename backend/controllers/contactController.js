const Contact = require('../models/contactModel');
const emailService = require('../services/emailService');

exports.submitContactForm = async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  try {
    // Save to database
    const newContact = new Contact({ name, email, phone, address, message });
    await newContact.save();

    // Send email
    await emailService.sendContactEmail(name, email, phone, address, message);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'An error occurred while processing the form' });
  }
};
