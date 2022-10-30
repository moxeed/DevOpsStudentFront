import { useEffect, useState } from "react";
import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const useFilter = (getData, getFilters, category) => {
  const [filters, setFilters] = useState();
  const [filteredData, setFilterdData] = useState([]);
  const dispatch = useDispatch();
  const { group, course } = useParams();
  const [groupId, setGroupId] = useState(group ? +group : 3);
  const [selectedFilters, setSelectedFilters] = useState(
    category === "Tutoring" ? {} : { GroupIds: [groupId] }
  );
  const [preFilter, setPreFilter] = useState({});

  useEffect(() => {
    if (groupId) chooseFilter(+groupId);
  }, [groupId]);

  const handleChange = (name, id, add) => {
    const newState = { ...selectedFilters };
    if (newState[name] === undefined) newState[name] = [];
    newState[name] = newState[name].filter((i) => i !== id);
    if (add) newState[name].push(id);

    setSelectedFilters(newState);
  };

  const handleFreePrice = (active, min = 0, max = 0) => {
    const newState = { ...selectedFilters };
    if (active === true) {
      newState["minPrice"] = min;
      newState["maxPrice"] = max;
    } else {
      delete newState["minPrice"];
      delete newState["maxPrice"];
    }
    setSelectedFilters(newState);
  };

  const chooseFilter = (id) => {
    setGroupId(id);
    if (category === "Webinar") {
      window.history.replaceState(
        null,
        "Product",
        `/Selection/Product/Webinar/${groupId}`
      );
    } else if (category === "Consultation") {
      window.history.replaceState(
        null,
        "Provider",
        `/Selection/Provider/Consultation/${groupId}`
      );
    }
    const newState = { ...selectedFilters };
    newState["GroupIds"] = [groupId];
    if (course) newState["CourseIds"] = [course];
    if (JSON.stringify(newState) !== JSON.stringify(selectedFilters))
      setSelectedFilters(newState);
  };

  const chooseCourse = (id) => {
    const newState = { ...selectedFilters };
    if (id) newState["CourseIds"] = [id];
    setSelectedFilters(newState);
  };

  useEffect(() => {
    dispatch(ShowLoading());
    if (JSON.stringify(selectedFilters) !== JSON.stringify(preFilter)) {
      setPreFilter(selectedFilters);

      getData(selectedFilters)
        .then((res) => {
          setFilterdData(res.data);
          dispatch(HideLoading());
        })
        .finally(() => {
          dispatch(HideLoading());
        });
    }
  }, [selectedFilters]);

  useEffect(() => {
    getFilters(selectedFilters).then((res) => {
      setFilters(res.data);
    });
  }, [getFilters, dispatch, selectedFilters]);

  return [
    filteredData,
    selectedFilters,
    filters,
    handleChange,
    chooseFilter,
    chooseCourse,
    handleFreePrice,
  ];
};

export default useFilter;
