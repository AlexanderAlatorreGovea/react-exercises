import React, { useEffect, useState } from "react";

const CRYPTO_PRICES_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/cryptocurrencies";

const HEADERS = [
  {
    id: 1,
    name: "Coin",
  },
  {
    id: 2,
    name: "Price",
  },
  {
    id: 3,
    name: "Market Cap",
  },
];

export default function CryptoPrices() {
  // Write your code here.
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `${CRYPTO_PRICES_API_BASE_URL}?page=${page}`
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    };

    getData();
  }, []);

  return (
    <>
      <table>
        {HEADERS.map((header) => (
          <th>{header.name}</th>
        ))}
        {}
      </table>
      <button>Back</button>
      <button>Next</button>
    </>
  );
}
