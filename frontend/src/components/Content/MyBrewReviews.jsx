import { useState, useEffect, useContext } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';
import Review from './Review';
import { UserContext } from '../Contexts/UserContext';

function MyBrewReviews () {
    //todo: handle case where user has no reviews

    const navigate = useNavigate();

    const { userId } = useContext(UserContext);

    const [reviews, setReviews] = useState([]);

    const loadMyReviews = () => {
        setReviews([]);
        api.get('/myReviews', {
            params: {
                userId: userId
            }
        })
        .then((res) => {
            console.log("review data: ", res.data[0]);
            setReviews(res.data);
        })
        .catch((err) => console.error('Error getting my reviews', err));
    };

    useEffect(loadMyReviews, []);

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
                            <Review {...review}/>
                        </Col>
                    })
                }
            </Row>
            : <>
                <p>My reviews are currently loading ...</p>
            </>
        }
        </div>
    </div>
}

export default MyBrewReviews;