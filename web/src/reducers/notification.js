import * as notificationActionTypes from "../actions/notificatoinActionsType";

const initialState = {
    notification: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case notificationActionTypes.ADD:
            return {
                ...state,
            };
        case notificationActionTypes.REMOVE:
            return {
                ...state,
            };
    }
};

export default reducer;
