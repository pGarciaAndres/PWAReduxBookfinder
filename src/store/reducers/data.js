const dataReducer = (state = {docs: [], pages: 0, start: 0}, action) => {
    switch(action.type) {
        case 'SET_DATA':
            return action.payload
        default:
            return state;
    }
}

export default dataReducer;