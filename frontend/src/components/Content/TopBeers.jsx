import { useRef, useState, useEffect } from 'react';
import { Col, Row, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import Beer from './Beer';

function TopBeers () {

    const navigate = useNavigate();

    const [topBeers, setTopBeers] = useState([]);

    const targetScoreRef = useRef();
    const offsetRef = useRef();

    const loadTopBeers = () => {
        setTopBeers([]);
        api.get('/topbeers', {
            params: {
                targetScore: targetScoreRef.current.value,
                offset: offsetRef.current.value
            }
        })
        .then((res) => {
            setTopBeers(res.data[0]);
        })
        .catch((err) => console.error('Error getting top beers', err));
    };

    useEffect(loadTopBeers, []);

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h3>Showing <strong>Top Beers</strong></h3>

        <div>
            <Form onSubmit={loadTopBeers} className="d-flex justify-content-center align-items-center gap-2" style={{ flexWrap: 'nowrap' }}>

            <Form.Group className="mb-0" controlId="targetScoreInput">
            <Form.Label>Minimum Score</Form.Label>
            <Form.Control id="targetScoreInput" ref={targetScoreRef} defaultValue="4" style={{ width: '120px', height: '38px' }}/>
            </Form.Group>

            <Form.Group className="mb-0" controlId="offsetInput">
            <Form.Label>Skip Top Reviews #</Form.Label>
            <Form.Control id="offsetInput" ref={offsetRef} defaultValue="0" style={{ width: '120px', height: '38px' }}/>
            </Form.Group>

            <Button variant="primary" onClick={loadTopBeers} style={{ verticalAlign: 'middle', height: '38px' }}>Update</Button>
            </Form>

        </div>

        <div>
        {
        topBeers.length > 0 ?
            <Row>
                {
                    topBeers.map(beer => {
                        return <Col key={beer.beer_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Beer {...beer}/>
                        </Col>
                    })
                }
            </Row>
            : <>
                <p>The top beers are currently loading ...</p>
            </>
        }
        </div>
    </div>
}

export default TopBeers;