import * as actionTypes from "./notificatoinActionsType";

export const add = () => {
    return {
        type: actionTypes.ADD,
    };
};

export const remove = () => {
    return {
        type: actionTypes.REMOVE,
    };
};
