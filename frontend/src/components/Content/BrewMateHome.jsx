import React, { useRef, useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import api from '../../api/axios';

import Review from './Review';

function BrewMateHome () {

    const [recentReviews, setRecentReviews] = useState([]);

    const loadRecentReviews = () => {
        api.get('/recentReviews')
        .then((res) => {
            console.log("response: " + res);
            setRecentReviews(res.data);
        })
        .catch((err) => console.error('Error getting recent reviews', err));
    };

    useEffect(loadRecentReviews, []);

    return <div className="text-center">
        <h1>Welcome to BrewMate!</h1>
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
                <p>There are no reviews on this page yet!</p>
            </>
        }
    </div>
}

export default BrewMateHome;