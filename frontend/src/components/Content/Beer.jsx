import { Card } from "react-bootstrap";

function Beer(props) {
    return (
    <Card bg="secondary" text="white" style={{margin: "0.5rem", height: "6rem"}}>
        <Card.Body>
            <Card.Title>{props.max} </Card.Title>
            <Card.Subtitle>Score: {props.avg}</Card.Subtitle>
        </Card.Body>
    </Card>)
}

export default Beer;