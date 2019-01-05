import {
    CLOSE_LIGHTBOX,
    OPEN_LIGHTBOX,
} from "../constants/action-types";

const initialState = {
    one: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // case CLOSE_LIGHTBOX:
        //     return { ...state, 
        //         lightboxIsOpen: false
        //     };
        // case OPEN_LIGHTBOX:
        //     return { ...state, 
        //         lightboxIsOpen: true
        //     };
        default:
            return state;
    }
};

export default rootReducer;