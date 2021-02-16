import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import noCoverImg from '../images/noCover.gif';

// Services
import searchService from '../services/searchService';

const BookListContainer = styled.div`
    width: 85%;
    max-width: 1100px;
    margin: 0px auto 10px auto;
    .input {
        width: 100%;
    }  
`;

const BookContent = styled.div`
    display: inline-flex;
    width: 100%;
`;

const BookCover = styled.div`
    width: 100px;
    min-height: 140px !important;
    margin-right: 1em;
    img {
        width: 100%;
    }
`;

const BookInfo = styled.div`
    color: grey;
    width: 80%;
    h1 {
        margin-bottom: 3px;
    }
    h4 {
        margin-top: 10px;
        margin-bottom: 3px;
    }
    .italic {
        font-style: italic;
    }
    .basic {
        float: left;
        width: 60%;
    }
    .editions {
        float: right;
        margin-left: 1em;
        width: 36%;
        margin-top: 1em;
    }
`;

const useStyles = makeStyles(theme => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
}));

const BookList = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(null);
    const [bookCache, setBookCache] = useState({});

    const getEditions = (books, bookIndex, panel) => {
        books[bookIndex].editionId.map(async (ed, edIndex) => {
            const edRes = await searchService.getBookByEditionKey(ed, books, bookIndex, edIndex);
            const bookEK = edRes.data;
            const editionTitle = bookEK.title ? bookEK.title : 'Unknown title';
            const editionDate = bookEK.publish_date ? bookEK.publish_date : 'Unknown date';
            books[bookIndex].editionName[edIndex] = `${editionTitle} - ${editionDate}`;
            if (edIndex === books[bookIndex].editionId.length - 1) {
                setBookCache(books);
                setExpanded(panel);
            }
        });
    }

    const handleChange = (panel, book, index) => async(event, isExpanded) => {
        if (bookCache[index]) {
            setExpanded(isExpanded && panel);
        }
        if (isExpanded && !bookCache[index]) {
            const coverEditionKey = book.cover_edition_key ?? '';
            if (coverEditionKey) {
                searchService.getBookByEditionKey(coverEditionKey).then(editionResponse => {
                    const bookCoverEK = editionResponse.data;
                    searchService.getBookByIsbn(bookCoverEK.isbn_10).then(isbnResponse => {
                        const bookISBN = isbnResponse.data;
                        const bookCover = bookISBN[`ISBN:${bookCoverEK.isbn_10}`]?.cover?.medium ? bookISBN[`ISBN:${bookCoverEK.isbn_10}`]?.cover?.medium : noCoverImg;
                        const newBook = {
                            cover: bookCover,
                            title: book.title,
                            year: book.first_publish_year,
                            author: book.author_name ? book.author_name[0] : 'Unknown author',
                            place: book.publish_place,
                            editionId: book.edition_key,
                            editionName: [],
                        }
                        let bookCacheCopy = {...bookCache};
                        bookCacheCopy[index] = newBook;
                        getEditions(bookCacheCopy, index, panel);
                    });
                });
            } else {
                const newBook = {
                    cover: noCoverImg,
                    title: book.title,
                    year: book.first_publish_year,
                    author: book.author_name ? book.author_name[0] : 'Unknown author',
                    place: book.publish_place,
                    editionId: book.edition_key,
                    editionName: [],
                }
                let bookCacheCopy = {...bookCache};
                bookCacheCopy[index] = newBook;
                getEditions(bookCacheCopy, index, panel);
            }
        }
    };

    useEffect(() => {
        setBookCache({});
        setExpanded(false);
    }, [props.data]);

    return (
        <BookListContainer>
            {props.data.docs.map((book, i) =>
                <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`, book, i)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{book.title}</Typography>
                        <Typography className={classes.secondaryHeading}>{book.author_name ? book.author_name[0] : ''}</Typography>
                    </AccordionSummary>

                    {bookCache[i] && expanded && <AccordionDetails>
                        <BookContent>
                            <BookCover>
                                <img src={bookCache[i].cover} alt={bookCache[i].title}/>
                            </BookCover>
                            <BookInfo>
                                <div className='basic'>
                                    <h1>{bookCache[i].title} {bookCache[i].year &&`(${bookCache[i].year})`}</h1>
                                    <h4 className={bookCache[i].author === 'Unknown author' ? 'italic' : ''}>
                                        {bookCache[i].author}
                                    </h4>
                                    <p>
                                        {bookCache[i].place &&
                                        bookCache[i].place.map((item, i) => <span key={i}>{ (i ? ', ' : '') + item }</span> )}
                                    </p>
                                </div>

                                <div className='editions'>
                                    <h4>Editions:</h4>
                                    {bookCache[i].editionName.map((item, e) =>
                                        <li key={e}>
                                            <a href={`https://openlibrary.org/books/${bookCache[i].editionId[e]}`} target="_blank" rel="noreferrer">{item}</a>
                                        </li>
                                    )}
                                </div>
                            </BookInfo>
                        </BookContent>
                    </AccordionDetails>}
                </Accordion>
            )}
        </BookListContainer>
    )
}

export default BookList