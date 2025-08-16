import { Card } from "react-bootstrap";

function Comparison(props) {

    const myScore = Number(props.myScore).toFixed(2);
    const otherScore = Number(props.otherScore).toFixed(2);
    const diff = Number(props.diff).toFixed(2);

    return (
        <Card bg="dark" text="white" style={{ margin: "0.5rem", position: "relative" }}>
            <Card.Body>
            <Card.Title>{props.Name}</Card.Title>
            <Card.Text className="text-start">
                My average: {myScore} <br />
                Average for other uers: {otherScore} <br />
                Difference: {diff} <br />
            </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Comparison;