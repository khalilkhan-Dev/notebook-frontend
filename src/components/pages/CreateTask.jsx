// src/pages/CreateProductPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://notebook-nine-wheat.vercel.app/tasks', {
        taskName,
        taskDescription
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/tasks');
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
     <div className="container text-white">
     <div class="row d-flex justify-content-center align-items-center" style={{height: "calc(100vh - 200px)"}}>
      <form className='text-center' onSubmit={handleSubmit}>
      <h4 >Create Task</h4>
        <div>
          <input type="text" className='p-2 mt-3' placeholder='Task Name' value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
        </div>
        
        <div>
          <textarea className='my-3 p-2 ' type="text" placeholder='Task Description' value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
          
        </div>
        <button type="submit" className='btn-success my-3 rounded px-3 py-1'>Create</button>
      </form>
     </div>
     </div>
    </>
  );
};

export default CreateTask;
