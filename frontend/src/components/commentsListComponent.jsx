import { Container, Row, Col } from "react-bootstrap";
import CommentComponent from "./commentComponent";
//import "../styles/ommentListComponent.css";

const CommentListComponent = ({ comments, commenter }) => {
  return (
    <Container>
      <Row>
        {comments.map((comment) => (
          <Col key={comment._id} xs={12} className="mb-3">
            <CommentComponent 
            commenter={commenter.userId}
            content={comment.commentMessage}
             />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CommentListComponent;
