import { Card } from "react-bootstrap";

function Beer(props) {
    return (
    <Card bg="secondary" text="white" style={{margin: "0.5rem"}}>
        <Card.Body>
            <Card.Title>{props.beer_id}</Card.Title>
            <Card.Text>
                Overall: {props.max} <br />
                Taste: {props.avg} <br />
            </Card.Text>
        </Card.Body>
    </Card>)
}

export default Beer;