import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://notebook-nine-wheat.vercel.app/signup", {
        username,
        email,
        password
      });

      // Check if response contains a JSON object with a token field
      localStorage.setItem('token', response.data.token); // Save the token
      navigate('/tasks');

    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ height: "calc(100vh - 200px)" }}>
        <div className="col-md-6 col-lg-4">
          
          <form className="p-4 rounded text-white" onSubmit={handleSubmit}>
            <h4 className='text-center mb-4'>Create Your Account</h4>
            <div className="mb-3">
              <input
                type="text"
                placeholder='Username'
                value={username}
                className='form-control'
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder='Email'
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
                value={password}
                className='form-control'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className='btn btn-success w-100 mb-3' type="submit">Sign Up</button>
            {errorMessage && <p className="text-center mt-3" style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}

            <div className='d-flex justify-content-between mb-4'>
            <p className='text-success'>Login if already have account!</p>
            <Link to="/" className="mx-2">
              <button className='btn px-5 btn-primary'>Login</button>
            </Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
