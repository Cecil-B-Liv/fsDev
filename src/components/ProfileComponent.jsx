import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileComponent = () => {
    return (
        <div className="container mt-4">
            <div className="card bg-dark text-white">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <img
                            src="https://via.placeholder.com/80" // Placeholder image URL
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <div className="ms-3">
                            <h4 className="mb-0">Hotaru</h4>
                            <p className="mb-1">I love to chill and have fun</p>
                            <p className="mb-0"><i className="bi bi-geo-alt"></i> Somewhere in Penacony</p>
                        </div>
                        <button className="btn btn-primary ms-auto">Edit Profile</button>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <strong>Sam Guy</strong>
                                <p className="text-muted mb-1">15 mins ago</p>
                            </div>
                            <div className="dropdown">
                                <button
                                    className="btn btn-link text-muted"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-three-dots"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>

                        <p>Bangboos are cure as shit<br />Cats are no match fr fr...</p>
                        <img
                            src="image-url" // Replace with actual image URL
                            alt="Post"
                            className="img-fluid rounded"
                        />

                        <div className="d-flex mt-3">
                            <div className="me-3">
                                <i className="bi bi-heart"></i> 110
                            </div>
                            <div>
                                <i className="bi bi-chat"></i> 32
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 text-muted">
                Change the color of both, these shits look dumb af
            </div>
        </div>
    );

};

export default ProfileComponent;
