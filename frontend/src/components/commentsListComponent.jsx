import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CommentComponent from "./commentComponent";
//import "../styles/ommentListComponent.css"; 

const comments = [
  {
    username: "Alpha",
    content: "Nothing special",
    likes: 0,
    replies: 0,
    avatar: "path_to_avatar_image_1", 
  },
  {
    username: "JohnDoe",
    content: "This is really interesting, thanks for sharing!",
    likes: 12,
    replies: 3,
    avatar: "path_to_avatar_image_2", 
  },
  {
    username: "JaneSmith",
    content: "I completely agree with your point!",
    likes: 5,
    replies: 2,
    avatar: "path_to_avatar_image_3", 
  },
  {
    username: "MikeBrown",
    content: "Can someone explain this further?",
    likes: 2,
    replies: 1,
    avatar: "path_to_avatar_image_4", 
  },
];

const CommentListComponent = () => {
  return (
    <Container>
      <Row>
        {comments.map((comment, index) => (
          <Col key={index} xs={12} className="mb-3">
            <CommentComponent
              username={comment.username}
              content={comment.content}
              likes={comment.likes}
              replies={comment.replies}
              avatar={comment.avatar}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CommentListComponent;
