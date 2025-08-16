import { useState, useEffect, useRef } from 'react';
import { Col, Row, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Reviewer from './Reviewer';
import api from '../../api/axios';

function TopReviewers() {
    const navigate = useNavigate();

    const offsetRef = useRef();

    const [reviewers, setReviewers] = useState([]);
    const [reviewersLoaded, setReviewersLoaded] = useState(false);

    const loadTopReviewers = () => {
        setReviewers([]);
        setReviewersLoaded(false);
        api.get('/topReviewers', {
            params: {
                offset: offsetRef.current.value
            }
        })
        .then((res) => {
            setReviewers(res.data);
            setReviewersLoaded(true);
        })
        .catch((err) => console.error('Error getting top reviewers', err));
    };

    useEffect(loadTopReviewers, []);

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h3>Showing <strong>Top Reviewers</strong></h3>

        <div>
            <Form onSubmit={loadTopReviewers} className="d-flex justify-content-center align-items-center gap-2" style={{ flexWrap: 'nowrap' }}>
            <Form.Group className="mb-0" controlId="offsetInput">
                <Form.Label>Skip Top Reviewers #</Form.Label>
                <Form.Control ref={offsetRef} placeholder="0" style={{ width: '80px', height: '38px' }}/>
            </Form.Group>
            <Button variant="primary" onClick={loadTopReviewers} style={{ verticalAlign: 'middle', height: '38px' }}>Update</Button>
            </Form>
        </div>

        <div>
        {
        reviewers.length > 0 ?
            <Row>
                {
                    reviewers.map(r => {
                        return <Col key={r.username} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Reviewer {...r} />
                        </Col>
                    })
                }
            </Row>
            : reviewersLoaded ? <p>No data was found :(</p> 
                :
                <>
                    <p>The top reviewers are currently loading ...</p>
                </>
        }
        </div>
    </div>
}

export default TopReviewers;