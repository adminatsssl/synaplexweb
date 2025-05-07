import React, { useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import Layout from '../../../Layout/Layout';
import AddButton from "../../../ReusableComponents/AddButton";
import GenerateInvoiceModal from './GenerateInvoiceModal';
import IconButton from "../../../ReusableComponents/IconButton";
import "./UserInvoiceManagement.css"

const UserInvoiceManagement = () => {
  const [showModal, setShowModal] = useState(false);

  const dummyInvoices = [
    {
      id: 1,
      invoiceNo: 'INV20250502',
      invoiceDate: '5/2/2025',
      lawyer: 'Rajesh',
      amount: 0,
    },
    {
      id: 2,
      invoiceNo: 'INV20250501',
      invoiceDate: '5/1/2025',
      lawyer: 'Anita',
      amount: 250,
    },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ margin: 0 }}>Invoice Management</h2>
          <AddButton
            text="Generate Invoice"
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          />
        </div>

        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            fontSize: '14px',
            border: '1px solid #ccc',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Invoice No</th>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Invoice Date</th>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Lawyer</th>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Invoice Amount</th>
              <th style={{ padding: '8px', border: '1px solid #ccc' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{invoice.invoiceNo}</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{invoice.invoiceDate}</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{invoice.lawyer}</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{invoice.amount}</td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                  <FaFileExport
                    title="Export" className='invoice-Export'
                    style={{ marginRight: '10px', cursor: 'pointer', color: '#555' }}
                  />
                  
                  <IconButton type="delete"  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && <GenerateInvoiceModal onClose={() => setShowModal(false)} />}
      </div>
    </Layout>
  );
};

export default UserInvoiceManagement;
