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
    .bookContent {
        display: inline-flex;
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
            h4 {
                margin-top: 10px;
                margin-bottom: 3px;
            }
            .italic {
                font-style: italic;
            }
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

let bookCache = {};

const BookList = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(null);

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
                            editions: book.edition_key,
                        }
                        bookCache[index] = newBook;
                        setExpanded(panel);
                    });
                });
            } else {
                const newBook = {
                    cover: noCoverImg,
                    title: book.title,
                    year: book.first_publish_year,
                    author: book.author_name ? book.author_name[0] : 'Unknown author',
                    place: book.publish_place,
                    editions: book.edition_key,
                }
                bookCache[index] = newBook;
                setExpanded(panel);
            }
        }
    };

    useEffect(() => {
        bookCache = {};
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
                        <div className='bookContent'>
                            <div className='bookCover'>
                                <img src={bookCache[i].cover} alt={bookCache[i].title}/>
                            </div>
                            <div className='bookInfo'>
                                <h1>{bookCache[i].title} {bookCache[i].year &&`(${bookCache[i].year})`}</h1>
                                <h4 className={bookCache[i].author === 'Unknown author' ? 'italic' : ''}>
                                    {bookCache[i].author}
                                </h4>
                                <p>{bookCache[i].place &&
                                    bookCache[i].place.map((item, i) => {
                                        return <span key={i}>{ (i ? ', ' : '') + item }</span>;
                                    })}
                                </p>
                            </div>
                        </div>
                    </AccordionDetails>}
                </Accordion>
            )}
        </BookListContainer>
    )
}

export default BookList