import {Banner, List} from '@shopify/polaris';
import './SuccessBanner.css'
export const SuccessBanner = () => {
  return (
    <Banner
      title="You have nominated 5 movies."
      status="success"
    >
      <List>
        <List.Item>
          You are only allowed a maximum of 5 nominations.
        </List.Item>
        <List.Item>
          You can go to the nomination tab to review or replace your nominees
        </List.Item>
      </List>
    </Banner>
  )
}
