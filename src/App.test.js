import React from "react";
import './setupTest.js'
import { shallow, mount } from 'enzyme';
import {Search} from './components/Search'
import toJson from 'enzyme-to-json';
import App from './App';
import {Tab} from './components/Tab'

const movieData = {
  id: 'imdbID',
  year: 'Year',
  title: 'Title',
  image: 'Poster',
}

describe('rendering components', ()=> {
  it("renders App without crashing", () => {
    shallow(<App />);
  });
  /* it("renders App component header without crashing", () => {
    const wrapper = shallow(<App />);
    const header = <h1>Nominate your favorite movies</h1>;
    expect(wrapper.contains(header)).toEqual(true);
  }); */
  it("renders Search component without crashing", () => {
    shallow(<Search />);
  });
}); 

