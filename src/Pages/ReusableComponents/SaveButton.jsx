import React from 'react';

const SaveButton = ({ onClick, label = "SAVE" }) => {
  const styles = {
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#004b9b',
    color: 'white',
    border: 'none',
    transition: 'opacity 0.3s ease',
    width: '160px',
    textTransform: 'UPPERCASE'
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

export default SaveButton;
