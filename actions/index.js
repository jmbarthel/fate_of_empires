import {
    CLOSE_LIGHTBOX,
    OPEN_LIGHTBOX
} from "../constants/action-types";

export const closeLightbox = (user) => ({
    type: CLOSE_LIGHTBOX,
    payload: user
});

export const openLightbox = (user) => ({
    type: OPEN_LIGHTBOX,
    payload: user
});