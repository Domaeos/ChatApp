import { Card, Button } from "react-bootstrap";

export default function RoomCard(props) {
    console.log(props.room);
    const { name, id, description, population, ownerName } = props.room;
    return (
        <Card>
            <Card.Header>{name}</Card.Header>
            <Card.Body>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Owner: {ownerName}</Card.Text>
                <Card.Text>Members: {population}</Card.Text>
                <div className="myrooms-card-buttons-grid">
                    <Button variant="primary">Open room</Button>
                    <Button variant="danger">Leave room</Button>
                    <div className="myroom-card-buttons-spacer"></div>
                </div>
            </Card.Body>
        </Card>
    );
}
