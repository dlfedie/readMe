import { combineReducers } from 'redux';

//Snackbar reducer! basically sets a binary state. If I wanted to go more in depth, I could select messages, etc, too.
const snackbarOpen = (state = false, action) => {
    switch (action.type) {
        case 'SNACKBAR_TRUE':
            return true;
        case 'SNACKBAR_FALSE':
            return false;
        default:
            return state;
    }
}

const snackbarText = (state = '', action) => {
    switch (action.type) {
        case 'SET_SNACKBAR_TEXT':
            return action.payload.notificationText;
        default:
            return state;
    }
}

export default combineReducers({
    snackbarOpen,
    snackbarText
});
