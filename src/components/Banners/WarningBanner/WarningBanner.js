import {Banner, List} from '@shopify/polaris';
import './WarningBanner.css'
export const WarningBanner = ({searchTerm}) => {
  return (
    <Banner
      title={searchTerm}
      status="warning"
    >
      <List>
        <List.Item>
          Check your spelling and try again.
        </List.Item>
      </List>
    </Banner>
  )
}
