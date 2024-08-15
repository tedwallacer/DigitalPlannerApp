import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
      setTasks(response.data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setError('Failed to fetch tasks. Please try again later.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTasks = () => {
    return tasks.map(task => (
      <li key={task.id}>
        {task.title} - {task.description}
      </li>
    ));
  };

  const renderError = () => {
    return <p style={{ color: 'red' }}>{error}</p>;
  };

  return (
    <div>
      <h2>Task List</h2>
      {error ? renderError() : renderTasks()}
    </div>
  );
};

export default TaskList;