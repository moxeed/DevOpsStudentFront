import React from "react";
import SelectionContainer from "../../Components/Reusable/SelectionContainer";
import ProviderList from "../../Components/Provider/ProviderList";
import ProviderService from "../../Services/Provider/ProviderService";
import ProviderIntro from "../../Components/Provider/ProvidersIntro";
const ProviderSelectionPage = () => {
  const sortCols = [
    { name: " نام خانوادگی", id: "lastName" },
    { name: " رتبه کشوری", id: "rankTotal" },
    { name: "امتیاز", id: "starRate" },
  ];
  return (
    <SelectionContainer
      getFilters={(filters) =>
        ProviderService.GetProviderFilter("Consultation", filters)
      }
      getData={(filters) =>
        ProviderService.GetProviders("Consultation", filters)
      }
      pageList={ProviderList}
      sortCols={sortCols}
      Description={<ProviderIntro />}
      category="Consultation"
    />
  );
};
export default ProviderSelectionPage;
