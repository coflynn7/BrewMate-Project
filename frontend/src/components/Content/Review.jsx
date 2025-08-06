import { Card } from "react-bootstrap";

function Review(props) {
    return (
    <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <p>{props.username} gave the following scores to beer {props.beer_id}:</p>
        <p>Overall: {props.overall_score}</p>
        <p>Taste: {props.taste_score}</p>
        <p>Appearance: {props.appearance_score}</p>
        <p>Aroma: {props.aroma_score}</p>
        <p>Palette: {props.palette_score}</p>
    </Card>)
}

export default Review;