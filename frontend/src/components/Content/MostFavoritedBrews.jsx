import { useState, useEffect } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';
import Beer from './Beer';

function MostFavoritedBrews () {

    const navigate = useNavigate();

    const [beers, setBeers] = useState([]);
    const [beersLoaded, setBeersLoaded] = useState(false);

    const loadMostFavoritedBeers = () => {
        setBeers([]);
        api.get('/mostFavorited')
        .then((res) => {
            setBeers(res.data[0]);
            setBeersLoaded(true);
        })
        .catch((err) => console.error('Error getting most favorited beers', err));
    };

    useEffect(loadMostFavoritedBeers, []);

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h3>Showing the <strong>Most Favorited Brews</strong></h3>

        <div>
        {
        beers.length > 0 ?
            <Row>
                {
                    beers.map(beer => {
                        return <Col key={beer.beer_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Beer context="most favorited" {...beer}/>
                        </Col>
                    })
                }
            </Row>
            : beersLoaded ? <p>No beers have been favorited!</p> 
                :
                <>
                    <p>The most favorited beers are currently loading ...</p>
                </>
        }
        </div>
    </div>
}

export default MostFavoritedBrews;