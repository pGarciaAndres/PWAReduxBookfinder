const inputTextReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_TEXT':
            return action.payload
        default:
            return state;
    }
}

export default inputTextReducer;