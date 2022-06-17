import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

//have a global header x-auth-token, if we have a token in the localStorage, we want to always send it ->utils/setAuthToken
//Load User: to check if there is a token
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');//return an authenticated user

        dispatch({
            type: USER_LOADED,
            payload: res.data
            //res.data now is user and header has x-auth-token
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

//Register User
export const register = ({name, email, password }) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        //const body = JSON.stringify({name, email, password });
        
        const res = await axios.post('/api/users', {name, email, password }, config);//get a token
        

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch( setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

//Login User
export const login = ({email, password }) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        //const body = JSON.stringify({email, password });
        
        const res = await axios.post('/api/auth', {email, password }, config);//get a token 

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch( setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//Logout /clear profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
};