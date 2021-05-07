import './Variables.css';
import {Header} from './components/Header'
import {Main} from './components/Main'
import {Footer} from './components/Footer'
import {Search} from './components/Search'
import {Tab} from './components/Tab'
import {MovieCard} from './components/MovieCard'
import {Modals} from './components/Modals'
import {SuccessBanner} from './components/Banners/SuccessBanner'
import {WarningBanner} from './components/Banners/WarningBanner'
import { useState, useEffect } from "react";


import {Page, Card} from '@shopify/polaris';



function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movieItems, setMovieItems] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [movieId, setMovieId] = useState();
  const [modal, setModal] = useState(false);
  const [nominatedMovieItems, setNominatedMovieItems] = useState([]);
  const [successBanner, setSuccessBanner] = useState(false);
  const [warningBanner, setWarningBanner] = useState(false);

  const MAX_NOMINATIONS = 5;
  
  //const [nominatedMovieItems, setNominatedMovieItems] = useState([]);
  //const [modal, setModal] = useState(false);
  //const [modalContent, setModalContent] = useState();


  const handleModalChange = () => setModal(!modal);

  // map through data recieved to create an object out of it
  const movies = movieItems.map(({ Title, Poster, Year, imdbID }) => {
    return {
      id: imdbID,
      year: Year,
      title: Title,
      image: Poster,
      isNominated: nominatedMovieItems.some((movie) => movie.id === imdbID),
    };
  });


  
  const handleNominate = (movie) => {
    if (nominatedMovieItems.length < MAX_NOMINATIONS){
        setNominatedMovieItems((currentNominatedMovieItems) => [
          ...currentNominatedMovieItems,
          movie,
        ]);
    } else {
      setSuccessBanner((value) => (!value))
     
    }
    console.log(nominatedMovieItems, 'NominatedMovieItems')
    console.log(movies, 'movieItems')
  }; 

  const handleRemoveNomination = (movie) => {
    setNominatedMovieItems((currentNominatedMovieItems) =>
      currentNominatedMovieItems.filter(
        (nominatedMovie) => nominatedMovie.id !== movie.id
      )
    );
  };

   const apiSettings = {
    apiURL: "https://www.omdbapi.com/",
    apiKey: "dc6083ad",
    contentType: "movie",
  };
  
  const movieDataURL = `${apiSettings.apiURL}?type=${apiSettings.contentType}&apikey=${apiSettings.apiKey}`;
  //Get movie data 
  useEffect(() => {
    async function fetchMoviesData() {
      try {
        if (searchValue !== ""){
          const data = await fetch(
            `${movieDataURL}&s=${searchValue}`
          ).then((res) => res.json());
          if (data.Search) {
            console.log(data.Search)
            setMovieItems(data.Search);
          } else {
            setWarningBanner((value) => (!value))
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchMoviesData();
  }, [searchValue, movieDataURL]);

  
  //Get more data for more movie details. This call requires a movie ID to access more details about the movie
  useEffect(() => {
    async function fetchMovieData() {
      try {
        const data = await fetch(`${movieDataURL}&i=${movieId}`).then((res) =>
          res.json()
        );

        if (data) {
          const movie = {
            title: data.Title,
            image: data.Poster,
            genre: data.Genre,
            rated: data.Rated,
            director: data.Director,
            awards: data.Awards,
            plot: data.Plot,
            released: data.Released,
          };
          console.log(movie, 'megalooping')
          setModalContent(movie);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovieData();
  }, [movieDataURL, movieId]);

 

  const movieListMarkup = movies.map((movie) => {
   
    return (
      <MovieCard key={movie.id} movie={movie} portrait={true} openModal={modal}
        primaryAction = {{
          onAction: handleNominate,
          disabled:  false //({ isNominated }) => movie.isNominated,
          //primary: () => true,
          //content: () => 'Nominate',
        }}
        secondaryAction={{
          onAction: () => {
            setMovieId(movie.id); 
            setModal(true);
          },
          //content: () => 'More info',
        }} />
    );
  });

  const nominationsMarkup = nominatedMovieItems.map((nominatedMovie) => {
    return (
      <MovieCard  movie={nominatedMovieItems} portrait={true} openModal={modal}
      primaryAction = {{
        onAction: handleRemoveNomination,
        disabled: () => false,
        primary: () => true,
        label: 'Remove',
      }}
      secondaryAction={{
        onAction: () => {
          setMovieId(nominatedMovie.id); 
          setModal(true);
        },
        label: 'More info'
      }} />
    );
  });

  return (
    <div className="site-wrapper">
      <Header />
      <Main>
        <Search value={searchValue} onChange={(event) => setSearchValue(event)} />
        <Page>
          {successBanner ? <SuccessBanner /> : null}
          {warningBanner ? <WarningBanner searchTerm={`Sorry we couldn't find any results matching "${searchValue}"`} /> : null}
          <Card sectioned>
            <Tab movies={movies} nominatedMovieItems={nominatedMovieItems} nominationsMarkup={nominationsMarkup} movieListMarkup={movieListMarkup}  /*nominatedMovieItems={nominatedMovieItems} openModal={modal}*/ />
            <Modals open={modal} onClose={handleModalChange} content={modalContent}  />
          </Card>
        </Page>
      </Main>
      <Footer />
    </div>
    
  );
}

export default App;
