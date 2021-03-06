import React, {useState} from 'react';
import { connect } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

//import axios from 'axios';
//destructure -> setAlet = props
const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      if(password !== password2){
          //setAlert(msg, alertType)
          setAlert('Passwords do not match', 'danger');
      }else{
          register({ name, email, password });
      }
    }
    
    //Redirect if registered
    if(isAuthenticated) {
      //return <Navigate to="/login"/> 
      //redirect to login page, but the login page will redirect to dashboard with isAuthenticated true, so it will go to dashboard if we do navigate to login
      return <Navigate to="/dashboard"/> 
    }
    /*//example of making a request without redux
    const onSubmit = async e => {
      e.preventDefault();
      if(password !== password2){
          console.log('Passwords do not match');
      }else{
          const newUser = {
              name,
              email,
              password
          }
          try {
              const config = {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }
              const body = JSON.stringify(newUser);
              //axios return a promise
              const res = await axios.post('/api/users', body, config);
              console.log(res.data);
          } catch (error) {
              console.error(error.response.data);
          }
      }
  }
    */
    
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps, 
  { setAlert, register }
)(Register);
