import React from 'react';
import Layout from "../../../Layout/Layout.jsx";

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
  
  const AdminCases = () => {
    return ( 
        <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Cases</h2>
  
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Case ID</th>
                  <th className="px-6 py-3">CNR No.</th>
                  <th className="px-6 py-3">Case Type</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dummyCases.map((c) => (
                  <tr key={c.id} className="hover:bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap">{c.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.caseId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.crnNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.caseType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </Layout>
    );
  };

export default AdminCases;
