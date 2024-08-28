// src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Tasks = () => {
  const [task, setTask] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get('https://notebook-nine-wheat.vercel.app/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response.data); // Debugging line
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      }
    };
    fetchTask();
  }, []);




  return (
    <>
            <div className="container">
            

     <div className="row mt-5">
     <h1 className='text-white'>Tasks</h1>
     {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/createtask"><button className='btn-primary rounded my-4'>Create New Task</button></Link>
     </div>
      
      
     <div className="row">
     <p className='text-white'>List of Tasks</p>
      <div className='row '>
        {task.length === 0 ? (
          <p className='text-danger'>No Tasks available.</p>
        ) : (
          task.map(task => (
            
         
           
              <div className='col-md-2 bg-dark m-2 p-2 text-center rounded' key={task._id}>
              <Link className='text-decoration-none text-white' to={`/task/${task._id}`}><span><b>Task Name</b>: {task.taskName}</span></Link>
             
             
          
          </div>
          
          ))
        )}
      </div>
     </div>
            </div>
    </>
  );
};

export default Tasks;
