import {MediaCard, Layout} from '@shopify/polaris';
import './MovieCard.css'
export const MovieCard = ({
  portrait,
  secondaryAction: { onAction: onSecondaryAction, content: secondaryLabel },
  primaryAction: { onAction: onPrimaryAction, content: primaryLabel, primary: primaryBtn, disabled: primaryDisabled },
  movie }) => {
  const UNAVAILABLE_IMAGE = "https://cdn.shopify.com/s/files/1/2506/6936/files/image-unavailable.svg?v=1609864912";
  const { title, image, year, id, isNominated } = movie;
  return (
    <Layout.Section oneThird>
      <MediaCard
        id={id}
        title={title}
        primaryAction={{
          content: primaryLabel(movie),
          onAction: () => onPrimaryAction(movie),
          primary: primaryBtn(movie),
          disabled: primaryDisabled(movie)
        }}
        secondaryAction={{
          content: 'more',// secondaryLabel(movie),
          onAction: () => onSecondaryAction(movie),
        }}
        description={year}
        portrait={portrait}
      >
        <img
          alt={title}
          width="100%"
          height="320px"
          style={{objectFit: 'cover', objectPosition: 'center'}}
          src={image === 'N/A' ? UNAVAILABLE_IMAGE : image}
        />
      </MediaCard>
    </Layout.Section>
  )
}
