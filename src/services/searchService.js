import axios from 'axios';

const searchService = {
    // General search
    async getBooksByText(text) {
        let res = await axios.get(`http://openlibrary.org/search.json?q=${text}&jscmd=details&page=1`);
        return res.data;
    },

    // Open one specific book by ISBN
    getBookByIsbn(isbn) {
        let res = axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
        return res;
    },

    // Open one specific book by Edition Key
    getBookByEditionKey(eKey) {
        let res = axios.get(`https://openlibrary.org/books/${eKey}.json`);
        return res;
    }
}

export default searchService

/*
URLS
Search by author
http://openlibrary.org/search.json?author=${text}&jscmd=details&page=1

Search by title
http://openlibrary.org/search.json?title=${text}&jscmd=details&page=1
*/