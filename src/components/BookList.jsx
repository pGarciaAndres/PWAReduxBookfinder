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
    margin: 30px auto 10px auto;
    @media (max-width: 800px) {
        margin-top: 10px;
    }
    .input {
        width: 100%;
    }
    .bookCover {
        width: 100px;
        min-height: 140px !important;
        margin-right: 1em;
        img {
            width: 100%;
        }
    }
    .bookInfo {
        color: grey;
        h1 {
            margin-bottom: 3px;
        }
        p.unknown {
            font-style: italic;
        }
    }
`;

const useStyles = makeStyles((theme) => ({
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
    const [expanded, setExpanded] = useState(false);
    const [bookDetails, setBookDetails] = useState(null);
    
    const getAllBookEditions = async(book) => {
        return Promise.all(book.edition_key.map(i => searchService.getBookByEditionKey(i)));
    }

    const handleChange = (panel, book) => async(event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setBookDetails(null);
        const coverEditionKey = book.cover_edition_key;
        let bookCover = '';
        if(coverEditionKey) {
            const bookCoverEK = coverEditionKey ? await searchService.getBookByEditionKey(coverEditionKey) : '';
            const bookISBN = await searchService.getBookByIsbn(bookCoverEK.isbn_10);
            bookCover = bookISBN[`ISBN:${bookCoverEK.isbn_10}`]?.cover?.medium ? bookISBN[`ISBN:${bookCoverEK.isbn_10}`]?.cover?.medium : noCoverImg;
        } else {
            bookCover = noCoverImg;
        }
        
        getAllBookEditions(book).then(bookEditions => {
            setBookDetails({
                title: book.title,
                author: book.author_name ? book.author_name[0] : 'Unknown author',
                cover: bookCover,
                url: book.edition_key.map((i) => `https://openlibrary.org/books/${i}`),
                publishDate: bookEditions.map(edition => edition.publish_date)
            });
        });
    };

    useEffect(() => {
        setBookDetails(null);
        setExpanded(false);
    }, [props.data]);

    return (
        <BookListContainer>
            {props.data.docs.map((book, i) =>
                <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`, book)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{book.title}</Typography>
                        <Typography className={classes.secondaryHeading}>{book.author_name ? book.author_name[0] : ''}</Typography>
                    </AccordionSummary>

                    {bookDetails && 
                    <AccordionDetails>
                        <div className='bookCover'>
                            <img src={bookDetails.cover} alt={bookDetails.title}/>
                        </div>
                        <div className='bookInfo'>
                            <h1>{bookDetails.title}</h1>
                            <p className={bookDetails.author === 'Unknown author' ? 'unknown' : ''}>
                                {bookDetails.author}
                            </p>
                        </div>
                    </AccordionDetails>}
                </Accordion>
            )}
        </BookListContainer>
    )
}

export default BookList