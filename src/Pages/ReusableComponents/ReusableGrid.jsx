import React, { useState, useMemo } from "react";
import "./Styles/ReusableGrid.css";

const ReusableGrid = ({ columns, data }) => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // reset to first page when filtering
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        const filterValue = filters[col.key]?.toLowerCase() || "";
        const cellValue = (row[col.key] || "").toString().toLowerCase();
        return cellValue.includes(filterValue);
      })
    );
  }, [filters, data, columns]);

  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="reusable-grid">
      <table className="styled-table">
        <thead className="headerTable">
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>
                {!col.disableFilter && (
                  <input
                    type="text"
                    placeholder={col.label}
                    value={filters[col.key] || ""}
                    onChange={(e) =>
                      handleFilterChange(col.key, e.target.value)
                    }
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
          &#xab;
        </button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          &#x2039;
        </button>
        <span>
          {Math.min((currentPage - 1) * recordsPerPage + 1, totalRecords)} to{" "}
          {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords}
        </span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          &#x203a;
        </button>
        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
          &#xbb;
        </button>
      </div>
    </div>
  );
};

export default ReusableGrid;
