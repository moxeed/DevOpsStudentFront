import * as React from "react";
import { useState } from "react";
import FilterContext from "../Contexts/FilterContext";
import SortContext from "../Contexts/SortContext";

export const DataActionsProvider = ({ children }) => {
  const [filters, setFilters] = useState({});
  const [sortCol, setSortCol] = useState("");
  const tempFilters = { ...filters };
  const setItem = (name, value) => {
    tempFilters[name] = value;
    setFilters(tempFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, setItem }}>
      <SortContext.Provider value={{ sortCol, setSortCol }}>
        {children}
      </SortContext.Provider>
    </FilterContext.Provider>
  );
};
