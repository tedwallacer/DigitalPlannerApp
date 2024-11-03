import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: ''
  });
  const [submissionError, setSubmissionError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
    setSubmissionError("");
  };

  const submitTask = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, task);
      setTask({
        title: '',
        description: ''
      });
      setSubmissionError("");
      alert('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      setSubmissionError('Failed to add task. Please try again.');
    }
  };

  const displayError = () => {
    return submissionError ? (
      <div style={{color: "red"}}>
        {submissionError}
      </div>
    ) : null;
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={submitTask}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            required
          />
        </div>

        {displayError()}

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;