import { mockData, COLUMNS } from "./mockData";
import { format, parse } from "date-fns";

import useTable from "./hooks";

import "./App.css";

const App = () => {
  const { headers, rows } = useTable({ columns: COLUMNS, data: mockData });

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
          {/* {mockData.map(({ id, name, favoriteFood, dateOfBirth }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{favoriteFood}</td>
              <td>
                {format(
                  parse(dateOfBirth, "yyyy-MM-dd", new Date()),
                  "do MMMM yyyy"
                )}
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default App;
