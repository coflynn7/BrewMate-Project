import { useState, useRef, useContext } from "react";
import { Modal, Button, Form, Alert, Toast, ToastContainer } from "react-bootstrap";
import api from '../../api/axios';
import { UserContext } from '../Contexts/UserContext';

function getFormattedDateTime() {
  const now = new Date();

  const pad = (num) => num.toString().padStart(2, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1); //months are 0-indexed
  const day = pad(now.getDate());

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function LeaveReviewModal({ show, handleClose, addToRecents }) {
  const [step, setStep] = useState(1);  //since this is a two part modal, track which step we're on
  const [beer, setBeer] = useState(null);
  const [error, setError] = useState(null);

  const { userId } = useContext(UserContext);

  const [showToast, setShowToast] = useState(false);

  const beerNameRef = useRef();

  const overallRef = useRef();
  const paletteRef = useRef();
  const aromaRef = useRef();
  const appearanceRef = useRef();
  const tasteRef = useRef();

  const findBeer = async () => {
    setError(null);

    try {

      api.get('/findBeer', {
        params: {
          beerName: beerNameRef.current.value
        }
      })
      .then((res) => {
        setBeer(res.data[0][0]);  //to do: rethink how to handle this 
        setStep(2);
      })
      .catch((err) => {
        if(err?.response.status === 404) {
          setError("No matching beer found. Please verify the spelling and try again.");
        }
        else{
          console.error('Error looking up the beer', err)
        }
      });
    } 
    catch {
      setError("Error finding beer. Please try again.");
    }
  };

  const submitReview = async () => {
    try {
      const res = await api.post('/addReview', { 
          beerId: beer.beer_id,
          beerName: beer.Name,
          userId: userId,
          timestamp: getFormattedDateTime(),
          overall: overallRef.current.value,
          palette: paletteRef.current.value,
          aroma: aromaRef.current.value,
          appearance: appearanceRef.current.value,
          taste: tasteRef.current.value
      });
      if(res.data.success) {
        addToRecents(res.data.review); //adds the new review to the recent reviews in the parent component
        setShowToast(true);
      }
    } 
    catch (error) {
      console.error("Error adding review:", error);
    }

    handleClose();
    setStep(1);
    setBeer(null);
    setError(null);
  };

  return ( <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <>
            <Form.Group className="mb-3" controlId="beerName">
              <Form.Label>Enter Beer Name</Form.Label>
              <Form.Control ref={beerNameRef}/>
            </Form.Group>
            <Button
              variant="primary"
              onClick={findBeer}
            >
              Find Beer
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
          </>
        )}

        {step === 2 && (
          <Form>
            <p> Reviewing beer: <strong>{beer.Name}</strong> </p>
            <Form.Group className="mb-3" controlId="overallScore">
              <Form.Label>Overall Score</Form.Label>
              <Form.Select ref={overallRef} defaultValue="">
                <option value="">Select rating</option>
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="paletteScore">
              <Form.Label>Palette Score</Form.Label>
              <Form.Select ref={paletteRef} defaultValue="">
                <option value="">Select rating</option>
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="aromaScore">
              <Form.Label>Aroma Score</Form.Label>
              <Form.Select ref={aromaRef} defaultValue="">
                <option value="">Select rating</option>
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="appearanceScore">
              <Form.Label>Appearance Score</Form.Label>
              <Form.Select ref={appearanceRef} defaultValue="">
                <option value="">Select rating</option>
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tasteScore">
              <Form.Label>Taste Score</Form.Label>
              <Form.Select ref={tasteRef} defaultValue="">
                <option value="">Select rating</option>
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </Form.Select>
            </Form.Group>
            )
            <Button variant="secondary" onClick={() => setStep(1)}>
              Change Beer
            </Button>{" "}
            <Button variant="primary" onClick={submitReview}>
              Submit Review
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  <ToastContainer position="top-end" className="p-3">
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={3000}
      autohide
      bg="success"
    >
      <Toast.Body className="text-white">Review submitted successfully!</Toast.Body>
    </Toast>
  </ToastContainer>
  </>);
}

export default LeaveReviewModal;