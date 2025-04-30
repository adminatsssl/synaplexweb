import React from 'react';
import { FaPlusCircle } from 'react-icons/fa'; // Font Awesome icon (optional)

function AddButton({ text = "Add Court", onClick }) {
  return (
    <>
      <button className="add-button" onClick={onClick}>
        <FaPlusCircle className="icon" />
        <span>{text}</span>
      </button>

      <style>
        {`
          .add-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            border: none;
            border-radius: 999px;
            background-color: #17877b;
            color: white;
            font-size: 16px;
            font-weight: 500;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
          }

          .add-button .icon {
            font-size: 18px;
          }

          .add-button:hover {
            background-color: #10655c;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          }
        `}
      </style>
    </>
  );
}

export default AddButton;
