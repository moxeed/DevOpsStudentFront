import { useContext, useEffect, useState } from "react";
import { IsValueEqual } from "../../../Utility/ValueCompare";
import FilterOptionContext from "../Contexts/FilterOptionContext";
import { useFilter } from "./UseFilter";

export const useFilterOptions = (name) => {
  const [filter, handleSet] = useFilter(name);
  const { filterOptions } = useContext(FilterOptionContext);

  const [options, setOptions] = useState();

  useEffect(() => {
    const newOptions = filterOptions[name];
    if (!IsValueEqual(newOptions, options)) {
      setOptions(newOptions);
    }
  }, [filterOptions]);

  return [options, filter, handleSet];
};
