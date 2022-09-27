import React, { useEffect } from "react";
import { useState } from "react";

export const Table = () => {
  const [data, setData] = useState({
    headers: [],
    locationData: [],
  });

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

  return (
    <div>
      <table>
        {data.headers.map((header, i) => (
          <th key={i}>{header}</th>
        ))}
        {data.locationData.map(
          (
            {
              city,
              state,
              country,
              postcode,
              number,
              name,
              latitude,
              longitude,
            },
            i
          ) => {
            return (
              <tr key={i}>
                <td>{city}</td>
                <td>{state}</td>
                <td>{country}</td>
                <td>{postcode}</td>
                <td>{number}</td>
                <td>{name}</td>
                <td>{latitude}</td>
                <td>{longitude}</td>
              </tr>
            );
          }
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
