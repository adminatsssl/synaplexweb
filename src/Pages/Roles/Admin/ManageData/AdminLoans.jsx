import React from 'react';
import Layout from "../../../Layout/Layout.jsx";
import IconButton from '../../../ReusableComponents/IconButton.jsx';

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

const AdminLoans = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 px-8 py-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Loans</h2>
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-4">Loan ID</th>
              <th className="px-6 py-4">Loan Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Default Date</th>
              <th className="px-6 py-4">Borrower</th>
              <th className="px-6 py-4">Tenure</th>
              <th className="px-6 py-4">Annual Interest Rate</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {dummyLoans.map((loan) => (
              <tr key={loan.ID} className="border-t">
                <td className="px-6 py-4">{loan.LoanID}</td>
                <td className="px-6 py-4">{loan.LoanType}</td>
                <td className="px-6 py-4">${loan.Amount.toLocaleString()}</td>
                <td className="px-6 py-4">{new Date(loan.DefaultDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{loan.BorrowerName}</td>
                <td className="px-6 py-4">{loan.Tenure}</td>
                <td className="px-6 py-4">{loan.AnnualInterestRate}%</td>
                <td className="px-6 py-4"><IconButton type="delete"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
};

export default AdminLoans;
