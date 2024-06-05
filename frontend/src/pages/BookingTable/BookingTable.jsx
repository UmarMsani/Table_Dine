import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookingTable.css';
import Header from '../../components/Header/Header';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';


const BookingTable = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Booking data submitted:', formData);
    
    // Send the data to a backend server
    try {
      const response = await fetch('http://localhost:4000/api/bookings', { // Replace with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Booking request sent successfully!');
        // Optionally, reset form fields
        setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '', message: '' });
      } else {
        toast.error('Failed to send booking request');
      }
    } catch (error) {
        toast.error('Error:', error);
    }
  };

  return (
    <div>
      <BackgroundVideo />
      <div className="content">
        <Header />
        <br /><br />
        <div className="booking-form-container">
          <h2>Book a Table</h2>
          <form onSubmit={handleSubmit}>
            <table className="booking-table">
              <tbody>
                <tr>
                  <td><label htmlFor="name">Name:</label></td>
                  <td><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="email">Email:</label></td>
                  <td><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="phone">Phone:</label></td>
                  <td><input type="phone" id="phone" name="phone" value={formData.phone} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="date">Date:</label></td>
                  <td><input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="time">Time:</label></td>
                  <td><input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="guests">Number of Guests:</label></td>
                  <td><input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="message">Message:</label></td>
                  <td><textarea id="message" name="message" value={formData.message} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td colSpan="2" className="submit-row">
                    <button type="submit">Submit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingTable;
