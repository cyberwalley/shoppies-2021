import { Modal } from '@shopify/polaris';
import { MoreMovieDetails } from '../MoreMovieDetails';
import { Spinners } from '../Spinners';

export const Modals = ({ open, onClose, content, spinning}) => {
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
        {spinning ? <Spinners /> : content && <MoreMovieDetails movie={content}  />}
      </Modal.Section>
    </Modal>
  )
}
