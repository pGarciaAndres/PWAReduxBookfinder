import React, { useState, useEffect } from 'react';
import LoadingAnimation from './components/LoadingAnimation.jsx';
import SearchBox from './components/SearchBox.jsx';
import BookList from './components/BookList.jsx';
import Pagination from './components/Pagination.jsx';
import styled from 'styled-components';
import book from './images/book.png';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setData } from './store/actions';
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
  const dispatch = useDispatch();
  const welcomeText = '.BOOK FINDER.';
  const [loading, setLoading] = useState(false);
  const data = useSelector(state => state.data);
  const page = useSelector(state => state.page);
  const searchText = useSelector(state => state.text);
  const searchMethod = useSelector(state => state.method);

  const search = async() => {
    setLoading(true);
    const response = await searchService.getBooksByInput(page, searchText, searchMethod);
    dispatch(
      setData({
        start: response.start,
        docs: response.docs,
        pages: response.numFound % 100 === 0 ? response.numFound/100 : parseInt(response.numFound/100 + 1),
      })
    );
    setLoading(false);
  }

  useEffect(() => {
    if (page) {
      search();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <AppContainer>
      <SearchBox search={search}/>
      {data.pages === 0 && !loading &&
        <Welcome>
          {welcomeText}
          <img src={book} alt={'BOOK FINDER'}/>
        </Welcome>}
      { data.pages > 0 && <Pagination /> }
      { data.pages > 0 && !loading && <BookList /> }
      { loading && <LoadingAnimation/> }
    </AppContainer>
  );
}

export default App;
