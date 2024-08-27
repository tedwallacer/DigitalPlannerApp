import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const logEventAction = (message) => {
    console.log(`[Event Logger] - ${message}`);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
      logEventAction('Fetched events successfully.');
    } catch (error) {
      console.error('Error fetching events:', error);
      logEventAction('Failed to fetch events.');
    }
  };

  const handleAddEvent = async () => {
    if (!newEventName.trim() || !newEventDate.trim()) return; // Simple validation

    try {
      const event = { name: newEventName, date: newEventDate };
      await axios.post(`${API_URL}/events`, event);
      setNewEventName('');
      setNewEventDate('');
      fetchEvents(); // Refresh the events list after adding a new event
      logEventAction('Added a new event successfully.');
    } catch (error) {
      console.error('Error adding new event:', error);
      logEventAction('Failed to add a new event.');
    }
  };

  return (
    <div>
      <h2>Events List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {event.date}
          </li>
        ))}
      </ul>
      <div>
        <h3>Add New Event</h3>
        <input
          type="text"
          value={newEventName}
          onChange={(e) => setNewEventName(e.target.value)}
          placeholder="Event Name"
        />
        <input
          type="date"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
          placeholder="Event Date"
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default EventsList;