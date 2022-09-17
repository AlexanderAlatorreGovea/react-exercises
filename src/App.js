import { useEffect } from "react";
import { mockData, COLUMNS } from "./mockData";
import { format, parse } from "date-fns";

import useTable from "./hooks";

import "./App.css";

const PAGE_NUMBER_LIMIT = 2;

const App = () => {
  const {
    headers,
    pagination: { nextPage, pageNumber, previousPage, totalPages },
    rows,
  } = useTable({
    columns: COLUMNS,
    data: mockData,
    pagination: {
      pageSize: PAGE_NUMBER_LIMIT,
    },
  });

  return (
    <div className="App">
      <table className="table">
        <thead>
          {headers.map(({ label }, index) => (
            <th key={index}>{label}</th>
          ))}
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                {row.cells.map((cell, idx) => (
                  <td key={idx}>{cell.renderValue}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={previousPage}>{"<"}</button>
        <span>
          {pageNumber} - {totalPages}
        </span>
        <button onClick={nextPage}>{">"}</button>
      </div>
    </div>
  );
};

export default App;
