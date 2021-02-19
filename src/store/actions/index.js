export const setData = data => {
    return { type: 'SET_DATA', payload: data };
};

export const setInputText = text => {
    return { type: 'SET_TEXT', payload: text };
};

export const setSearchMethod = method => {
    return { type: 'SET_METHOD', payload: method };
};

export const resetPage = () => {
    return { type: 'RESET_PAGE' };
};

export const decPage = () => {
    return { type: 'DEC_PAGE' };
};

export const incPage = () => {
    return { type: 'INC_PAGE' };
};

export const setCachedBooks = (books) => {
    return { type: 'SET_CACHED_BOOKS', payload: books };
};

export const clearCache = () => {
    return { type: 'CLEAR_CACHE' };
};