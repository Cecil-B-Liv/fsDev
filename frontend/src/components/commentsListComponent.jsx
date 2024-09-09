import { Container, Row, Col } from "react-bootstrap";
import CommentComponent from "./commentComponent";
//import "../styles/ommentListComponent.css";

const CommentListComponent = ({ comments }) => {
  return (
    <Container>
      <Row>
        {comments.map((comment) => (
          <Col key={comment._id} xs={12} className="mb-3">
            <CommentComponent 
            commenter={comment.userId}
            content={comment.commentMessage}
             />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CommentListComponent;
