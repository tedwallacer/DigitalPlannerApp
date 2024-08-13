import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(''); // State to store error message

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
        setTasks(response.data);
        setError(''); // Clear any previous errors on successful fetch
      } catch (error) {
        // Handle errors more gracefully
        // Logging the error to the console is good for developers
        console.error('Failed to fetch tasks:', error);
        // Update the state with a user-friendly error message
        setError('Failed to fetch tasks. Please try again later.');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      {/* Display error message if there's an error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;