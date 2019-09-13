import { combineReducers } from 'redux';


const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload.data.items;
        default:
            return state;
    }
};

const searchDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SEARCH_DETAILS_PAGE':
            return action.payload
        default:
            return state
    }
}

// user will be on the redux state at:
// state.user
export default combineReducers({
    searchReducer,
    searchDetails
});
