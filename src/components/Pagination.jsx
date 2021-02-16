import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ForwardIcon from '@material-ui/icons/Forward';

const PaginationContainer = styled.div`
    margin: 20px auto 10px auto;
    text-align: center;
    button {
        color: white;
        &.rotate {
            transform: rotate(180deg);
        }
        &.Mui-disabled {
            color: #ffffff63;
        }
    }
    .pageNumber {
        padding: 0 3em;
        float: inherit;
        text-align: left;
        color: white;
        font-weight: 600;
    }
`;

const Pagination = props => {
    const pageCounter = props.data.start === 0 ? 1 : props.data.start/100 + 1;
    const prevDisabled = () => {
        return pageCounter === 1;
    }
    const nextDisabled = () => {
        return pageCounter === props.data.pages;
    }

    return (
        <PaginationContainer>
            <IconButton disabled={prevDisabled()} className="rotate" onClick={() => props.search(pageCounter-1)}>
                <ForwardIcon fontSize="large"/>
            </IconButton>
            <span className="pageNumber">{`${pageCounter} / ${props.data.pages}`}</span>
            <IconButton disabled={nextDisabled()} onClick={() => props.search(pageCounter+1)}>
                <ForwardIcon fontSize="large"/>
            </IconButton>
        </PaginationContainer>
    )
}

export default Pagination