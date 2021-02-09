import React, { useState } from 'react';
import SearchBox from './components/SearchBox.jsx';
import BookList from './components/BookList.jsx';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

// Services
import searchService from './services/searchService';

const AppContainer = styled.div`
  float: left;
  width: 100%;
  
  @media (max-width: 800px) {
    width: 100%;
  }
`

const App = () => {
  const [data, setData] = useState({
    numFound: 0,
    docs: []
  });

  // Search Book
  const search = async(text) => {
    const response = await searchService.getBooksByText(text);
    setData(response);
  }

  return (
    <AppContainer>
      <SearchBox search={search}/>
      <BookList data={data}/>
    </AppContainer>
  );
}

export default App;
