import * as React from "react";
import { useEffect, useState } from "react";
import ProductService from "../../Services/Product/PackageService";
import Vitrine from "../Package/Vitrine";

export const ServiceVitrine = ({ subCategory, providerId, postActions }) => {
  const [vitrine, setVitrine] = useState();

  useEffect(() => {
    ProductService.GetServiceVitrine(subCategory, providerId)

      .then(setVitrine)
      .catch();
  }, [subCategory, providerId]);

  return (
    <Vitrine
      data={vitrine}
      subCategory={subCategory}
      postActions={postActions}
    />
  );
};
