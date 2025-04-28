import React from 'react';
import Layout from "../../../Layout/Layout.jsx"

const dummyNotices = [
  {
    ID: 1,
    NoticeDate: '2025-04-10',
    DueDate: '2025-05-01',
    Status: 'Pending',
    isgeneratePDF: true,
    AuctionDate: '2025-05-15',
    AuctionLocation: 'New York',
    ValuationAmount: 150000,
    NoticeTemplate: 'Template A',
    NoticeId: 'N1001',
    TrackingId: 'TRK001',
    NoticeType: 'Type A',
    Stage: 'Initial',
  },
  {
    ID: 2,
    NoticeDate: '2025-03-28',
    DueDate: '2025-04-20',
    Status: 'Completed',
    isgeneratePDF: false,
    AuctionDate: '2025-05-02',
    AuctionLocation: 'Los Angeles',
    ValuationAmount: 220000,
    NoticeTemplate: 'Template B',
    NoticeId: 'N1002',
    TrackingId: 'TRK002',
    NoticeType: 'Type B',
    Stage: 'Final',
  },
];

const AdminNotices = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Notice</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Notice Date</th>
                <th className="px-4 py-3 border-b">Due Date</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Generate PDF</th>
                <th className="px-4 py-3 border-b">Auction Date</th>
                <th className="px-4 py-3 border-b">Auction Location</th>
                <th className="px-4 py-3 border-b">Valuation</th>
                <th className="px-4 py-3 border-b">Template</th>
                <th className="px-4 py-3 border-b">Notice ID</th>
                <th className="px-4 py-3 border-b">Tracking ID</th>
                <th className="px-4 py-3 border-b">Type</th>
                <th className="px-4 py-3 border-b">Stage</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {dummyNotices.map((notice, idx) => (
                <tr key={notice.ID} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{notice.ID}</td>
                  <td className="px-4 py-2 border-b">{notice.NoticeDate}</td>
                  <td className="px-4 py-2 border-b">{notice.DueDate}</td>
                  <td className="px-4 py-2 border-b">{notice.Status}</td>
                  <td className="px-4 py-2 border-b">
                    {notice.isgeneratePDF ? 'Yes' : 'No'}
                  </td>
                  <td className="px-4 py-2 border-b">{notice.AuctionDate}</td>
                  <td className="px-4 py-2 border-b">{notice.AuctionLocation}</td>
                  <td className="px-4 py-2 border-b">
                    ${notice.ValuationAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">{notice.NoticeTemplate}</td>
                  <td className="px-4 py-2 border-b">{notice.NoticeId}</td>
                  <td className="px-4 py-2 border-b">{notice.TrackingId}</td>
                  <td className="px-4 py-2 border-b">{notice.NoticeType}</td>
                  <td className="px-4 py-2 border-b">{notice.Stage}</td>
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

export default AdminNotices;
