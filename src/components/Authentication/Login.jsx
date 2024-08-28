import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Save the token
      navigate('/tasks'); // Redirect to home or dashboard
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display the error message based on the backend response
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container text-white">
      <div className="row justify-content-center align-items-center" style={{height:"calc(100vh - 200px)"}}>
        <div className="col-md-6 col-lg-4">
          <form className="p-4 rounded text-white" onSubmit={handleSubmit}>
            <h2 className='text-start mb-4'>LOGIN</h2>
            <div className="mb-3">
              <input
                type="email"
                placeholder='Email...'
                value={email}
                className='form-control'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder='Password'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className='btn btn-primary w-100 mb-3' type="submit">Login</button>
            <p className='text-success'>if you are new user create your account first..</p>
            <Link to="/signup">
              <button className='btn btn-success w-100' type="button">Create an account</button>
            </Link>
            {errorMessage && <p className="text-center mt-3" style={{ color: 'red' }}>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
