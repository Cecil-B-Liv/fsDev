import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/reactionComponent.css";

const ReactionComponent = () => {
  const [selectedReaction, setSelectedReaction] = useState("reaction");
  const [isHovered, setIsHovered] = useState(false);

  const reactions = [
    { emoji: "❤️", label: "love" },
    { emoji: "😂", label: "haha" },
    { emoji: "😡", label: "angry" },
    { emoji: "👍", label: "like" },
  ];

  const handleReactionClick = (emoji) => {
    if (selectedReaction === emoji) {
      setSelectedReaction("reaction");
    } else {
      setSelectedReaction(emoji);
    }
    setIsHovered(false);
  };

  return (
    <div
      className="reaction-container position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button variant="link" className="reaction-button">
        {selectedReaction}
      </Button>
      {isHovered && (
        <div className="reactions-popup position-absolute bg-white p-2 border rounded shadow-sm">
          {reactions.map((reaction, index) => (
            <div
              key={index}
              className={`reaction btn btn-light me-2 ${selectedReaction === reaction.emoji ? "selected" : ""
                }`}
              onClick={() => handleReactionClick(reaction.emoji)}
            >
              {reaction.emoji}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionComponent;
