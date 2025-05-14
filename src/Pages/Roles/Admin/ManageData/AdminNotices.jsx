import React from 'react';
import Layout from "../../../Layout/Layout.jsx";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid";

const dummyNotices = [
  {
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

const columns = [
  { key: 'NoticeDate', label: 'Notice Date' },
  { key: 'DueDate', label: 'Due Date' },
  { key: 'Status', label: 'Status' },
  {
    key: 'isgeneratePDF',
    label: 'Generate PDF',
    render: (row) => (row.isgeneratePDF ? 'Yes' : 'No'),
  },
  { key: 'AuctionDate', label: 'Auction Date' },
  { key: 'AuctionLocation', label: 'Auction Location' },
  {
    key: 'ValuationAmount',
    label: 'Valuation',
    render: (row) => `$${row.ValuationAmount.toLocaleString()}`,
  },
  { key: 'NoticeTemplate', label: 'Template' },
  { key: 'NoticeId', label: 'Notice ID' },
  { key: 'TrackingId', label: 'Tracking ID' },
  { key: 'NoticeType', label: 'Type' },
  { key: 'Stage', label: 'Stage' },
];

const AdminNotices = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Notice</h2>
          <ReusableGrid columns={columns} data={dummyNotices} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminNotices;
