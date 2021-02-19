const searchMethodReducer = (state = 'q', action) => {
    switch(action.type) {
        case 'SET_METHOD':
            return action.payload
        default:
            return state;
    }
}

export default searchMethodReducer;