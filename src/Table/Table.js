import React, { useEffect } from "react";
import { useState } from "react";

const DIRECTIONS = {
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
  UNSORTED: "UNSORTED",
};

export const Table = () => {
  const [data, setData] = useState({
    headers: [],
    locationData: [],
  });
  const [sortingDirections, setSortingDirections] = useState({});
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://randomuser.me/api/?results=20");
      const { results } = await response.json();
      const flattenedResults = flattenLocationData(results);
      const headers = getHeaders(flattenedResults[0]);

      setData((prevState) => ({
        ...prevState,
        headers: headers,
        locationData: flattenedResults,
      }));
    };

    getData();
  }, []);

  const storeDirections = (location) => {
    if (
      !sortingDirections[location] ||
      sortingDirections[location] === DIRECTIONS.DESCENDING
    ) {
      setSortingDirections((prevState) => ({
        ...prevState,
        [location]: DIRECTIONS.ASCENDING,
      }));
      return;
    }

    setSortingDirections((prevState) => ({
      ...prevState,
      [location]: DIRECTIONS.DESCENDING,
    }));
  };

  const sortByLocation = (locations, location) =>
    locations.sort((a, b) => {
      const relevantValueA = a[location];
      const relevantValueB = b[location];

      if (relevantValueA < relevantValueB) return -1;
      if (relevantValueA > relevantValueB) return 1;
      return 0;
    });

  const sortColumn = (location) => {
    const newFlattenedLocations = {
      ...data,
      locationData: [...data.locationData],
    };
    storeDirections(location);
    sortByLocation(newFlattenedLocations.locationData, location);
    setData(newFlattenedLocations);
  };

  const getFilteredRows = (rows, filterKey) => {
    return rows.filter((row) => {
      return Object.values(row).some((s) =>
        String(s).toLowerCase().includes(filterKey.toLowerCase())
      );
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2rem",
        }}
      >
        <label style={{ fontWeight: "900" }} htmlFor="search-by-location">
          Search For your next location
        </label>
        <input
          id="search-by-location"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <table>
        {data.headers.map((header, i) => (
          <th key={header} onClick={() => sortColumn(header)}>
            {header}
          </th>
        ))}
        {getFilteredRows(data.locationData, inputValue).map(
          (location, index) => (
            <tr key={index}>
              {data.headers.map((header) => (
                <td key={header}>{location[header]}</td>
              ))}
            </tr>
          )
        )}
      </table>
    </div>
  );
};

function getHeaders(data) {
  const filteredData = [];

  for (const filter in data) {
    if (typeof data[filter] !== "object") {
      filteredData.push(filter);
    }
  }

  return filteredData;
}

function flattenLocationData(data = []) {
  return data.reduce((accumulator, { location }) => {
    accumulator.push({
      ...location,
      number: location.street.number,
      name: location.street.name,
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    });

    return accumulator;
  }, []);
}
