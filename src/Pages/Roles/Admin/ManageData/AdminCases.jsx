import React from 'react';
import Layout from "../../../Layout/Layout.jsx";
import ReusableGrid from '../../../ReusableComponents/ReusableGrid.jsx';

const dummyCases = [
  {
    id: 1,
    caseId: 1001,
    crnNo: 'CNR123456',
    caseType: 'Criminal',
    status: 'Open',
  },
  {
    id: 2,
    caseId: 1002,
    crnNo: 'CNR654321',
    caseType: 'Civil',
    status: 'Closed',
  },
  {
    id: 3,
    caseId: 1003,
    crnNo: 'CNR789456',
    caseType: 'Family',
    status: 'Pending',
  },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'caseId', label: 'Case ID' },
  { key: 'crnNo', label: 'CNR No.' },
  { key: 'caseType', label: 'Case Type' },
  { key: 'status', label: 'Status' },
];

const AdminCases = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Cases</h2>
          <ReusableGrid columns={columns} data={dummyCases} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminCases;