import React from "react";

const CancelButton = ({ onClick, label = "Cancel" }) => {
  const styles = {
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "white",
    color: "#004b9b",
    border: "1px solid #004b9b",
    transition: "opacity 0.3s ease",
    width: "160px",
    textTransform: "UPPERCASE",
  };

  return (
    <button
      style={styles}
      onClick={onClick}
      onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
      onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
    >
      {label}
    </button>
  );
};

export default CancelButton;
