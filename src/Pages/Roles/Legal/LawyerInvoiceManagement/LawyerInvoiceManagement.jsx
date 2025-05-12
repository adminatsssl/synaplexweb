import React, { useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import Layout from '../../../Layout/Layout.jsx';
import AddButton from "../../../ReusableComponents/AddButton.jsx";
import LawyerGenerateInvoice from './LawyerGenerateInvoice.jsx';
import IconButton from "../../../ReusableComponents/IconButton.jsx";
import ReusableGrid from "../../../ReusableComponents/ReusableGrid.jsx";
import "./LawyerInvoiceManagement.css";

const LawyerInvoiceManagement = () => {
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

  const columns = [
    { key: 'invoiceNo', label: 'Invoice No' },
    { key: 'invoiceDate', label: 'Invoice Date' },
    { key: 'lawyer', label: 'Lawyer' },
    { key: 'amount', label: 'Invoice Amount' },
    {
      key: 'actions',
      label: 'Actions',
      disableFilter: true,
      render: (row) => (
        <div>
          <FaFileExport
            title="Export"
            className='invoice-Export'
            style={{ marginRight: '10px', cursor: 'pointer', color: '#555' }}
          />
          <IconButton type="delete" />
        </div>
      ),
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

        <ReusableGrid columns={columns} data={dummyInvoices} />

        {showModal && <LawyerGenerateInvoice onClose={() => setShowModal(false)} />}
      </div>
    </Layout>
  );
};

export default LawyerInvoiceManagement;
