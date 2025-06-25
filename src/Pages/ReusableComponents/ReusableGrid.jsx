import React, { useState, useMemo } from "react";
import "./Styles/ReusableGrid.css";

const ReusableGrid = ({ columns, data, onRowClick, onPageChange, page, totalPages }) => {
  const [filters, setFilters] = useState({});
  const [internalPage, setInternalPage] = useState(1);
  const internalRecordsPerPage = 10;

  const isExternalPagination = typeof onPageChange === "function";
  const currentPage = isExternalPagination ? page + 1 : internalPage;
  

  const [columnWidths, setColumnWidths] = useState(
    columns.reduce((acc, col) => {
      acc[col.key] = col.width || 150;
      return acc;
    }, {})
  );

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setInternalPage(1);
  };

  const filteredData = useMemo(() => {
    return [...data].reverse().filter((row) =>
      columns.every((col) => {
        const filterValue = filters[col.key]?.toLowerCase() || "";
        const cellValue = (row[col.key] || "").toString().toLowerCase();
        return cellValue.includes(filterValue);
      })
    );
  }, [filters, data, columns]);

  const totalPageCount = isExternalPagination
    ? totalPages
    : Math.ceil(filteredData.length / internalRecordsPerPage);
  const recordsPerPage = isExternalPagination
    ? data.length
    : internalRecordsPerPage;

  const paginatedData = useMemo(() => {
    if (isExternalPagination) return data;
    return filteredData.slice(
      (currentPage - 1) * recordsPerPage,
      currentPage * recordsPerPage
    );
  }, [filteredData, data, currentPage, recordsPerPage, isExternalPagination]);

  const goToPage = (pageNum) => {
    if (isExternalPagination) {
      onPageChange(pageNum - 1); // backend is 0-indexed
    } else {
      setInternalPage(Math.max(1, Math.min(pageNum, totalPageCount)));
    }
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
          {paginatedData.map((row, index) => (
            <tr key={index} onClick={() => onRowClick?.(row)}>
              {columns.map((col) => {
                const isExpanded = columnWidths[col.key] > 150;
                return (
                  <td
                    key={col.key}
                    style={{ width: columnWidths[col.key] }}
                    className={isExpanded ? "show-full-content" : ""}
                    title={row[col.key]}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
          &#xab;
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#x2039;
        </button>

        <span>
          {isExternalPagination
            ? `Page ${currentPage} of ${totalPageCount}`
            : `${Math.min((currentPage - 1) * recordsPerPage + 1, filteredData.length)} to ${Math.min(
                currentPage * recordsPerPage,
                filteredData.length
              )} of ${filteredData.length}`}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPageCount}
        >
          &#x203a;
        </button>
        <button
          onClick={() => goToPage(totalPageCount)}
          disabled={currentPage === totalPageCount}
        >
          &#xbb;
        </button>
      </div>
    </div>
  );
};

export default ReusableGrid;
