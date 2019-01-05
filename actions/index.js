import {
    CLOSE_LIGHTBOX,
    OPEN_LIGHTBOX
} from "../constants/action-types";

export const closeLightbox = () => ({
    type: CLOSE_LIGHTBOX,
});

export const openLightbox = () => ({
    type: OPEN_LIGHTBOX
});