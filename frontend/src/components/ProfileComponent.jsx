import { useState } from "react";
import UserPostComponent from "../components/userPostComponent";

const ProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Hotaru",
    username: "hotaru123",
    location: "Somewhere in Penacony",
    email: "hotaru@example.com",
    phoneNumber: "123-456-7890",
  });
  const [tempProfile, setTempProfile] = useState(profile);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  return (
    <div className="container mt-4">
      <div className="card bg-dark text-white">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="rounded-circle"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div className="ms-3 flex-grow-1">
              {isEditing ? (
                <form onSubmit={handleSaveProfile}>
                  <input
                    type="text"
                    name="name"
                    value={tempProfile.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="form-control mb-1"
                  />
                  <input
                    type="text"
                    name="username"
                    value={tempProfile.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="form-control mb-1"
                  />
                  <input
                    type="text"
                    name="location"
                    value={tempProfile.location}
                    onChange={handleInputChange}
                    placeholder="Enter your location"
                    className="form-control mb-1"
                  />
                  <input
                    type="email"
                    name="email"
                    value={tempProfile.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-control mb-1"
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={tempProfile.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="form-control mb-1"
                  />
                  <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-success me-2">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h4 className="mb-0">{profile.name}</h4>
                  <p className="mb-1">@{profile.username}</p>
                  <p className="mb-1">Lives in {profile.location}</p>
                  <p className="mb-1">Email: {profile.email}</p>
                  <p className="mb-0">Phone: {profile.phoneNumber}</p>
                </>
              )}
            </div>
            {!isEditing && (
              <button className="btn btn-primary" onClick={handleEditProfile}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <UserPostComponent />
      </div>
    </div>
  );
};

export default ProfileComponent;
