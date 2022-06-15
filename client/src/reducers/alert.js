import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

const initialState = [
    
];

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case SET_ALERT:
            //send data as payload
            return [...state, payload];
        case REMOVE_ALERT:
            //payload is the id
            return state.filter(alert => alert.id !== payload)
        default:
            return state;
    }
}