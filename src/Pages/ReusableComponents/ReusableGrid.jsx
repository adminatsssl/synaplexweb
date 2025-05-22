import React, { useState, useMemo } from "react";
import "./Styles/ReusableGrid.css";

const ReusableGrid = ({ columns, data, onRowClick }) => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  const [columnWidths, setColumnWidths] = useState(
    columns.reduce((acc, col) => {
      acc[col.key] = col.width || 150;
      return acc;
    }, {})
  );

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
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

  // Resizing Logic
  let startX, startWidth, currentColKey;

  const initResize = (e, colKey) => {
    startX = e.clientX;
    startWidth = columnWidths[colKey];
    currentColKey = colKey;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopResize);
  };

  const onMouseMove = (e) => {
    const diffX = e.clientX - startX;
    setColumnWidths((prev) => ({
      ...prev,
      [currentColKey]: Math.max(startWidth + diffX, 50),
    }));
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopResize);
  };

  return (
    <div className="reusable-grid">
      <table className="styled-table">
        <thead className="headerTable">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="resizable-header"
                style={{ width: columnWidths[col.key] }}
              >
                <div className="header-content">
                  {col.label}
                  <div
                    className="resizer"
                    onMouseDown={(e) => initResize(e, col.key)}
                  />
                </div>
              </th>
            ))}
          </tr>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: columnWidths[col.key] }}>
                {!col.disableFilter && (
                  <input
                    type="text"
                    className="FilterSearch"
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
            <tr key={index} onClick={() => onRowClick?.(row)}>
              {columns.map((col) => (
                <td key={col.key} style={{ width: columnWidths[col.key] }}>
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
