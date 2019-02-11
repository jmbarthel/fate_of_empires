import {
    CHANGE_TURN,
} from "../constants/action-types";

export const changeTurn = (turn) => ({
    type: CHANGE_TURN,
    payload: turn
});