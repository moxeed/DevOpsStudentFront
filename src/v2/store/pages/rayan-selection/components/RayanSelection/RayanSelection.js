import { useParams } from "react-router-dom";
import { ProductSelection } from "src/v2/store/components/Selection/ProductSelection";
import { RayanService } from "src/v2/store/service/RayanService";
import { ProductList } from "../../components/ProductList/ProductList";

const sorters = [
  { fieldName: "id", displayName: "جدید" },
  { fieldName: "name", displayName: "نام" },
  { fieldName: "price", displayName: "قیمت" },
];

export const RayanSelection = () => {
  const { productId } = useParams();

  return (
    <ProductSelection
      sorters={sorters}
      GetData={(filters) => RayanService.Products(filters, productId)}
      ProductList={ProductList}
    />
  );
};
