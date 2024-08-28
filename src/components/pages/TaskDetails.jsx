// src/pages/TaskDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();  
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To programmatically navigate

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`https://notebook-nine-wheat.vercel.app/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
        setError("Failed to load task details.");
      }
    };
    fetchTaskDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://notebook-nine-wheat.vercel.app/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/tasks'); // Navigate back to the tasks list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="container text-white">
  <div className="row d-flex justify-content-center align-items-center"style={{height:"calc(100vh - 200px)"}}>
  {error && <p style={{ color: 'red' }}>{error}</p>}
      {task ? (
       <div className='d-flex flex-column justify-content-center align-items-center'>
       <div>
       <h1>Task Details</h1>
       <p><b>Task ID:</b> {task._id}</p>
       <p><b>Task Name:</b> {task.taskName}</p>
       <p><b>Task Description:</b> {task.taskDescription}</p>
       <span>
         <button className='btn btn-danger rounded' onClick={handleDelete}>Delete</button>
       </span>
       <Link to={`/updatetask/${task._id}`}>
         <button className='ms-2 btn btn-success rounded'>Update</button>
       </Link>
       </div>
     </div>
      ) : (
        <p>Loading task details...</p>
      )}
  </div>
    </div>
  );
};

export default TaskDetails;
