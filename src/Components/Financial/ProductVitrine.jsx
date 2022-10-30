import * as React from "react";
import { useEffect, useState } from "react";
import eventBus from "../../Common/EventBus/EventBus";
import ProductService from "../../Services/Product/PackageService";
import Vitrine from "../Package/Vitrine";
import OrderEvents from "./OrderEvents";

export const ProductVitrine = ({ subCategory, productId, AfterPurchased }) => {
  const [vitrine, setVitrine] = useState();

  const updateData = () => {
    ProductService.GetProductVitrine(subCategory, productId)
      .then(setVitrine)
      .catch();
  };

  useEffect(() => {
    ProductService.GetProductVitrine(subCategory, productId)
      .then(setVitrine)
      .catch();
  }, [subCategory, productId]);

  useEffect(() => {
    eventBus.on(OrderEvents.orderCompeleted, updateData);
    return () => eventBus.remove(OrderEvents.orderCompeleted, updateData);
  }, []);

  return (
    <Vitrine
      data={vitrine}
      subCategory={subCategory}
      AfterPurchased={AfterPurchased}
    />
  );
};
