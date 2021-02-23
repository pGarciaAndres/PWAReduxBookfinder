import React from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import styled from 'styled-components';
import { useSelector } from "react-redux";

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
        @media (max-width: 700px) {
            width: 100%;
            h1 {
                font-size: 1.3rem;
            }
        }
    }
    .editions {
        float: right;
        margin-left: 1em;
        width: 36%;
        margin-top: 1em;
        
        @media (max-width: 700px) {
            float: left;
            margin-left: 0em;
            width: auto;
            margin-top: 0em;
        }
    }
`;

const BookDetails = props => {
    const cachedBooks = useSelector(state => state.cachedBooks);
    const {
        cover,
        title,
        author,
        place,
        year,
        editionId,
        editionName,
    } =  cachedBooks[props.index];

    return (
            <AccordionDetails>
                <BookContent>
                    <BookCover>
                        <img src={cover} alt={title}/>
                    </BookCover>
                    <BookInfo>
                        <div className='basic'>
                            <h1>{title} {year &&`(${year})`}</h1>
                            <h4 className={author === 'Unknown author' ? 'italic' : ''}>
                                {author}
                            </h4>
                            <p>
                                {place &&
                                place.map((item, i) => <span key={i}>{ (i ? ', ' : '') + item }</span> )}
                            </p>
                        </div>

                        <div className='editions'>
                            <h4>Editions:</h4>
                            {editionName.map((item, e) =>
                                <li key={e}>
                                    <a href={`https://openlibrary.org/books/${editionId[e]}`} target="_blank" rel="noreferrer">{item}</a>
                                </li>
                            )}
                        </div>
                    </BookInfo>
                </BookContent>
            </AccordionDetails>
    )
}

export default BookDetails