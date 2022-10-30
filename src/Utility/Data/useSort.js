import { useEffect, useState } from "react";

const useSort = (data) => {
  const [sortCol, setSortCol] = useState();
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const newData = [...data];
    if (sortCol && data && data.length) {
      newData.sort((a, b) => {
        if (isNaN(a[sortCol])) return a[sortCol] < b[sortCol] ? -1 : 1;
        else return +a[sortCol] < +b[sortCol] ? -1 : 1;
      });
    }
    setSortedData(newData);
  }, [data, sortCol]);

  const handleSortColChange = (col) => {
    if (col === sortCol) setSortCol(undefined);
    else setSortCol(col);
  };


  return [sortedData, sortCol, handleSortColChange];
};


export default useSort;
