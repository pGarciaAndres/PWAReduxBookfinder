import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';
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
`;

const SearchBox = props => {
    const [text, setText] = useState('');

    const search = () => {
        props.search(text);
    }

    return (
        <SearchContainer>
            <Input
                size='huge'
                icon={<Icon name='search' link onClick={() => search()}/>}
                placeholder='Search...'
                onChange={(e) => setText(e.target.value)}
            />
        </SearchContainer>
    )
}

export default SearchBox