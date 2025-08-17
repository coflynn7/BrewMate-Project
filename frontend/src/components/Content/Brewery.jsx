import { Card, Collapse, Button, Spinner } from "react-bootstrap";
import { useState } from 'react';
import api from '../../api/axios';

export default function Brewery(props) {

    const capitalizeFirstLetter = (str) => {
        return (str.charAt(0).toUpperCase()) + (str.slice(1).toLowerCase());
    };

    const [open, setOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [breweryDetails, setBreweryDetails] = useState(null);
    const [breweryTopBeers, setBreweryTopBeers] = useState([]);

    const avgScore = Number(props.avg).toFixed(2);

    const toggleBreweryDetailSection = () => {

        if (open) {
            setOpen(false);
            return;
        }

        if (!breweryDetails) {
            setDetailLoading(true);

            api.get('/breweryInfo', { params: { breweryId: props.brewery_id } })
                .then(res => {
                    setBreweryDetails(res.data["generalDetails"][0]);
                    setBreweryTopBeers(res.data["topBeers"]);
                })
                .catch(err => console.error('Error getting brewery details', err))
                .finally(() => setDetailLoading(false));
        }

        setOpen(true);
    };

    return ( 
    <Card bg="info" text="dark" style={{margin: "0.5rem"}}>
        <Card.Body>
            <Card.Title>{props.name} </Card.Title>
            <Card.Subtitle>Average score: {avgScore}</Card.Subtitle>
            <Button
                variant="dark"
                onClick={toggleBreweryDetailSection}
                aria-controls={`beer-details-${props.brewery_id}`}
                aria-expanded={open}
                style={{ marginTop: ".5rem" }}
                size="sm"
            >
                {open ? "Hide Details" : "Show Details"}
            </Button>

            <Collapse in={open}>
                <div id={`brewery-details-${props.brewery_id}`} style={{ marginTop: "1rem" }}>
                    {detailLoading && <Spinner animation="border" size="sm" />}
                    {!detailLoading && breweryDetails && (
                        <>
                        <div className="text-start" style={{marginTop: ".75rem"}}>
                            <strong>Type:</strong> {breweryDetails.type} <br />
                            <strong>Number of Locations:</strong> {breweryDetails.numLocations} <br />
                            <strong>State:</strong> {capitalizeFirstLetter(breweryDetails.state)} <br />
                            <strong>Website:</strong> {breweryDetails.website} <br />
                        </div>
                        <div style={{marginTop: "1rem"}}>
                            <strong>Top Beers</strong>
                            <ol class="list-group list-group-numbered">
                            {breweryTopBeers.map((beer, idx) => (
                                <li key={idx} class="list-group-item">{beer.beerName}</li>
                            ))}
                            </ol>
                        </div>
                        </>
                    )}
                </div>
            </Collapse>
        </Card.Body>
    </Card>)
}