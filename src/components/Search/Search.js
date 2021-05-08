import './Search.css';
import {Layout, TextField, Icon, Page, Heading} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';

export const Search = ({ value, onChange}) => {
  return (
    <div className="hero-wrapper">
      <Layout sectioned={true}>
        <Page>
          <Heading element="h1">Nominate your favorite movies</Heading>
          <p className="mega-subtitle">Popular keywords: Harry potter, Dracula, Spiderman...</p>
          <TextField style={{height: '225px'}}
          prefix={<Icon source={SearchMinor} color="base" />}
          placeholder="Type movie title here..."
          autoComplete={false}
          inputMode="text"
          type="search"
          value={value}
          onChange={onChange}
          />
      </Page>
    </Layout>
    </div>
  )
}
