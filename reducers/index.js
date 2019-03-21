import {
    CHANGE_TURN,
} from "../constants/action-types";

const initialState = {
    turn: 0
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TURN:
            return { 
                ...state, 
                turn: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;