import React, { useState, useMemo } from "react";
import "./Styles/ReusableGrid.css"; 

const ReusableGrid = ({ columns, data }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
          {filteredData.map((row, index) => (
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
    </div>
  );
};

export default ReusableGrid;
