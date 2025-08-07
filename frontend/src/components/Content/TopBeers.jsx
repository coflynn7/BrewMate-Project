import { useState, useEffect } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import Beer from './Beer';

function TopBeers () {

    const navigate = useNavigate();

    const [topBeers, setTopBeers] = useState([]);

    const loadTopBeers = () => {
        api.get('/topbeers')
        .then((res) => {
            setTopBeers(res.data);
        })
        .catch((err) => console.error('Error getting top beers', err));
    };

    useEffect(loadTopBeers, []);

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h4>Showing <strong>Top Beers</strong></h4>
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
                <p>The top beers are currently loading!</p>
            </>
        }
    </div>
}

export default TopBeers;