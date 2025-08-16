import { useState, useContext } from 'react';
import { Card, Collapse, Button, Spinner } from "react-bootstrap";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import api from '../../api/axios';

import { FavoritesContext } from '../Contexts/FavoritesContext';
import { UserContext } from '../Contexts/UserContext';

function Beer(props) {
    const { favorites, setFavorites } = useContext(FavoritesContext);
    const { userId } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [beerDetails, setBeerDetails] = useState(null);

    //don't need a state var for this since we'll update the favorites context
    const isFavorite = favorites.some(fav => fav.beer_id === props.beer_id);

    const handleFavoriteClick = async () => {
        setLoading(true);
        try {
            if (isFavorite) {
                await api.post('/deleteFavorite', { beerId: props.beer_id, userId });
                setFavorites(prev => prev.filter(b => b.beer_id !== props.beer_id));
            } 
            else {
                await api.post('/addFavorite', { beerId: props.beer_id, userId });
                const newBeer = { beer_id: props.beer_id, Name: props.Name, avg: props.avg, count: props.count };
                setFavorites(prev => [...prev, newBeer]);
            }
        } 
        catch (err) {
            console.error(err);
        } 
        finally {
            setLoading(false);
        }
    };

    const toggleBeerDetailSection = () => {
        if (open) {
            setOpen(false);
            return;
        }

        if (!beerDetails) {
            setDetailLoading(true);

            api.get('/beerInfo', { params: { beerId: props.beer_id } })
                .then(res => setBeerDetails(res.data[0][0]))
                .catch(err => console.error('Error getting beer details', err))
                .finally(() => setDetailLoading(false));
        }

        setOpen(true);
    };

    return (
        <Card bg="secondary" text="white" style={{ margin: "0.5rem" }}>
            <div
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: loading ? 'wait' : 'pointer',
                    color: isFavorite ? 'red' : 'gray',
                    fontSize: '1.5rem',
                    zIndex: 2
                }}
                onClick={loading ? undefined : handleFavoriteClick}
            >
                {isFavorite ? <BsHeartFill color="red" /> : <BsHeart />}
            </div>

            <Card.Body>
                <Card.Title>{props.Name}</Card.Title>
                {props.context === "top beers" && <Card.Subtitle>Score: {props.avg}</Card.Subtitle>}
                {props.context === "most favorited" && <Card.Subtitle>Favorited {props.count} times</Card.Subtitle>}

                <Button
                    variant="dark"
                    onClick={toggleBeerDetailSection}
                    aria-controls={`beer-details-${props.beer_id}`}
                    aria-expanded={open}
                    style={{ marginTop: ".5rem" }}
                    size="sm"
                >
                    {open ? "Hide Details" : "Show Details"}
                </Button>

                <Collapse in={open}>
                    <div id={`beer-details-${props.beer_id}`} style={{ marginTop: "1rem" }}>
                        {detailLoading && <Spinner animation="border" size="sm" />}
                        {!detailLoading && beerDetails && (
                            <>
                                <strong>ABV:</strong> {beerDetails.abv !== "NA" ? beerDetails.abv + "%" : "Unknown"} <br />
                                <strong>Style:</strong> {beerDetails.style} <br />
                                <strong>Brewery:</strong> {beerDetails.Brewery_name} <br />
                                <strong>Brewery State:</strong> {beerDetails.state} <br />
                            </>
                        )}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
}

export default Beer;