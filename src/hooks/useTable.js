import { useState, useMemo, useEffect } from "react";

const useTable = ({ columns, data, pagination }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const headers = useMemo(
    () =>
      columns.map((column) => ({
        label: column.label,
      })),
    [columns]
  );

  const rows = useMemo(() => {
    const PREVIOUS_PAGE_NUMBER = pageIndex * pagination.pageSize;
    const NEXT_PAGE_NUMBER = (pageIndex + 1) * pagination.pageSize;

    const rawRows = pagination
      ? data.slice(PREVIOUS_PAGE_NUMBER, NEXT_PAGE_NUMBER)
      : data;

    return rawRows.map((dataRow) => {
      const cells = columns.map(({ accessor }) => {
        const renderValue =
          typeof accessor === "function"
            ? accessor(dataRow)
            : dataRow[accessor];

        return { renderValue };
      });

      return { cells };
    });
  }, [columns, data, pageIndex, pagination]);

  const totalPages = Math.ceil(data.length / pagination.pageSize);

  const nextPage = () =>
    setPageIndex((previousPageIndex) =>
      Math.min(previousPageIndex + 1, totalPages - 1)
    );
  const previousPage = () =>
    setPageIndex((previousPageIndex) => Math.max(previousPageIndex - 1, 0));

  useEffect(() => {
    if (pageIndex > totalPages - 1) {
      setPageIndex(totalPages - 1);
    }
  }, [pageIndex, totalPages, data.length, pagination.pageSize]);

  return {
    headers,
    pagination: pagination
      ? {
          nextPage,
          previousPage,
          totalPages,
          pageNumber: pageIndex + 1,
        }
      : null,
    rows,
  };
};

export default useTable;
