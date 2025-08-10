import { useState, useContext } from 'react';
import { Card } from "react-bootstrap";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import api from '../../api/axios';

import { FavoritesContext } from '../Contexts/FavoritesContext';
import { UserContext } from '../Contexts/UserContext';

function Beer(props) {
    const { favorites, setFavorites } = useContext(FavoritesContext);
    const { userId } = useContext(UserContext);

    const [isFavorite, setIsFavorite] = useState(favorites.some( fav => fav.beer_id === props.beer_id));
    const [loading, setLoading] = useState(false);

    const handleFavoriteClick = async () => {
        try {
            setLoading(true);

            //update the db
            //as of now we only support favoriting (not un-favoriting)
            await api.post('/addFavorite', { 
                beerId : props.beer_id,
                userId : userId
            });

            //toggle icon
            setIsFavorite(!isFavorite);

            //keep our context update to date as well
            setFavorites((prev) => {
                //avoid duplicates
                if (prev.includes(props.beer_id))
                        return prev;
                //append the new beer
                return [...prev, props.beer_id];
            });
        } 
        catch (error) {
            console.error("Error updating favorite:", error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
    <Card bg="secondary" text="white" style={{margin: "0.5rem", height: "6rem"}}>
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
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
        <Card.Body>
            <Card.Title>{props.Name} </Card.Title>
            {props.context === "top beers" ? <Card.Subtitle>Score: {props.avg}</Card.Subtitle>: ""}
            {props.context === "most favorited" ? <Card.Subtitle>Favorited {props.count} times</Card.Subtitle>: ""}
        </Card.Body>
    </Card>)
}

export default Beer;