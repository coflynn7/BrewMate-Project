import { useState, useEffect, useContext } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import { FavoritesContext } from '../Contexts/FavoritesContext';
import { UserContext } from '../Contexts/UserContext';
import Review from './Review';

function BrewMateHome () {

    const navigate = useNavigate();

    const [recentReviews, setRecentReviews] = useState([]);

    const loadRecentReviews = () => {
        api.get('/recentReviews')
        .then((res) => {
            setRecentReviews(res.data);
        })
        .catch((err) => console.error('Error getting recent reviews', err));
    };

    const { favorites, setFavorites } = useContext(FavoritesContext);
    const {userId, setUserId} = useContext(UserContext);

    const loadFavorites = () => {
        api.get('/favs', {
            params: {
                username: userId
            }            
        })
        .then((res) => {
            setFavorites(res.data[0]);
        })
        .catch((err) => console.error('Error getting favorites', err.response?.data || err.message));
    };

    useEffect(loadRecentReviews, []);
    useEffect(loadFavorites, []);

    return <div className="text-center">
        <h1>Welcome to BrewMate!</h1>

        <Button variant="link" onClick={() => navigate("../favorites")}>My Favorites</Button>
        <Button variant="link">My Reviews</Button>
        <Button variant="link">Leave a Review</Button>
        <Button variant="link" onClick={() => navigate("../topbeers")}>Top Rated Beers</Button>
        <Button variant="link">Top Rated Breweries</Button>
        <Button variant="link">Most Favorited Beers</Button>

        <h4>Showing <strong>recent</strong> reviews</h4>
        {
        recentReviews.length > 0 ?
            <Row>
                {
                    recentReviews.map(r => {
                        return <Col key={r.review_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Review {...r}/>
                        </Col>
                    })
                }
            </Row>
            : <>
                <p>Recent reviews are currently loading ...</p>
            </>
        }
    </div>
}

export default BrewMateHome;