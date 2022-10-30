import * as React from "react";
import { Checkbox, Menu } from "antd";
import { useFilterOptions } from "../Hooks/UseFilterOptions";

export const MultiSelector = ({ name }) => {
  const [filterOptions, filters = [], handleSet] = useFilterOptions(name);

  const handleChange = (id, checked) => {
    let newSelection = [...filters];
    if (checked) {
      newSelection = newSelection.filter((i) => i !== id);
    } else {
      newSelection.push(id);
    }

    handleSet(newSelection);
  };

  const items =
    filterOptions?.options.map((f) => ({
      ...f,
      checked: filters?.includes(f.id),
    })) ?? [];

  return (
    <Menu title={name} className="subMenuStyle">
      {items.map((item,i) => (
        <Menu.Item key={i} className="chekboxStyle">
          <Checkbox
            onChange={() => handleChange(item.id, item.checked)}
            name={item.id}
            checked={item.checked}
          >
            {item.name}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );
};
