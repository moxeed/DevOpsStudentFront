import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { DataActionsProvider } from "./Components/DataActionsProvider";
import FilterContext from "./Contexts/FilterContext";
import FilterOptionContext from "./Contexts/FilterOptionContext";

export const ListPage = ({ getFilterOptions, children }) => {
  if (getFilterOptions) {
    return (
      <DataActionsProvider>
        <ListPageWithOptions getFilterOptions={getFilterOptions}>
          {children}
        </ListPageWithOptions>
      </DataActionsProvider>
    );
  } else {
    return <DataActionsProvider>{children}</DataActionsProvider>;
  }
};

const ListPageWithOptions = ({ getFilterOptions, children }) => {
  const [filterOptions, setFilterOptions] = useState({});
  const { filters } = useContext(FilterContext);

  useEffect(() => {
    getFilterOptions(filters)
      .then((res) => {
        setFilterOptions(res.data);
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  }, [filters, getFilterOptions, setFilterOptions]);

  return (
    <FilterOptionContext.Provider value={{ filterOptions }}>
      {children}
    </FilterOptionContext.Provider>
  );
};
