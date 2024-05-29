import React, { useState } from 'react';
import './Booking.css'
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo'

const AboutUs = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [isTableAvailable, setIsTableAvailable] = useState(null);


  const checkTableAvailability = async () => {
    if (!selectedTable || !selectedSeat || !numberOfPeople) {
      alert('Please select a table, seat, and number of people.');
      return;
    }

    try {
      const response = await fetch(`/api/check-availability?table=${selectedTable}&seat=${selectedSeat}&people=${numberOfPeople}`);

      if (!response.ok) {
        throw new Error('Error fetching availability');
      }

      const data = await response.json();
      setIsTableAvailable(data.isAvailable);
    } catch (error) {
      console.error(error);
      setIsTableAvailable(false);
      alert('An error occurred while checking availability. Please try again later.');
    }
  };

  return (
    <div className='book' id='book'>
      <label htmlFor='date'>Select Date:</label>
      <input
        type='date'
        id='date'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <label htmlFor='table'>Select Table:</label>
      <select id='table' value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        <option value='table1'>Table 1</option>
        <option value='table2'>Table 2</option>
        <option value='table3'>Table 3</option>
      </select>

      <label htmlFor='seat'>Select Seat:</label>
      <select id='seat' value={selectedSeat} onChange={(e) => setSelectedSeat(e.target.value)}>
        <option value='seat1'>Seat 1</option>
        <option value='seat2'>Seat 2</option>
        <option value='seat3'>Seat 3</option>
      </select>

      <label htmlFor='people'>Number of People:</label>
      <input
        type='number'
        id='people'
        value={numberOfPeople}
        onChange={(e) => setNumberOfPeople(e.target.value)}
      />

      <button onClick={() => checkTableAvailability()}>Check Availability</button>

      {isTableAvailable !== null && (
        <p>{isTableAvailable ? 'Table is available' : 'Table is not available'}</p>
      )}

      <div className='video-container' style={{ height: '0px', overflow: 'hidden' }}>
        <BackgroundVideo />
      </div>
    </div>
  );
};

export default AboutUs;