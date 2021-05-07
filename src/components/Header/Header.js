import './Header.css'
import {TopBar} from '@shopify/polaris';
export const Header = ({children}) => {
  return (
    <header>
      <TopBar theme={'https://cdn.shopify.com/s/files/1/2506/6936/files/shoppies-logo.svg?v=1609786867'} />
    </header>
  )
}
