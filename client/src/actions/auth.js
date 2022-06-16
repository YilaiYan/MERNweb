import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//Register User
export const register = ({name, email, password }) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        //const body = JSON.stringify({name, email, password });
        
        const res = await axios.post('/api/users', {name, email, password }, config);
        

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch( setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}