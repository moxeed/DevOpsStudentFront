import { useContext } from "react";
import FilterContext from "../Contexts/FilterContext";

export const useFilter = (name) => {
  const { filters, setItem } = useContext(FilterContext);

  const handleSet = (value) => {
    setItem(name, value);
  };

  return [filters[name], handleSet];
};
