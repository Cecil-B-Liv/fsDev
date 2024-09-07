import { useRef, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/createPostHeaderComponent.css'

export default function CreatePostHeader() {
    const [postText, setPostText] = useState("");
    const textareaRef = useRef(null);

    const handlePostTextChange = (e) => {
        setPostText(e.target.value);
        autoExpandTextarea();
    };

    const autoExpandTextarea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; 
            textarea.style.height = `${textarea.scrollHeight}px`; 
        }
    };

    useEffect(() => {
        autoExpandTextarea(); 
    }, [postText]);

    return (
        <>
            <Container className='d-flex justify-content-center mb-4'>
                <Card className='createPostCard' style={{ backgroundColor: '#EFF3F4' }}>
                    <Card.Body>
                        <Form>
                            <Form.Control
                                as="textarea"
                                ref={textareaRef}
                                rows={2}
                                className='my-2'
                                placeholder="What's on your mind?"
                                value={postText}
                                onChange={handlePostTextChange}
                                style={{ resize: 'none', overflow: 'hidden' }} 
                            />
                            <Row>
                                <Col className='d-flex justify-content-start'>
                                    <Form.Control type='file' accept='image/png, image/jpeg'></Form.Control>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button variant="primary" type="submit">Post</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container >
        </>
    )
}
