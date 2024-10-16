import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = () => {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, taskDetails);
      setTaskDetails({
        title: '',
        description: ''
      });
      alert('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskDetails.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={taskDetails.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;