import { Card, Button, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { BsTrash } from "react-icons/bs";

import { UserContext } from '../Contexts/UserContext';

function Review(props) {
  const { userId } = useContext(UserContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const closeDeleteModal = () => setShowConfirmDelete(false);

  const handleDeleteConfirmed = () => {
    props.onDelete();
    closeDeleteModal();
  }

  return (
    <Card bg="secondary" text="white" style={{ margin: "0.5rem", position: "relative" }}>
      <Card.Body>
        <Card.Title>{props.Name}</Card.Title>
        <Card.Subtitle className="text-muted">
          Reviewed by {props.username === userId ? "me" : props.username}
        </Card.Subtitle>
        <Card.Text>
          ID: {props.review_id} <br />
          Overall: {props.overall_score} <br />
          Taste: {props.taste_score} <br />
          Appearance: {props.appearance_score} <br />
          Aroma: {props.aroma_score} <br />
          Palette: {props.palette_score} <br />
        </Card.Text>

        {props.username === userId && (
          <BsTrash
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "1.3rem",
              color: "red"
            }}
            onClick={() => setShowConfirmDelete(true)}
          />
        )}
      </Card.Body>

      <Modal show={showConfirmDelete} onHide={closeDeleteModal} centered>
        <Modal.Body>
          Are you sure that you want to delete this review?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}> Cancel </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed} > Delete </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default Review;