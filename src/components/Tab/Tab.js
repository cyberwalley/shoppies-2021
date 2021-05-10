
import { useState, useEffect} from "react";
import {Tabs, Card, Layout, Badge} from '@shopify/polaris';
import {Skeleton} from '../Skeleton'
import {EmptyStates} from '../EmptyStates'
import {AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import {MovieCard} from '../MovieCard'
import {Modals} from '../Modals'
import {SuccessBanner} from '../Banners/SuccessBanner'
import {WarningBanner} from '../Banners/WarningBanner'

export const Tab = ({ searchValue }) => {
  const [movieItems, setMovieItems] = useState([]);
  const [nominatedMovieItems, setNominatedMovieItems] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successBanner, setSuccessBanner] = useState(false);
  const [warningBanner, setWarningBanner] = useState(false);
  const [movieId, setMovieId] = useState();
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [spinning, setSpinning] = useState(false);
  
  const MAX_NOMINATIONS = 5;

  // pulls movies from local storage
  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem('nominations'));
   
    if (localStorageItems) {
      setNominatedMovieItems(localStorageItems);
      setSuccessBanner((value) => (!value))
      if (localStorageItems.length === MAX_NOMINATIONS){
        setSuccessBanner((value) => (!value))
       
      }else{
        setNominatedMovieItems(localStorageItems);
        setSuccessBanner((value) => (!value))
      }

    }
}, [setNominatedMovieItems,MAX_NOMINATIONS])

