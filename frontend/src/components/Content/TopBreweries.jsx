import { useRef, useState, useEffect } from 'react';
import { Col, Row, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import Brewery from './Brewery';

function TopBreweries () {

    const navigate = useNavigate();

    const [topBreweries, setTopBreweries] = useState([]);

    const targetScoreRef = useRef();
    const offsetRef = useRef();

    const loadTopBreweries = () => {
        setTopBreweries([]);
        api.get('/topBreweries', {
            params: {
                targetScore: targetScoreRef.current.value,
                offset: offsetRef.current.value
            }
        })
        .then((res) => {
            setTopBreweries(res.data[0]);
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
            <Form.Label>Minimum Score</Form.Label>
            <Form.Control ref={targetScoreRef} defaultValue="4" style={{ width: '120px', height: '38px' }}/>
            </Form.Group>

            <Form.Group className="mb-0" controlId="offsetInput">
            <Form.Label>Skip Top Reviews #</Form.Label>
            <Form.Control ref={offsetRef} defaultValue="0" style={{ width: '120px', height: '38px' }}/>
            </Form.Group>

            <Button variant="primary" onClick={loadTopBreweries} style={{ verticalAlign: 'middle', height: '38px' }}>Update</Button>
            </Form>

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
            : <>
                <p>The top breweries are currently loading ...</p>
            </>
        }
        </div>
    </div>
}

export default TopBreweries;