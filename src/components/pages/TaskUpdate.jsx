// src/pages/UpdateProductPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TaskUpdate = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTaskName(response.data.taskName);
        setTaskDescription(response.data.taskDescription);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        taskName,
        taskDescription
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/tasks');
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>

    <div className="container mt-5 text-white">
    <div className="row d-flex justify-content-center align-items-center"style={{height:"calc(100vh - 200px)"}}>
      <form  className='text-center ' onSubmit={handleSubmit}>
      <h4>Update Task</h4>

        <div>
          
          <input className='my-3 p-2' type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
        </div>
 
        <div>
          <textarea type="text p-2" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
        </div>
        <span><button type="submit" className='my-3 btn-success rounded px-2 py-1'>Update</button></span>
      </form>
    </div>
    </div>
      
    </>
  );
};

export default TaskUpdate;
