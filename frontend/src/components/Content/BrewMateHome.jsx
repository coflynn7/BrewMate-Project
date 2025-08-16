import { useState, useEffect, useContext } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import { FavoritesContext } from '../Contexts/FavoritesContext';
import { UserContext } from '../Contexts/UserContext';
import LeaveReviewModal from '../Modals/LeaveReviewModal';
import Review from './Review';

function BrewMateHome () {

    const navigate = useNavigate();

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [recentReviews, setRecentReviews] = useState([]);

    const loadRecentReviews = () => {
        api.get('/recentReviews')
        .then((res) => {
            setRecentReviews(res.data);
        })
        .catch((err) => console.error('Error getting recent reviews', err));
    };

    const { setFavorites } = useContext(FavoritesContext);
    const { userId, clearUser } = useContext(UserContext);

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

    const handleLogout = () => {
        clearUser();
        navigate("../");
    }

    const deleteReview = async (reviewId) => {
        try {
            await api.post("/deleteReview", { reviewId: reviewId });
            //update state as well
            setRecentReviews(prev => prev.filter(r => r.review_id !== reviewId));
        } 
        catch (err) {
            console.error("Error deleting review:", err);
        }
    };

    const addReview = (newReview) => {
        setRecentReviews(prevReviews => [newReview, ...prevReviews]);
    }

    useEffect(loadRecentReviews, []);
    useEffect(loadFavorites, [userId, setFavorites]);  //only need this to run once at initial login
                                                       //setFavorites is only here to clear a warning

    return <div className="text-center">
        <h1>Welcome to BrewMate!</h1>

        <Button variant="link" onClick={() => navigate("../favorites")}>My Favorites</Button>
        <Button variant="link" onClick={() => navigate("../myReviews")}>My Reviews</Button>
        <Button variant="link" onClick={() => setShowReviewModal(true)}>Leave a Review</Button>
            <LeaveReviewModal show={showReviewModal} addToRecents={addReview} handleClose={() => setShowReviewModal(false)} />
        <Button variant="link" onClick={() => navigate("../reviewCompare")}>Community Score Compare</Button>
        <Button variant="link" onClick={() => navigate("../topReviewers")}>Top Contributors</Button>
        <Button variant="link" onClick={() => navigate("../topBeers")}>Top Rated Beers</Button>
        <Button variant="link" onClick={() => navigate("../topBreweries")}>Top Rated Breweries</Button>
        <Button variant="link" onClick={() => navigate("../mostFavorited")}>Most Favorited Beers</Button>
        <Button variant="link" onClick={() => navigate("../similarBeerSearch")}>Find Similar Beers</Button>
        <Button variant="link" onClick={handleLogout}>Logout</Button>

        <h4>Showing <strong>recent</strong> reviews</h4>
        {
        recentReviews.length > 0 ?
            <Row>
                {
                    recentReviews.map(r => {
                        return <Col key={r.review_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Review {...r} onDelete={() => deleteReview(r.review_id)}/>
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