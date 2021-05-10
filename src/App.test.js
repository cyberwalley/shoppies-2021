Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    onAction: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

import React from "react";
import './setupTest.js'
import { shallow, mount } from 'enzyme';

import toJson from 'enzyme-to-json';
import App from './App';
import {Header} from './components/Header'
import {Main} from './components/Main'
import {Footer} from './components/Footer'
import {Search} from './components/Search'
import {Tab} from './components/Tab'
import {MovieCard} from './components/MovieCard'
import {EmptyStates} from './components/EmptyStates'
import {MoreMovieDetails} from './components/MoreMovieDetails'
import {Skeleton} from './components/Skeleton'
import {Spinners} from './components/Spinners'
import {Modals} from './components/Modals'
import {SuccessBanner} from './components/Banners/SuccessBanner'
import {WarningBanner} from './components/Banners/WarningBanner'


const movieTitle= {
  movieOne: 'Dracula',
  movieTwo: 'Harry potter',
  movieThree: 'Spiderman'
}

describe('rendering components', ()=> {
  it("renders App without crashing", () => {
    shallow(<App />);
  });
  it("renders SuccessBanner without crashing", () => {
    shallow(<SuccessBanner />);
  });
  it("renders WarningBanner without crashing", () => {
    shallow(<WarningBanner />);
  });
  it("renders EmptyStates without crashing", () => {
    shallow(<EmptyStates />);
  });
  it("renders Footer without crashing", () => {
    shallow(<Footer />);
  });
  it("renders Header without crashing", () => {
    shallow(<Header />);
  });
  it("renders Main without crashing", () => {
    shallow(<Main />);
  });
  it("renders Modals without crashing", () => {
    shallow(<Modals />);
  });
  it("renders Search without crashing", () => {
    shallow(<Search />);
  });
  it("renders Skeleton without crashing", () => {
    shallow(<Skeleton />);
  });
  it("renders Spinners without crashing", () => {
    shallow(<Spinners />);
  });
  it("renders Tab without crashing", () => {
    shallow(<Tab />);
  });
}); 


describe('snapshots', ()=> {
  it("App snapshots", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("SuccessBanner snapshots", () => {
    const tree = shallow(<SuccessBanner />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("WarningBanner snapshots", () => {
    const tree = shallow(<WarningBanner />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("EmptyStates snapshots", () => {
    const tree = shallow(<EmptyStates />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Footer snapshots", () => {
    const tree = shallow(<Footer />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Header snapshots", () => {
    const tree = shallow(<Header />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Main snapshots", () => {
    const tree = shallow(<Main />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Modals snapshots", () => {
    const tree = shallow(<Modals />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Search snapshots", () => {
    const tree = shallow(<Search />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Skeleton snapshots", () => {
    const tree = shallow(<Skeleton />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Spinners snapshots", () => {
    const tree = shallow(<Spinners />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("Tab snapshots", () => {
    const tree = shallow(<Tab />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  
}); 

describe('passing props', ()=> {
  const tabWrapper = mount(<Tab searchValue={movieTitle} />);
   it("accepts movie data", () => {
    expect(tabWrapper.props().searchValue).toEqual(movieTitle);
  }); 
}); 