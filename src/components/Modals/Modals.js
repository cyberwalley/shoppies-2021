import {Modal} from '@shopify/polaris';
import { MoreMovieDetails} from '../MoreMovieDetails';

export const Modals = ({ open, onClose, content}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={content ? content.title : ""}
      primaryAction={{
        content: "Close",
        onAction: () => {
          onClose()
        },
      }}
    >
      <Modal.Section>
        {content ? <MoreMovieDetails movie={content}  /> : null}
      </Modal.Section>
    </Modal>
  )
}
