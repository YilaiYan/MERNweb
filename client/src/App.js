import './App.css';

import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {
  //when state update, the useEffect keep running and it will be a constant loop 
  //unless we add a second parameter [], empty bracket. This only run once (on mount or unmount)
  //if we put property in [], when the property update, useEffect will update
  useEffect(() => {
    store.dispatch(loadUser());
    //console.log('useEffect i fire once');
    //run twice since React.strictMode on 
  }, []);


  return(
  <Provider store={store}>
  <Router>
    <Fragment>
        <Navbar/>
        <Alert/>
        <Routes>
          <Route exact path="/" element = {<Landing/>} />
          <Route exact path='/register'element = {<Register/>} /> 
          <Route exact path='/login'element = {<Login/>} /> 
        </Routes>
   </Fragment>
  </Router>
  </Provider>
  
)};
    

export default App;
