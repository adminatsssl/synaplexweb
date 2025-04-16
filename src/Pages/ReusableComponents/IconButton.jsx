import React from 'react';
import { MdOutlineModeEdit, MdDeleteOutline } from 'react-icons/md';

const IconButton = ({ type, onClick }) => {
  const isEdit = type === 'edit';
  const Icon = isEdit ? MdOutlineModeEdit : MdDeleteOutline;
  const buttonClass = isEdit ? 'icon-btn edit-icon' : 'icon-btn delete-icon';

  return (
    <>
      <style>
        {`
          .icon-btn {
            padding: 0;
            margin: 4px;
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            line-height: 0;
          }

          .icon-btn svg {
            width: 24px;
            height: 24px;
          }

          .edit-icon svg {
            color: green;
          }

          .delete-icon svg {
            color: red;
          }
        `}
      </style>
      <button
        onClick={onClick}
        className={buttonClass}
        title={isEdit ? 'Edit' : 'Delete'}
      >
        <Icon />
      </button>
    </>
  );
};

export default IconButton;
