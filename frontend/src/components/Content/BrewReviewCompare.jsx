import { useState, useEffect, useContext } from 'react';
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Contexts/UserContext';
import Comparison from './Comparison';
import api from '../../api/axios';

function BrewReviewCompare() {
    const navigate = useNavigate();

    const { userId } = useContext(UserContext);

    const [comparisons, setComparisons] = useState([]);
    const [comparisonsLoaded, setComparisonsLoaded] = useState(false);

    const loadComparisons = () => {
        setComparisons([]);
        api.get('/myReviewsCompare', {
            params: {
                userId: userId
            }
        })
        .then((res) => {
            setComparisons(res.data);
            setComparisonsLoaded(true);
        })
        .catch((err) => console.error('Error getting review compare data', err));
    };

    useEffect(loadComparisons, [userId]);

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h3>Showing <strong>My Review Comparison</strong></h3>

        <div>
        {
        comparisons.length > 0 ?
            <Row>
                {
                    comparisons.map(c => {
                        return <Col key={c.beer_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Comparison {...c} />
                        </Col>
                    })
                }
            </Row>
            : comparisonsLoaded ? <p>You haven't left any reviews!</p> 
                :
                <>
                    <p>The review comparison information is currently loading ...</p>
                </>
        }
        </div>
    </div>
}

export default BrewReviewCompare;