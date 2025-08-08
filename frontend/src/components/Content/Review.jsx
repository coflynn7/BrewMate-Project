import { Card } from "react-bootstrap";

function Review(props) {
    return (
    <Card bg="secondary" text="white" style={{margin: "0.5rem"}}>
        <Card.Body>
            <Card.Title>{props.Name}</Card.Title>
            <Card.Subtitle className="text-muted">Reviewed by {props.username}</Card.Subtitle>
            <Card.Text>
                Overall: {props.overall_score} <br />
                Taste: {props.taste_score} <br />
                Appearance: {props.appearance_score} <br />
                Aroma: {props.aroma_score} <br />
                Palette: {props.palette_score} <br />
            </Card.Text>
        </Card.Body>
    </Card>)
}

export default Review;