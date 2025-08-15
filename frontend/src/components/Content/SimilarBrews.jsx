import { useRef, useState } from 'react';
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from '../../api/axios';

import Beer from './Beer';

function SimilarBrews() {

    const navigate = useNavigate();

    const [similarBeers, setSimilarBeers] = useState([]);
    const [error, setError] = useState(null);

    const targetBeerRef = useRef();

    const loadSimilarBeers = () => {
        setSimilarBeers([]);
        setError(null);
        api.get('/similarBeers', {
            params: {
                targetBeerName: targetBeerRef.current.value,
            }
        })
        .then((res) => {
            setSimilarBeers(res.data);
        })
      .catch((err) => {
        if(err?.response?.status === 404) {
          setError(err.response.data.message);
        }
        else{
          console.error('Error looking up the beer', err)
        }
      });
    };

    return <div className="text-center">

        <Button variant="link" onClick={() => navigate("../Home")}>Go Home</Button>

        <h3>Showing <strong>Similar Beers</strong></h3>

        <div>
            <Form onSubmit={loadSimilarBeers} className="d-flex justify-content-center align-items-center gap-2" style={{ flexWrap: 'nowrap' }}>

            <Form.Group className="mb-0" controlId="beerInput">
            <Form.Label>Reference Beer</Form.Label>
            <Form.Control ref={targetBeerRef} style={{ width: '175px', height: '38px' }}/>
            </Form.Group>

            <Button variant="primary" onClick={loadSimilarBeers} >Search</Button>
            </Form>
            {error && <Alert variant="info" className="mt-3" style={{ maxWidth: '400px', margin: '0 auto' }}>{error}</Alert>}
        </div>

        <div>
        {
        similarBeers.length > 0 && (
            <Row>
                {
                    similarBeers.map(beer => {
                        return <Col key={beer.beer_id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Beer {...beer}/>
                        </Col>
                    })
                }
            </Row>
            )
        }
        </div>
    </div>
}

export default SimilarBrews;