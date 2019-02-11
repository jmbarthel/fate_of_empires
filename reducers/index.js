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
        // case LOG_IN:
        //     return { ...state, 
        //         id: action.payload.id,
        //         username: action.payload.username,
        //         profilePicture: action.payload.profilePicture,
        //         fullName: action.payload.fullName,
        //         totalPoints: action.payload.totalPoints,
        //         createdAt: action.payload.createdAt,
        //         userAddress: action.payload.blockchainAddress,
        //         tokenLogin: action.payload.tokenLogin
        //     };
        default:
            return state;
    }
};

export default rootReducer;