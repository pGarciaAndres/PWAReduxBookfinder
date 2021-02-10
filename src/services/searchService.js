import axios from 'axios';

const searchService = {
    async getBooksByText(text) {
        let res = await axios.get(`http://openlibrary.org/search.json?q=${text}&jscmd=details&page=1`);
        return res.data;
    },

    getBookByIsbn(isbn) {
        let res = axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
        return res;
    },

    
    getBookByEditionKey(ekey) {
        let res = axios.get(`https://openlibrary.org/books/${ekey}.json`);
        return res;
    }
}

export default searchService

/*
URLS
Search by all means
http://openlibrary.org/search.json?q=${text}&jscmd=details&page=1

Search by author
http://openlibrary.org/search.json?author=${text}&jscmd=details&page=1

Search by title
http://openlibrary.org/search.json?title=${text}&jscmd=details&page=1

Open one specific book
https://openlibrary.org/api/books?bibkeys=ISBN:${key}&jscmd=data&format=json
*/