import { combineReducers } from "redux";
import data from './data';
import text from './inputText';
import method from './searchMethod';
import page from './page';
import cachedBooks from './cachedBooks';

export default combineReducers({
    data,
    text,
    method,
    page,
    cachedBooks,
});