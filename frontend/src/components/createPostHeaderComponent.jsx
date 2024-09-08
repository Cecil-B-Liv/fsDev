// API
import { createPost } from '../apis/posts'; 

// HOOK
import { useRef, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

// BOOTSTRAP
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/createPostHeaderComponent.css'


export default function CreatePostHeader() {
    const [formData, setFormData] = useState({postVisibility: "", postDescription: "", postPicturePath: null});

    // const [postText, setPostText] = useState("");
    // const [file, setFile] = useState(null);
    const textareaRef = useRef(null);

    // // Handle Form Action
    // const handlePostTextChange = (e) => {
    //     setPostText(e.target.value);
    //     autoExpandTextarea();
    // };
    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]); // Capture the selected file
    // };

    // Handle Submit Action
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // // Create new form data
        // const formData = new FormData();
        // formData.append('postText', postText); 
        // if (file) formData.append('file', file); 

        // Call API
        try {
            await createPost(formData);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    // // Expand text function
    // const autoExpandTextarea = () => {
    //     const textarea = textareaRef.current;
    //     if (textarea) {
    //         textarea.style.height = "auto"; 
    //         textarea.style.height = `${textarea.scrollHeight}px`; 
    //     }
    // };
    // useEffect(() => {
    //     autoExpandTextarea(); 
    // }, [postText]);


    return (
        <>
            <Container className='d-flex justify-content-center mb-4'>
                <Card className='createPostCard' style={{ backgroundColor: '#EFF3F4' }}>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>

                            <Form.Control
                                as="textarea"
                                // ref={textareaRef}
                                rows={2}
                                className='my-2'
                                placeholder="What's on your mind?"
                                value={formData.postDescription}
                                onChange={(e) =>{
                                    setFormData({...formData, postDescription: e.target.value})
                                }}
                                style={{ resize: 'none', overflow: 'hidden' }} 
                            />

                            {/* Visibility Radio Buttons */}
                            <Row className="my-3">
                                <Col>
                                    <Form.Check
                                        type="radio"
                                        id="public"
                                        label="Public"
                                        name="postVisibility"
                                        value="public"
                                        checked={formData.postVisibility === "public"}
                                        onChange={(e) => setFormData({ ...formData, postVisibility: e.target.value })}
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="friends"
                                        label="Friends"
                                        name="postVisibility"
                                        value="friends"
                                        checked={formData.postVisibility === "friends"}
                                        onChange={(e) => setFormData({ ...formData, postVisibility: e.target.value })}
                                    />
                                </Col>
                            </Row>

                            {/*Image*/}
                            <Row>
                                <Col className='d-flex justify-content-start'>
                                    <Form.Control 
                                    type='file'
                                    value={formData.postPicturePath}
                                    onChange={(e)=>{
                                        setFormData({...formData, postPicturePath: e.target.value})
                                    }}>
                                    </Form.Control>
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
