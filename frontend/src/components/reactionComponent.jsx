import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/reactionComponent.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ReactionComponent = () => {
  const [selectedReaction, setSelectedReaction] = useState("bi-hand-thumbs-up");
  const [isHovered, setIsHovered] = useState(false);

  const reactions = [
    { icon: "bi-hand-thumbs-up-fill", label: "like" },
    { icon: "bi-heart-fill", label: "love" },
    { icon: "bi-emoji-laughing-fill", label: "haha" },
    { icon: "bi-emoji-angry-fill", label: "angry" },
  ];

  const handleMainButtonClick = () => {
    if (reactions.some((reaction) => selectedReaction === reaction.icon)) {
      setSelectedReaction("bi-hand-thumbs-up");
    } else {
      setSelectedReaction("bi-hand-thumbs-up-fill");
    }
  };

  const handleReactionClick = (icon) => {
    setSelectedReaction(icon);
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
        <i className={`bi ${selectedReaction}`} />
      </Button>

      {isHovered && (
        <div className="reactions-popup position-absolute bg-white p-2 border rounded shadow-sm">
          {reactions.map((reaction, index) => (
            <div
              key={index}
              className={`reaction btn btn-light me-2 ${
                selectedReaction === reaction.icon ? "selected" : ""
              }`}
              onClick={() => handleReactionClick(reaction.icon)}
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
