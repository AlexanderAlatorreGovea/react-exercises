const useTable = ({ columns, data }) => {
  const headers = columns.map((column) => ({
    label: column.label,
  }));

  const rows = data.map((dataRow) => {
    const cells = columns.map(({ accessor }) => {
      const renderValue =
        typeof accessor === "function" ? accessor(dataRow) : dataRow[accessor];

      return { renderValue };
    });

    return { cells };
  });

  return { headers, rows };
};

export default useTable;
