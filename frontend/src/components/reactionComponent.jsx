import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "../styles/reactionComponent.css";
import { reactToPost } from "../apis/posts"; // Import your API function

const ReactionComponent = ({ postId }) => {
  // State to store both icon and label, default to null
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const reactions = [
    { icon: "bi-hand-thumbs-up-fill", label: "like" },
    { icon: "bi-heart-fill", label: "love" },
    { icon: "bi-emoji-laughing-fill", label: "haha" },
    { icon: "bi-emoji-angry-fill", label: "angry" },
  ];

  const handleMainButtonClick = async () => {
    if (
      selectedReaction &&
      reactions.some((reaction) => selectedReaction.icon === reaction.icon)
    ) {
      // Unselect the reaction
      setSelectedReaction(null);
      await reactToPost(postId, null); // Remove the reaction by passing null to the backend
    } else {
      // Select the "like" reaction by default
      const newReaction = { icon: "bi-hand-thumbs-up-fill", label: "like" };
      setSelectedReaction(newReaction);
      await reactToPost(postId, newReaction.label); // Send the "like" reaction to the backend
    }
  };

  const handleReactionClick = async (icon, label) => {
    if (selectedReaction && selectedReaction.icon === icon) {
      // Unselect if already selected
      setSelectedReaction(null);
      await reactToPost(postId, null); // Remove the reaction by passing null to the backend
    } else {
      const newReaction = { icon, label };
      setSelectedReaction(newReaction);
      await reactToPost(postId, label); // Send the selected reaction to the backend
    }
    setIsHovered(false);
  };

  return (
    <div
      className="reaction-container position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="link"
        className="reaction-button"
        onClick={handleMainButtonClick}
      >
        <i
          className={`bi ${
            selectedReaction ? selectedReaction.icon : "bi-hand-thumbs-up"
          } ${
            !selectedReaction ? "thumbs-up-black" : "selected-reaction-black"
          }`}
        />
      </Button>

      {isHovered && (
        <div className="reactions-popup position-absolute bg-white p-2 border rounded shadow-sm">
          {reactions.map((reaction, index) => (
            <div
              key={index}
              className={`reaction btn btn-light me-2 ${
                selectedReaction && selectedReaction.icon === reaction.icon
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleReactionClick(reaction.icon, reaction.label)}
            >
              <i className={`bi ${reaction.icon}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionComponent;
