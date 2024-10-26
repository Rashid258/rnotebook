import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  let navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (credentials.password !== credentials.confirmPassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const res = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
    });
    const data = await res.json();
    console.log(data);

    if (data.success) {
      // Save the authToken and navigate to home
      localStorage.setItem("token", data.authToken);
      navigate('/');
      props.showAlert('Account Created Successfully', 'success');
    } else {
      props.showAlert('Please enter correct credentials.', 'danger');
    }
  };

  // Handle input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-2">
          <h2>Please Enter Your Credentials to Sign Up</h2>
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" value={credentials.name} name="name" onChange={onChange} id="name" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} name="email" onChange={onChange} id="email" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} name="password" onChange={onChange} minLength={5} required id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={credentials.confirmPassword} name="confirmPassword" onChange={onChange} minLength={5} required id="confirmPassword" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
