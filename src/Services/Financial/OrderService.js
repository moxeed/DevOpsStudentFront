import HttpEngine from "../Engines/CoreEngine";

const routes = {
  placeOrder: "/Order/Place",
  getCurrentOrder: "/Order",
  applyDiscountCode: "/Order/Discount/",
  cancelCurrentOrder: "/Order/Cancel",
  checkOutCurrentOrder: "/Order/Checkout",
  orderSchedules: "/Order/Schedule",
};

const OrderSerivce = {
  PlaceOrder: (items) => {
    return HttpEngine.Post(routes.placeOrder, { details: items });
  },
  GetCurrentOrder: async () => {
    const res = await HttpEngine.Get(routes.getCurrentOrder);
    return res.data;
  },
  ApplyDiscountCode: (discountCode) => {
    return HttpEngine.Post(routes.applyDiscountCode + discountCode);
  },
  CancelCurrentOrder: () => HttpEngine.Post(routes.cancelCurrentOrder),
  CheckOutCurrentOrder: () => HttpEngine.Post(routes.checkOutCurrentOrder),
  GetCurrentOrderSchedule: async (orderDetailId) => {
    const { data } = await HttpEngine.Get(
      routes.orderSchedules + "/" + orderDetailId
    );
    return data;
  },
  SetOrderSchedules: async (selectedTimes) => {
    const { data } = await HttpEngine.Post(
      routes.orderSchedules,
      selectedTimes
    );
    return data;
  },
};

export default OrderSerivce;
