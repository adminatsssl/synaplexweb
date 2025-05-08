import React from 'react';
import Layout from "../../../Layout/Layout.jsx";
import IconButton from '../../../ReusableComponents/IconButton.jsx';
import ReusableGrid from '../../../ReusableComponents/ReusableGrid.jsx';

const dummyLoans = [
  {
    ID: 1,
    LoanID: 'LN001',
    LoanType: 'Personal',
    Amount: 10000,
    DefaultDate: '2023-10-10',
    BorrowerName: 'Alice Johnson',
    Tenure: '24 months',
    AnnualInterestRate: 5.6,
  },
  {
    ID: 2,
    LoanID: 'LN002',
    LoanType: 'Home',
    Amount: 250000,
    DefaultDate: '2024-02-20',
    BorrowerName: 'Bob Smith',
    Tenure: '240 months',
    AnnualInterestRate: 3.8,
  },
  {
    ID: 3,
    LoanID: 'LN003',
    LoanType: 'Auto',
    Amount: 35000,
    DefaultDate: '2023-06-15',
    BorrowerName: 'Charlie Ray',
    Tenure: '60 months',
    AnnualInterestRate: 4.2,
  },
];

const columns = [
  { key: 'LoanID', label: 'Loan ID' },
  { key: 'LoanType', label: 'Loan Type' },
  {
    key: 'Amount',
    label: 'Amount',
    render: (row) => `$${row.Amount.toLocaleString()}`,
  },
  {
    key: 'DefaultDate',
    label: 'Default Date',
    render: (row) => new Date(row.DefaultDate).toLocaleDateString(),
  },
  { key: 'BorrowerName', label: 'Borrower' },
  { key: 'Tenure', label: 'Tenure' },
  {
    key: 'AnnualInterestRate',
    label: 'Annual Interest Rate',
    render: (row) => `${row.AnnualInterestRate}%`,
  },
  {
    key: 'actions',
    label: '',
    disableFilter: true,
    render: (row) => <IconButton type="delete" />,
  },
];

const AdminLoans = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-8 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Loans</h2>
        <ReusableGrid columns={columns} data={dummyLoans} />
      </div>
    </Layout>
  );
};

export default AdminLoans;
