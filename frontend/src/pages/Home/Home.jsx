import React, { useState } from 'React';
import './Home.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AboutUs from '../../components/AboutUs/AboutUs';
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <BackgroundVideo />
      <div className="content">
        <Header />
        <AboutUs />
      </div>
    </div>
  );
};

export default Home;