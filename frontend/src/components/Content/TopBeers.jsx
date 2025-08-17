import { useRef, useState, useEffect } from 'react';
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import Beer from './Beer';

function TopBeers () {

    const navigate = useNavigate();

    const [topBeers, setTopBeers] = useState([]);
    const [error, setError] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const targetScoreRef = useRef();
    const styleRef = useRef();
    const offsetRef = useRef();

    const loadTopBeers = () => {
        //validate user inputs
        setError(null);
        if(targetScoreRef.current.value > 5) {
            setError("The Min Score cannot be above 5.");
            return;
        }

        if(offsetRef.current.value < 0) {
            setError("The Skip Top Beers # cannot be below 0.")
            return;
        }

        setTopBeers([]);
        setDataLoaded(false);
        api.get('/topbeers', {
            params: {
                targetScore: targetScoreRef.current.value,
                style: styleRef.current.value,
                offset: offsetRef.current.value
            }
        })
        .then((res) => {
            setTopBeers(res.data[0]);
            setDataLoaded(true);
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
            <Form.Label>Min Score</Form.Label>
            <Form.Control ref={targetScoreRef} placeholder="4" style={{ width: '80px', height: '38px' }}/>
            </Form.Group>

            <Form.Group className="mb-0" controlId="styleInput">
            <Form.Label>Style</Form.Label>
            <Form.Control ref={styleRef} placeholder="All" style={{ width: '140px', height: '38px' }}/>
            </Form.Group>

            <Form.Group className="mb-0" controlId="offsetInput">
            <Form.Label>Skip Top Beers #</Form.Label>
            <Form.Control ref={offsetRef} placeholder="0" style={{ width: '80px', height: '38px' }}/>
            </Form.Group>

            <Button variant="primary" onClick={loadTopBeers} disabled={!dataLoaded} style={{ verticalAlign: 'middle', height: '38px' }}>Update</Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3" style={{ maxWidth: '400px', margin: '0 auto' }}>{error}</Alert>}

        </div>

        <div>
        {
        topBeers.length > 0 ?
            <Row>
                {
                    topBeers.map(beer => {
                        return <Col key={beer.beer_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Beer context="top beers" {...beer}/>
                        </Col>
                    })
                }
            </Row>
            : dataLoaded ? <Alert variant="primary" className="mt-3" style={{ maxWidth: '475px', margin: '0 auto' }}>No beers found! Please update the search fields and try again.</Alert>
                :
                <>
                    <p>The top beers are currently loading ...</p>
                </>
        }
        </div>
    </div>
}

export default TopBeers;