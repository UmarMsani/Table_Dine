// services/emailService.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export const sendEmail = async (name, email, phone, address, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'tabledine001@gmail.com', // Replace with recipient email address
      subject: 'New Contact Form Submission',
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Address:</strong> ${address}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export const sendBookingEmail = async ({ name, email, phone, date, time, guests, message }) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'tabledine001@gmail.com',
      subject: 'New Table Booking Request',
      text: `You have a new table booking request:
             Name: ${name}
             Email: ${email}
             Phone: ${phone}
             Date: ${date}
             Time: ${time}
             Number of Guests: ${guests}
             Message: ${message}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Booking email sent successfully');
    } catch (error) {
      console.error('Error sending booking email:', error);
      throw new Error('Failed to send booking email');
    }
  };
