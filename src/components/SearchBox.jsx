import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setInputText, setSearchMethod, resetPage } from '../store/actions';

const SearchContainer = styled.div`
    width: 85%;
    max-width: 600px;
    margin: 60px auto 10px auto;
    @media (max-width: 800px) {
        margin-top: 15px;
    }
    .input {
        width: 100%;
    }
    .MuiRadio-root {
        color: rgb(255 255 255 / 90%);
    }
    .MuiFormControlLabel-label {
        color: white;
    }
`;

const SearchBox = props => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = () => {
        if (page === 1) {
            props.search();
        } else {
            dispatch(resetPage());
        }
    }

    return (
        <SearchContainer>
            <Input
                size='huge'
                icon={<Icon name='search' link onClick={() => handleSearch()} />}
                placeholder='Search for books...'
                onChange={(e) => dispatch(setInputText(e.target.value))}
                onKeyDown={handleKeyDown}
            />
            <RadioGroup row defaultValue="q" onChange={(e) => dispatch(setSearchMethod(e.target.value))}>
                <FormControlLabel
                    value="q"
                    control={<Radio color="default"/>}
                    label="All"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="author"
                    control={<Radio color="default"/>}
                    label="Author"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="title"
                    control={<Radio color="default"/>}
                    label="Title"
                    labelPlacement="start"
                />
            </RadioGroup>
        </SearchContainer>
    )
}

export default SearchBox