import { useState, useEffect, useContext } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';
import Review from './Review';
import { UserContext } from '../Contexts/UserContext';

function MyBrewReviews () {

    const navigate = useNavigate();

    const { userId } = useContext(UserContext);

    const [reviews, setReviews] = useState([]);
    const [reviewsLoaded, setReviewsLoaded] = useState(false);

    const loadMyReviews = () => {
        setReviews([]);
        api.get('/myReviews', {
            params: {
                userId: userId
            }
        })
        .then((res) => {
            setReviews(res.data);
            setReviewsLoaded(true);
        })
        .catch((err) => console.error('Error getting my reviews', err));
    };

    useEffect(loadMyReviews, [userId]);

    const deleteReview = async (reviewId) => {
        try {
            await api.post("/deleteReview", { reviewId: reviewId });
            //update state as well
            setReviews(prev => prev.filter(r => r.review_id !== reviewId));
        } 
        catch (err) {
            console.error("Error deleting review:", err);
        }
    };

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h3>Showing <strong>My Reviews</strong></h3>

        <div>
        {
        reviews.length > 0 ?
            <Row>
                {
                    reviews.map(review => {
                        return <Col key={review.review_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Review {...review} onDelete={() => deleteReview(review.review_id)}/>
                        </Col>
                    })
                }
            </Row>
            : reviewsLoaded ? <p>You don't have any reviews!</p> 
                :
                <>
                    <p>My reviews are currently loading ...</p>
                </>
        }
        </div>
    </div>
}

export default MyBrewReviews;