import { combineReducers } from "redux";
import dataReducer from './data';
import inputTextReducer from './inputText';
import searchMethodReducer from './searchMethod';
import pageReducer from './page';
import cachedBooksReducer from './cachedBooks';

export default combineReducers({
    data: dataReducer,
    text: inputTextReducer,
    method: searchMethodReducer,
    page: pageReducer,
    cachedBooks: cachedBooksReducer,
});