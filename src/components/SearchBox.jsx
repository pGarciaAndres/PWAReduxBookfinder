import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';

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
    const [text, setText] = useState('');
    const [searchBy, setSearchBy] = useState('q');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    const search = () => {
        props.search(1, text, searchBy);
    }

    return (
        <SearchContainer>
            <Input
                size='huge'
                icon={<Icon name='search' link onClick={() => search()} />}
                placeholder='Search for books...'
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <RadioGroup row defaultValue="q" onChange={(e) => setSearchBy(e.target.value)}>
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