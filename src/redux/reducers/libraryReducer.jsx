import { combineReducers } from 'redux';


const libraryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIBRARY':
            return action.payload;
        default:
            return state;
    }
};

const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload
        default:
            return state
    }
}

const bookOnReducer = (state = 'topOfPage', action) => {
    switch (action.type) {
        case 'SET_BOOK_CLICKED':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    libraryReducer,
    detailsReducer,
    bookOnReducer
});
