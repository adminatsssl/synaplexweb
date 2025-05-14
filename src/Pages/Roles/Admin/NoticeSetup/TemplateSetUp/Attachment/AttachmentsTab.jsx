import React from 'react';
import './AttachmentsTab.css'
import { IoMdAdd } from "react-icons/io";
import { MdDownload } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

const AttachmentsTab = () => {
  return (
    <div className="AttachmentTab">

      <div className="AttachmentTab-btns">
        <button className="AttachmentTab-New">
          <span className="AttachmentTab-New-span"><IoMdAdd /></span> New
        </button>
        <button className="AttachmentTab-ViewDownload">
          <span className="AttachmentTab-ViewDownload-span"><MdDownload /></span> View/Download
        </button>
        <button className="AttachmentTab-Delete">
          <span className="AttachmentTab-Delete-span"><MdOutlineDelete /></span> Delete
        </button>
      </div>

      <div className="AttachmentTab-BottomBar">
        <table className="">
          <thead className="">
            <tr>
              <th className="">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="">No records found.</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AttachmentsTab;
