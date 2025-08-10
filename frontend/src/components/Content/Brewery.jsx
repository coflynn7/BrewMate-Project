import { Card } from "react-bootstrap";

export default function Brewery(props) {
    return ( 
    <Card bg="info" text="dark" style={{margin: "0.5rem", height: "6rem"}}>
        <Card.Body>
            <Card.Title>{props.name} </Card.Title>
            <Card.Subtitle>Average score: {props.avg}</Card.Subtitle>
        </Card.Body>
    </Card>)
}