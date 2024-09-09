import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "../styles/reactionComponent.css";

const ReactionComponent = () => {
  // State to store both icon and label, default to null
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const reactions = [
    { icon: "bi-hand-thumbs-up-fill", label: "like" },
    { icon: "bi-heart-fill", label: "love" },
    { icon: "bi-emoji-laughing-fill", label: "haha" },
    { icon: "bi-emoji-angry-fill", label: "angry" },
  ];

  // useEffect(() => {
  //   console.log(selectedReaction ? selectedReaction.label : null); // Log the updated reaction state after it changes
  // }, [selectedReaction]); // This effect runs every time selectedReaction changes

  const handleMainButtonClick = () => {
    if (
      selectedReaction &&
      reactions.some((reaction) => selectedReaction.icon === reaction.icon)
    ) {
      // Unselect the reaction
      setSelectedReaction(null);
    } else {
      // Select the "like" reaction by default
      setSelectedReaction({ icon: "bi-hand-thumbs-up-fill", label: "like" });
    }
  };

  const handleReactionClick = (icon, label) => {
    if (selectedReaction && selectedReaction.icon === icon) {
      // Unselect if already selected
      setSelectedReaction(null);
    } else {
      setSelectedReaction({ icon, label });
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
