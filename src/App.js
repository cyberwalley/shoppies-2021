import './Variables.css';
import {Header} from './components/Header'
import {Main} from './components/Main'
import {Footer} from './components/Footer'
import {Search} from './components/Search'
import {Tab} from './components/Tab'
import { useState} from "react";
import debounce from 'lodash.debounce';
import {Page, Card} from '@shopify/polaris';
import React from 'react'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState("");

  // search and debounce
  const updateValue = (newValue) =>{
    setInputValue(newValue);
    debouncedSearch(newValue);
  }

  const debouncedSearch = React.useMemo(
    () => debounce(newValue => { setSearchValue(newValue)}, 850), []
  )

  return (
    <div className="site-wrapper">
      <Header />
      <Main>
        <Search value={inputValue} onChange={(event) => updateValue(event)}/>
        <Page>
          <Card sectioned>
            <Tab searchValue={searchValue}/>
          </Card>
        </Page>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
