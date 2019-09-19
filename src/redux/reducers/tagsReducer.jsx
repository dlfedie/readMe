import { combineReducers } from 'redux';


const tagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS_RESULTS':
            return action.payload.data;
        default:
            return state;
    }
};



// user will be on the redux state at:
// state.user
export default combineReducers({
    tagsReducer,
    
});