// Saves resultsArray to local storage
 useEffect(() => {
  localStorage.setItem('nominations', JSON.stringify(nominatedMovieItems))

}, [nominatedMovieItems])

 useEffect(() => {
  localStorage.setItem('nominations', JSON.stringify(nominatedMovieItems));
      const localStorageItems = JSON.parse(localStorage.getItem('nominations'));
      if (localStorageItems.length === MAX_NOMINATIONS){
        setSuccessBanner((value) => (!value))
      }

}, [nominatedMovieItems, MAX_NOMINATIONS])

  //Callback functions
  //nominate movie
  const handleNominate = (movie) => {
    if (nominatedMovieItems.length > MAX_NOMINATIONS){
      setSuccessBanner(() => true)
    }else  {
      setNominatedMovieItems((currentNominatedMovieItems) => [
        ...currentNominatedMovieItems,
        movie,
      ]);
      localStorage.setItem('nominations', JSON.stringify(nominatedMovieItems));
      const localStorageItems = JSON.parse(localStorage.getItem('nominations'));
      if (localStorageItems.length === MAX_NOMINATIONS){
        setSuccessBanner((value) => (!value))
      }
    }
  };

  //delete nominee
  const handleRemoveNomination = (movie) => {
    setNominatedMovieItems((currentNominatedMovieItems) =>
      currentNominatedMovieItems.filter(
        (nominatedMovie) => nominatedMovie.id !== movie.id
      )
    );
    localStorage.setItem('nominations', JSON.stringify(nominatedMovieItems))
      setSuccessBanner((value) => (!value))
      if (nominatedMovieItems.length < MAX_NOMINATIONS){
        setSuccessBanner((value) => (!value))
      }
  };

   //select Tab
   const handleTabChange = (selectedTabIndex) =>{
    setSelected(selectedTabIndex);
  };

  //Open Modal
  const handleModalChange = () => setModal(!modal);
 
  const apiSettings = {
    apiURL: "https://www.omdbapi.com/",
    apiKey: "dc6083ad",
    contentType: "movie",
  };

  //Get Movies for movie tab - 1: Get movie data 
  const movieDataURL = `${apiSettings.apiURL}?type=${apiSettings.contentType}&apikey=${apiSettings.apiKey}`;
  useEffect(() => {
    async function fetchMoviesData() {
      try {
        if (searchValue !== ""){
          
          setLoading((value)=>(!value))
          const data = await fetch(
            `${movieDataURL}&s=${searchValue}`
          )
          .then((res) => res.json())
          .finally(() => {
            setLoading((value)=>(!value))
          })
          if (data.Search) {
            setWarningBanner(() => false)
            setMovieItems(data.Search);
          } else {
            //display warning message if search keyword is invalid or not found
            setWarningBanner((value) => (!value))
          }
        }
      } catch (error) {
        console.log(error);
      } 
    }
  
    fetchMoviesData();
  }, [searchValue, movieDataURL]);

  //Get Movies for movie tab - 2: Map through data and store in an object
  const movies = movieItems.map(({ Title, Poster, Year, imdbID }) => {
    return {
      id: imdbID,
      year: Year,
      title: Title,
      image: Poster,
      isNominated: nominatedMovieItems.some((movie) => movie.id === imdbID),
    };
  });

  //Get Movies for movie tab - 3: Map through object for every MovieCard component then store in a markup variable
  const movieListMarkup = movies.map((movie) => {
    return (
      <MovieCard key={movie.id} movie={movie} portrait={true} openModal={modal}
        primaryAction = {{
          onAction: handleNominate,
          disabled: ({ isNominated }) => isNominated || nominatedMovieItems.length === MAX_NOMINATIONS,
          primary: () => true,
          content: ({ isNominated }) => (isNominated ? "Nominated" : "Nominate"),
        }}
        secondaryAction={{
          onAction: () => {
            setMovieId(movie.id); 
            setModal(() => true);
          },
          content: () => 'More info',
        }} />
    );
  });
 
  //Get Nominated movies for nomination tab - 1: Map through object for every MovieCard component then store in a markup variable
  const nominationsMarkup =  nominatedMovieItems.map((nominatedMovie) => {
    return (
      <MovieCard movie={nominatedMovie} portrait={true} openModal={modal}
      primaryAction = {{
        onAction: handleRemoveNomination,
        disabled: () => false,
        primary: () => true,
        content: () => 'remove',
      }}
      secondaryAction={{
        onAction: () => {
          setMovieId(nominatedMovie.id); 
          setModal(true);
        },
        content: () => 'More info',
      }} />
    );
  });

   //Get Movies for Modal 1 - Get more data for more movie details. This call requires a movie ID to access more details about the movie
   useEffect(() => {
    async function fetchMovieData() {
      try {
        setSpinning((value)=>(!value))
        const data = await fetch(`${movieDataURL}&i=${movieId}`)
        .then((res) =>
          res.json()
        ).finally(() => {
          setSpinning((value)=>(!value))
        })
        
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
          setModalContent(movie);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovieData();
  }, [movieDataURL, movieId]);

 //Tabbed items - movies & nomination
 const tabs = [
  {
    id: 'movies-fitted-2',
    title: 'Movies',
    content: (
      <span>
        Movies{" "}
        <Badge status="new">{movies ? movies.length : 0}</Badge>
      </span>
    ),
    contentMarkUp:  movies && movies.length > 0 ? movieListMarkup : <EmptyStates heading={'Search for your favorite movie by name.'} subheading={'The search result will appear here.'} image='https://cdn.shopify.com/s/files/1/2506/6936/files/movies-empty-state.svg?v=1609784787' />,
    accessibilityLabel: 'Movies',
    panelID: 'movies-fitted-content-2',
  },
  {
    id: 'nomination-fitted-2',
    title: 'Nomination',
    content: (
      <span>
        Nomination{" "}
        <Badge status="new">{nominatedMovieItems && nominatedMovieItems ? nominatedMovieItems.length : 0}</Badge>
      </span>
    ),
    contentMarkUp:  nominatedMovieItems && nominatedMovieItems.length > 0 ? nominationsMarkup : <EmptyStates heading={'Nominate a movie and it will show up here.'} subheading={'Nominate a movie and it will show up here.'} image='https://cdn.shopify.com/s/files/1/2506/6936/files/nomination-empty-state-2.svg?v=1609785285' />,
    panelID: 'nomination-fitted-Ccontent-2',
  },
];
  
  return (
    <AppProvider i18n={enTranslations}>
      {successBanner ? <SuccessBanner /> : null}
      {warningBanner ? <WarningBanner searchTerm={`Sorry we couldn't find any results matching "${searchValue}"`} /> : null}
      <Tabs key={tabs[selected].id} tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <Card.Section title={tabs[selected].title}>
          {loading ? <Skeleton /> : <Layout>{tabs[selected].contentMarkUp}</Layout>}
        </Card.Section>
      </Tabs>
      <Modals open={modal} onClose={handleModalChange} content={modalContent} spinning={spinning}  />
    </AppProvider>
  )
}
