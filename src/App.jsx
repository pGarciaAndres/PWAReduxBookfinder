import React, { useState } from 'react';
import LoadingAnimation from './components/LoadingAnimation.jsx';
import SearchBox from './components/SearchBox.jsx';
import BookList from './components/BookList.jsx';
import Pagination from './components/Pagination.jsx';
import styled from 'styled-components';
import book from './images/book.png';
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
`;

const Welcome = styled.div`
  color: white;
  text-align: center;
  letter-spacing: 10px;
  font-size: 36px;
  font-family: ui-sans-serif;
  margin-top: 3em;
  @media (max-width: 500px) {
    font-size: 20px;
  }
  img {
    width: 300px;
    display: block;
    margin: 2em auto;
    filter: brightness(100);
    @media (max-width: 500px) {
      width: 200px;
    }
  }
`;

const App = () => {
  const welcomeText = '.BOOK FINDER.';
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [data, setData] = useState({
    docs: [],
    pages: 0,
  });

  // Search Book
  const search = async(page, text) => {
    setLoading(true);
    const textToFind = text === undefined ? searchText : text;
    setSearchText(textToFind);
    const response = await searchService.getBooksByText(page, textToFind);
    setData({
      start: response.start,
      docs: response.docs,
      pages: response.numFound % 100 === 0 ? response.numFound/100 : parseInt(response.numFound/100 + 1),
    });

    setLoading(false);
  }

  return (
    <AppContainer>
      <SearchBox search={search}/>
      {!loading && data.pages === 0 &&
        <Welcome>
          {welcomeText}
          <img src={book} alt={'BOOK FINDER'}/>
        </Welcome>}
      {data.pages > 0 && <Pagination data={data} search={search}/>}
      {loading ? <LoadingAnimation/> : <BookList data={data}/>}
    </AppContainer>
  );
}

export default App;
