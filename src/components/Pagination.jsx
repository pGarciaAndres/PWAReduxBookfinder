import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ForwardIcon from '@material-ui/icons/Forward';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { decPage, incPage } from '../store/actions';

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
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const pageCounter = useSelector(state => state.page);;

    const prevPage = () => {
        dispatch(decPage());
    }
    const nextPage = () => {
        dispatch(incPage());
    }

    return (
        <PaginationContainer>
            <IconButton disabled={pageCounter === 1} className="rotate" onClick={() => prevPage()}>
                <ForwardIcon fontSize="large"/>
            </IconButton>
            <span className="pageNumber">{`${pageCounter} / ${data.pages}`}</span>
            <IconButton disabled={pageCounter === data.pages} onClick={() => nextPage()}>
                <ForwardIcon fontSize="large"/>
            </IconButton>
        </PaginationContainer>
    )
}

export default Pagination