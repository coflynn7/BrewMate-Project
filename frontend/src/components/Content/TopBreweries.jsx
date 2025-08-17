import { useRef, useState, useEffect } from 'react';
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import Brewery from './Brewery';

function TopBreweries () {

    const navigate = useNavigate();

    const [topBreweries, setTopBreweries] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(null);

    const targetScoreRef = useRef();
    const stateRef = useRef();
    const styleRef = useRef();
    const offsetRef = useRef();

    const loadTopBreweries = () => {
        //validate user inputs
        setError(null);
        if(targetScoreRef.current.value > 5) {
            setError("The Min Score cannot be above 5.");
            return;
        }

        if(offsetRef.current.value < 0) {
            setError("The Skip Top Breweries # cannot be below 0.")
            return;
        }

        setTopBreweries([]);
        setDataLoaded(false);
        api.get('/topBreweries', {
            params: {
                targetScore: targetScoreRef.current.value,
                state: stateRef.current.value,
                style: styleRef.current.value,
                offset: offsetRef.current.value
            }
        })
        .then((res) => {
            setTopBreweries(res.data[0]);
            setDataLoaded(true);
        })
        .catch((err) => console.error('Error getting top breweries', err));
    };

    useEffect(loadTopBreweries, []);

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h3>Showing <strong>Top Breweries</strong></h3>

        <div>
            <Form onSubmit={loadTopBreweries} className="d-flex justify-content-center align-items-center gap-2" style={{ flexWrap: 'nowrap' }}>

            <Form.Group className="mb-0" controlId="targetScoreInput">
            <Form.Label>Min Score</Form.Label>
            <Form.Control ref={targetScoreRef} placeholder="4" style={{ width: '80px', height: '38px' }}/>
            </Form.Group>

            <Form.Group className="mb-0" controlId="stateInput">
            <Form.Label>State</Form.Label>
            <Form.Control ref={stateRef} placeholder="All" style={{ width: '140px', height: '38px' }}/>
            </Form.Group>

            <Form.Group className="mb-0" controlId="styleInput">
            <Form.Label>Offers Style</Form.Label>
            <Form.Control ref={styleRef} placeholder="All" style={{ width: '140px', height: '38px' }}/>
            </Form.Group>

            <Form.Group className="mb-0" controlId="offsetInput">
            <Form.Label>Skip Top Breweries #</Form.Label>
            <Form.Control ref={offsetRef} placeholder="0" style={{ width: '80px', height: '38px' }}/>
            </Form.Group>

            <Button variant="primary" onClick={loadTopBreweries} disabled={!dataLoaded} style={{ verticalAlign: 'middle', height: '38px' }}>Update</Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3" style={{ maxWidth: '425px', margin: '0 auto' }}>{error}</Alert>}
        </div>

        <div>
        {
        topBreweries.length > 0 ?
            <Row>
                {
                    topBreweries.map(brewery => {
                        return <Col key={brewery.brewery_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Brewery context="top breweries" {...brewery}/>
                        </Col>
                    })
                }
            </Row>
            : dataLoaded ? <Alert variant="primary" className="mt-3" style={{ maxWidth: '475px', margin: '0 auto' }}>No breweries found! Please update the search fields and try again.</Alert>
                :
                <>
                    <p>The top breweries are currently loading ...</p>
                </>
        }
        </div>
    </div>
}

export default TopBreweries;