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

const editBookReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDITS':
            return action.payload
        default:
            return state
    }
}

const bookOnReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_BOOK_CLICKED':
            return action.payload
        default:
            return state
    }
}

const wishListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_WISH_LIST':
            return action.payload
        default:
            return state
    }
}



export default combineReducers({
    libraryReducer,
    detailsReducer,
    bookOnReducer,
    editBookReducer,
    wishListReducer
});
