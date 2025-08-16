import { Card, Badge } from "react-bootstrap";

function Reviewer(props) {

    const numReviews = Number(props.Count).toLocaleString();
    const overall = Number(props.overall_score).toFixed(2);
    const palette = Number(props.palette_score).toFixed(2);
    const aroma = Number(props.aroma_score).toFixed(2);
    const taste = Number(props.taste_score).toFixed(2);

    return (
        <Card bg="danger" text="white" style={{ margin: "0.5rem", position: "relative" }}>
            <Card.Body>
            <Card.Title>{props.username}</Card.Title>
        <Card.Text>Review Count: <Badge bg="light" text="dark" style={{ fontSize: '1rem' }}>{numReviews}</Badge></Card.Text>
        <Card.Text>
            Average Overall Score: {overall} <br/>
            Average Palette Score: {palette} <br/>
            Average Aroma Score: {aroma} <br/>
            Average Taste Score: {taste} <br/>
        </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default Reviewer;