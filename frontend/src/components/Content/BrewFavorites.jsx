import { useContext } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Beer from './Beer';
import { FavoritesContext } from '../Contexts/FavoritesContext';

function BrewFavorites () {

    const navigate = useNavigate();

    const { favorites, setFavorites } = useContext(FavoritesContext);

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h3>Showing <strong>Favorites</strong></h3>

        <div>
        {
        favorites.length > 0 ?
            <Row>
                {
                    favorites.map(beer => {
                        return <Col key={beer.beer_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Beer {...beer}/>
                        </Col>
                    })
                }
            </Row>
            : <>
                <p>You don't have any favorites yet!</p>
            </>
        }
        </div>
    </div>
}

export default BrewFavorites;