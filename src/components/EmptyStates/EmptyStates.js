import {EmptyState} from '@shopify/polaris';
import './EmptyStates.css'
export const EmptyStates = ({heading, subheading, image }) => {
  return (
    <EmptyState
      heading={heading}
      image={image}
    >
      <p>{subheading}</p>
    </EmptyState>
  )
}
