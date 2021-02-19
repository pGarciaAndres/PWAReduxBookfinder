import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import BookDetails from './BookDetails.jsx';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import noCoverImg from '../images/noCover.gif';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCachedBooks, clearCache } from '../store/actions';
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
    const data = useSelector(state => state.data);
    const cachedBooks = useSelector(state => state.cachedBooks);
    
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openPanel, setOpenPanel] = useState(null);

    const getEditions = (books, bookIndex, panel) => {
        books[bookIndex].editionId.map(async (ed, edIndex) => {
            const edRes = await searchService.getBookByEditionKey(ed, books, bookIndex, edIndex);
            const bookEK = edRes.data;
            const editionTitle = bookEK.title ? bookEK.title : 'Unknown title';
            const editionDate = bookEK.publish_date ? bookEK.publish_date : 'Unknown date';
            books[bookIndex].editionName[edIndex] = `${editionTitle} - ${editionDate}`;
            if (edIndex === books[bookIndex].editionId.length - 1) {
                dispatch(setCachedBooks(books));
                setOpenPanel(panel);
            }
        });
    }

    const handleChange = (panel, book, index) => async(event, isExpanded) => {
        if (cachedBooks[index]) {
            setOpenPanel(isExpanded && panel);
        }
        if (isExpanded && !cachedBooks[index]) {
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
                        let bookCacheCopy = {...cachedBooks};
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
                let bookCacheCopy = {...cachedBooks};
                bookCacheCopy[index] = newBook;
                getEditions(bookCacheCopy, index, panel);
            }
        }
    };

    useEffect(() => {
        dispatch(clearCache());
        setOpenPanel(false);
    }, [data, dispatch]);

    return (
        <BookListContainer>
            {data.docs.map((book, i) =>
                <Accordion key={i} expanded={openPanel === `panel${i}`} onChange={handleChange(`panel${i}`, book, i)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{book.title}</Typography>
                        <Typography className={classes.secondaryHeading}>{book.author_name ? book.author_name[0] : ''}</Typography>
                    </AccordionSummary>

                    {cachedBooks[i] && openPanel && 
                    <BookDetails index={i}/>}
                </Accordion>
            )}
        </BookListContainer>
    )
}

export default BookList