import * as React from "react";
import { useEffect, useState } from "react";
import OrderSerivce from "../../Services/Financial/OrderService";
import Schedule from "./Schedule";

export const SelectSchedules = ({ onComplete, lineItem }) => {
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    if (lineItem) {
      OrderSerivce.GetCurrentOrderSchedule(lineItem.orderDetailId).then(
        setSchedule
      );
    } else {
      onComplete();
    }
  }, [lineItem]);

  const handleSelect = (startDateTime) => {
    OrderSerivce.SetOrderSchedules([
      {
        orderDetailId: lineItem.orderDetailId,
        startDateTime,
      },
    ]).then(onComplete, () => {});
  };
  return (
    <>{schedule ? <Schedule {...schedule} onSelect={handleSelect} /> : null}</>
  );
};
