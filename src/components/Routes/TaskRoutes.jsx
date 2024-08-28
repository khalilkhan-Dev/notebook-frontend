import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, ProtectedRoute, Signup } from '../Authentication'
import { CreateTask, TaskDetails, Tasks, TaskUpdate } from '../pages/index'
import Navbar from '../Navbar'

const TaskRoutes = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/tasks"
            element={
              
                <Tasks />
             
            }
          />
          <Route
            path="/task/:id"
            element={
              
                <TaskDetails />
              
            }
          />

          <Route
            path="/createtask"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatetask/:id"
            element={
              <ProtectedRoute>
                <TaskUpdate />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default TaskRoutes