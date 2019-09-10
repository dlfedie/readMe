const searchReducer = (state = [{
    volumeInfo: {
        title: ''
    }
}], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload.data.items;
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default searchReducer;
