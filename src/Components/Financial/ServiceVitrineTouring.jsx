import * as React from "react";
import { useEffect, useState } from "react";
import ProductService from "../../Services/Product/PackageService";
import Vitrine from "../Package/Vitrine";

export const ServiceVitrineTouring = ({
  subCategory,
  providerId,
  courseId,
  postAction,
}) => {
  const [vitrine, setVitrine] = useState();

  useEffect(() => {
    ProductService.GetServiceVitrineTouring(subCategory, providerId, courseId)
      .then(setVitrine)
      .catch();
  }, [subCategory, providerId, courseId]);

  return (
    <Vitrine
      data={vitrine}
      subCategory={subCategory}
      postActions={postAction}
    />
  );
};
