import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactUs.css';
import Header from '../../components/Header/Header';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
    
    // Example: Send the data to a backend server
    try {
      const response = await fetch('http://localhost:4000/api/contact', { // Replace with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        // Optionally, reset form fields
        setFormData({ name: '', email: '', phone: '', address: '', message: '' });
      } else {
        toast.error('Failed to send message');
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
        <div className="contact-form-container">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <table className="contact-table">
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
                  <td><label htmlFor="address">Address:</label></td>
                  <td><textarea id="address" name="address" value={formData.address} onChange={handleChange} required></textarea></td>
                </tr>
                <tr>
                  <td><label htmlFor="message">Message:</label></td>
                  <td><textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea></td>
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

export default ContactUs;
