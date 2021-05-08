
import { useState} from "react";
import {Tabs, Card, Layout, Badge} from '@shopify/polaris';

import {EmptyStates} from '../EmptyStates'


export const Tab = ({ movies, nominatedMovieItems, movieListMarkup, nominationsMarkup }) => {
  const [selected, setSelected] = useState(0);

  //select Tab
  const handleTabChange = (selectedTabIndex) =>{
    setSelected(selectedTabIndex);
  };

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
      contentMarkUp:  movies.length > 0 ? movieListMarkup : <EmptyStates heading={'Search for your favorite movie by name.'} subheading={'The search result will appear here'} image='https://cdn.shopify.com/s/files/1/2506/6936/files/movies-empty-state.svg?v=1609784787' />,
      accessibilityLabel: 'Movies',
      panelID: 'movies-fitted-content-2',
    },
    {
      id: 'nomination-fitted-2',
      title: 'Nomination',
      content: (
        <span>
          Nomination{" "}
          <Badge status="new">{nominatedMovieItems ? nominatedMovieItems.length : 0}</Badge>
        </span>
      ),
      contentMarkUp:  nominatedMovieItems.length > 0 ? nominationsMarkup : <EmptyStates heading={'Nominate a movie and it will show up here.'} subheading={'The search result will appear here'} image='https://cdn.shopify.com/s/files/1/2506/6936/files/nomination-empty-state-2.svg?v=1609785285' />,
      panelID: 'nomination-fitted-Ccontent-2',
    },
  ];

  return (
    <Tabs key={tabs[selected].id} tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
      <Card.Section title={tabs[selected].title}>
      <Layout>
        {tabs[selected].contentMarkUp}
      </Layout>
      </Card.Section>
    </Tabs>
  )
}
