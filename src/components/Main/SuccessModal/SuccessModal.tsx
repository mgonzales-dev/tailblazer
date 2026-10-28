import {Modal, Button} from "react-bootstrap";

function SuccessModal({
                        show,
                        onClose,
                      }: {
  show: boolean;
  onClose: () => void;
}) {
  return (
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <p>Your lost animal report has been successfully submitted.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={onClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default SuccessModal;