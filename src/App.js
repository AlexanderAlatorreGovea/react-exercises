import "./App.css";
import mockData from "./mockData";

const App = () => {
  return (
    <div className="App">
      <div className="table">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Favorite Food</th>
          <th>DOB</th>
        </thead>
        <tbody>
          {mockData.map(({ id, name, favoriteFood, dateOfBirth }) => (
            <tr>
              <td>{id}</td>
              <td>{name}</td>
              <td>{favoriteFood}</td>
              <td>{dateOfBirth}</td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
};

export default App;
