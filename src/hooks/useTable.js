import { useState } from "react";

const useTable = ({ columns, data, pagination }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const headers = columns.map((column) => ({
    label: column.label,
  }));

  const allRows = data.map((dataRow) => {
    const cells = columns.map(({ accessor }) => {
      const renderValue =
        typeof accessor === "function" ? accessor(dataRow) : dataRow[accessor];

      return { renderValue };
    });

    return { cells };
  });

  const PREVIOUS_PAGE_NUMBER = pageIndex * pagination.pageSize;
  const NEXT_PAGE_NUMBER = (pageIndex + 1) * pagination.pageSize;
  const rows = pagination
    ? allRows.slice(PREVIOUS_PAGE_NUMBER, NEXT_PAGE_NUMBER)
    : allRows;

  const nextPage = () => setPageIndex(pageIndex + 1);
  const previousPage = () => setPageIndex(pageIndex - 1);

  return {
    allRows: allRows.length,
    headers,
    nextPage,
    previousPage,
    pageNumber: pageIndex + 1,
    rows,
  };
};

export default useTable;
