import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HeaderComponent from '../components/headerComponent'
import SideNavComponent from '../components/sideNavComponent'
import UserPostComponent from '../components/userPostComponent'
import CreatePostHeaderComponent from '../components/createPostHeaderComponent'

export default function HomePage() {
    return (
        <>
            <HeaderComponent />
            <SideNavComponent />
            <Row>
                <Col>
                    {/* For Testing */}
                    <CreatePostHeaderComponent />
                    {/* For Testing */}
                    <UserPostComponent />
                    <UserPostComponent />
                    <UserPostComponent />
                    <UserPostComponent />
                </Col>
            </Row>
        </>
    )
}