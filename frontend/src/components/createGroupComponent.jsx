import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/createGroupComponent.css';

const CreateGroupComponent = () => {
  return (
    <div className="container create-group-container">
      <h3 className="text-center my-4">CREATE A NEW GROUP</h3>

      <div className="mb-3">
        <label className="form-label"><strong>Group name</strong></label>
        <input type="text" className="form-control" placeholder="Enter group name..." />
      </div>

      <div className="mb-3">
        <label className="form-label"><strong>Group's description</strong></label>
        <textarea
          className="form-control auto-resize"
          rows="3"
          placeholder="Enter group's description..."
        ></textarea>
      </div>

      <div className="text-center my-4">
        <label className="form-label"><strong>Choose an avatar for your group</strong></label>
        <div className="avatar-container my-3">
          <img src="path_to_avatar_image" alt="Group Avatar" className="rounded-circle avatar-image" />
        </div>
        <button className="btn btn-secondary">Choose from library</button>
      </div>

      <div className="mb-3">
        <label className="form-label"><strong>Reason to create the group</strong></label>
        <textarea
          className="form-control auto-resize"
          rows="3"
          placeholder="Enter it here..."
        ></textarea>
      </div>

      <div className="d-flex justify-content-around mt-4">
        <button className="btn btn-secondary btn-lg">Cancel</button>
        <button className="btn btn-primary btn-lg ">Submit</button>
      </div>
    </div>
  );
};

export default CreateGroupComponent;
