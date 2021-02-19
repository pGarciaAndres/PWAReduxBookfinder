const pageReducer = (state = null, action) => {
    switch(action.type) {
        case 'RESET_PAGE':
            return 1
        case 'DEC_PAGE':
            return state - 1
        case 'INC_PAGE':
            return state + 1
        default:
            return state;
    }
}

export default pageReducer;