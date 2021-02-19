const cachedBooksReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_CACHED_BOOKS':
            return action.payload
        case 'CLEAR_CACHE':
            return {}
        default:
            return state;
    }
}

export default cachedBooksReducer;