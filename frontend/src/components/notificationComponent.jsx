import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';


const NotificationComponent = () => {
    const notifications = [
        {
            id: 1,
            user: 'Sam Guy',
            text: 'has sent you a friend request.',
            time: '3 hours',
            avatar: 'https://via.placeholder.com/50',
            isNew: true,
        },
        {
            id: 2,
            user: 'Hikaru, Subaru',
            text: 'and 13 others reacted to your video.',
            time: '3 hours',
            avatar: 'https://via.placeholder.com/50',
            isNew: false,
        },
        {
            id: 3,
            user: 'Firefly',
            text: 'tagged you in the comment of a post.',
            time: '2 days',
            avatar: 'https://via.placeholder.com/50',
            isNew: true,
        },
        {
            id: 4,
            user: 'Dude',
            text: 'sent you a friend request.',
            time: '2 days',
            avatar: 'https://via.placeholder.com/50',
            isNew: false,
        },
        {
            id: 5,
            user: 'Wattson',
            text: 'has shared a post.',
            time: '2 days',
            avatar: 'https://via.placeholder.com/50',
            isNew: true,
        },
        {
            id: 6,
            user: 'Iron Man',
            text: 'replied to your post.',
            time: '1 week',
            avatar: 'https://via.placeholder.com/50',
            isNew: false,
        },
    ];

    return (
        <Card style={{ width: '20rem' }}>
            <Card.Header>
                Notifications
            </Card.Header>
            <ListGroup variant="flush">
                {notifications.map((notification) => (
                    <ListGroupItem key={notification.id} className="d-flex justify-content-between align-items-start">
                        <div className="d-flex">
                            <img
                                src={notification.avatar}
                                alt={notification.user}
                                className="rounded-circle me-2"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <div>
                                <div>
                                    <strong>{notification.user}</strong> {notification.text}
                                </div>
                                <small className="text-muted">{notification.time}</small>
                            </div>
                        </div>
                        {notification.isNew && <Badge bg="primary" pill>&nbsp;</Badge>}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Card>
    );
};

export default NotificationComponent;
