import React from 'react';
import './AboutUs.css';
import Header from '../../components/Header/Header';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';

const AboutUs = () => {
  return (
    <div>
      <BackgroundVideo />
      <div className="content">
        <Header />
        <br /><br />
        <div className="about-container">
          <h2>About Us</h2>
          <p>
            Welcome to Table Dine, where culinary excellence meets a cozy and elegant ambiance.
            Our restaurant is dedicated to providing an exceptional dining experience, 
            offering a menu filled with delightful dishes made from the freshest ingredients. 
            Whether you’re joining us for a casual lunch, a romantic dinner, or a special celebration, 
            we promise to deliver quality and flavor in every bite.
          </p>
          <br /><br />
          <h3>Our Story</h3>
          <p>
            Established in 2024, Table Dine was founded with the vision of creating a place where 
            food lovers can gather to enjoy great meals and create memorable moments. 
            Our team of skilled chefs and friendly staff are passionate about delivering 
            a unique dining experience that combines tradition with innovation.
          </p>
          <br />
          <br />
          <br />
          <h3>Customer Reviews</h3>
          <div className="reviews">
            <div className="review">
              <h4>John Doe</h4>
              <p>"The best dining experience I've ever had! The food was exquisite and the service was top-notch."</p>
            </div>
            <div className="review">
              <h4>Jane Smith</h4>
              <p>"A wonderful place for family dinners. The atmosphere is warm and inviting, and the dishes are simply amazing."</p>
            </div>
            <div className="review">
              <h4>Michael Brown</h4>
              <p>"I love the variety on the menu. Every dish I've tried has been delicious. Highly recommend Table Dine!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
