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
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `${CRYPTO_PRICES_API_BASE_URL}?page=${page}`
      );
      const json = await response.json();

      setData(json);
    };

    getData();
  }, [page]);

  const goToNextPage = () => setPage(page + 1);
  const goToPreviousPage = () => setPage(page - 1);

  if (data === null) return <div>loading..</div>;

  return (
    <>
      <table>
        <caption>Crypto Prices</caption>
        <tbody>
          <tr>
            {HEADERS.map((header) => (
              <th key={header.id} scope="col">
                <b>{header.name}</b>
              </th>
            ))}
          </tr>

          {data.coins.map((coin) => (
            <tr>
              <th scope="row">
                <b>{coin.name}</b>
              </th>
              <td>{coin.marketCap}</td>
              <td>{coin.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={goToPreviousPage} disabled={page === 0}>
        Back
      </button>
      <button onClick={goToNextPage} disabled={!data.hasNext}>
        Next
      </button>
    </>
  );
}
