import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEventForm = () => {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    location: '',
  });
  const [eventQueue, setEventQueue] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (eventQueue.length > 0) {
        submitEvents();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [eventQueue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEventQueue([...eventQueue, event]);
    setEvent({
      name: '',
      date: '',
      location: '',
    });
  };

  const submitEvents = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/events/batch`, { events: eventQueue });
      console.log('Events added:', response.data);
      setEventQueue([]);
    } catch (error) {
      console.error('Error adding events:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Event Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={event.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={event.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={event.location}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;