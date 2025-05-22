import React, { useEffect, useState } from 'react';
import Layout from "../../../Layout/Layout.jsx";
import IconButton from '../../../ReusableComponents/IconButton.jsx';
import ReusableGrid from '../../../ReusableComponents/ReusableGrid.jsx';
import axios from 'axios'; // Make sure axios is installed

const columns = [
  { key: 'loanNumber', label: 'Loan ID' },
  { key: 'loanType', label: 'Loan Type' },
  {
    key: 'loanAmount',
    label: 'Amount',
    render: (row) => `₹${row.loanAmount.toLocaleString()}`,
  },
  {
    key: 'startDate',
    label: 'Start Date',
    render: (row) => new Date(row.startDate).toLocaleDateString(),
  },
  { key: 'borrowerName', label: 'Borrower' },
  {
    key: 'loanTenure',
    label: 'Tenure',
    render: (row) => `${row.loanTenure} months`,
  },
  {
    key: 'interestRate',
    label: 'Interest Rate',
    render: (row) => `${row.interestRate}%`,
  },
  {
    key: 'actions',
    label: '',
    disableFilter: true,
    render: (row) => <IconButton type="delete" />,
  },
];

const AdminLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('/api/api/loans');
        if (response.data.status === 'SUCCESS') {
          const formattedData = response.data.data.map((loan) => ({
            ...loan,
            borrowerName: loan.borrower?.name || 'N/A',
          }));
          setLoans(formattedData);
        } else {
          console.error('Failed to fetch loans:', response.data.message);
        }
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-8 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Loans</h2>
        {loading ? (
          <p>Loading loans...</p>
        ) : (
          <ReusableGrid columns={columns} data={loans} />
        )}
      </div>
    </Layout>
  );
};

export default AdminLoans;
