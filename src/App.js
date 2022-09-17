import { mockData, COLUMNS } from "./mockData";
import { format, parse } from "date-fns";

import useTable from "./hooks";

import "./App.css";

const App = () => {
  const {
    headers,
    rows,
    pagination = {
      pageSize: 2,
    },
  } = useTable({ columns: COLUMNS, data: mockData });

  return (
    <div className="App">
      <table className="table">
        <thead>
          {headers.map(({ label }, index) => (
            <th key={index}>{label}</th>
          ))}
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.cells.map((cell, idx) => (
                <td key={idx}>{cell.renderValue}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>{"<"}</button>
        <span>1 -4</span>
        <button>{">"}</button>
      </div>
    </div>
  );
};

export default App;
