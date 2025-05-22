import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../../../Layout/Layout.jsx";
import ReusableGrid from '../../../ReusableComponents/ReusableGrid.jsx';

const AdminCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: 'id', label: 'Case ID' },
    { key: 'cnrnumber', label: 'CNR No.' },
    { key: 'workflowType', label: 'Case Type' }, // workflowType is actually the caseType
    { key: 'status', label: 'Status' },
  ];

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get('/api/api/cases');
        if (response.data.status === 'SUCCESS') {
          setCases(response.data.data);
        } else {
          console.error('Failed to fetch cases:', response.data.message);
        }
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Cases</h2>
          {loading ? (
            <p className="p-4">Loading cases...</p>
          ) : (
            <ReusableGrid columns={columns} data={cases} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCases;
