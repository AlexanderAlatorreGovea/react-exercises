import { useState } from "react";

import { mockData, COLUMNS } from "./mockData/mockData";
import useTable from "./hooks";
import Quiz from "./Quiz/Quiz";

import "./App.css";
import TicTacToe from "./TicTacToe/TicTacToe";
import { Table } from "./Table/Table";

const PAGE_NUMBER_LIMIT = 2;

const App = () => {
  const [data, setData] = useState(mockData);

  const {
    headers,
    pagination: { nextPage, pageNumber, previousPage, totalPages },
    rows,
  } = useTable({
    columns: COLUMNS,
    data,
    pagination: {
      pageSize: PAGE_NUMBER_LIMIT,
    },
  });

  return (
    <div className="App">
      {/* <Table /> */}
      {/* <TicTacToe /> */}
      {/* <Quiz />
      <table className="table">
        <thead>
          {headers.map(({ label }, index) => (
            <th key={index}>{label}</th>
          ))}
          <th />
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                {row.cells.map((cell, idx) => (
                  <td key={idx}>{cell.renderValue}</td>
                ))}
                <td>
                  <button
                    onClick={() =>
                      setData(
                        data.filter((_, innerIndex) => index !== innerIndex)
                      )
                    }
                  >
                    x
                  </button>
                </td>
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
        <button
          onClick={() =>
            setData([
              ...data,
              {
                dateOfBirth: "1899-12-31",
                favoriteFood: "Cheese",
                id: "" + (data.length += 1),
                name: "Alex" + Math.random(),
              },
            ])
          }
        >
          Add Person
        </button>
      </div> */}
    </div>
  );
};

export default App;
