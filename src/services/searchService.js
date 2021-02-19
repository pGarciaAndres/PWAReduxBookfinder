import axios from 'axios';

const searchService = {
    // General search
    async getBooksByInput(page, text, searchMethod) {
        const p = page ? page : 1;
        let res = await axios.get(`http://openlibrary.org/search.json?${searchMethod}=${text}&jscmd=details&page=${p}`);
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