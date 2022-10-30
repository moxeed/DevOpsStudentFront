import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceVitrine } from "../../Components/Financial/ServiceVitrine";
import ProductPicker from "../../Components/Package/ProductPicker";
import ProviderinfoTab from "../../Components/Provider/ProviderInfoTab";
import ProviderProfile from "../../Components/Provider/ProviderProfile";
import ProductService from "../../Services/Product/PackageService";
import ProviderIntro from "../../Components/Provider/ProvidersIntro";
import usePersistedState from "../../Utility/usePersistedState";
import ProvidersIntro from "../../Components/Tutoring/ProvidersIntro";
import { SelectSchedules } from "../../Components/Financial/SelectSchedules";

const useStyles = makeStyles(() => ({
  section: {
    "&>*": {
      padding: "5px",
    },
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

const ProviderPage = () => {
  const [subCategories, setsubCategories] = useState();
  const [subCategory, setSubCategory] = usePersistedState("KSMX", 0);
  const { category, providerId } = useParams();
  const { providerStatus, setProviderStatus } = useState(false);
  const classes = useStyles();

  useEffect(() => {
    ProductService.GetSubCategories("Consultation").then(
      (response) => {
        setsubCategories(response.data);
        if (response.data.length > 0 && subCategory === 0) {
          const subCategoryId = response.data[0].productSubCategoryId;

          setSubCategory(subCategoryId);
        }
      },
      () => {}
    );
  }, [providerId, category]);

  const offlineConsultAction = (obj) => {
    return SelectSchedules(obj);
  };

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      className={classes.section}
    >
      <Grid container xs={12} md={2} justifyContent="center">
        <Grid xs={12} sm={10} md={12} item>
          <ProviderProfile
            providerId={providerId}
            setStatus={setProviderStatus}
          />
        </Grid>
        <Grid xs={12} sm={10} md={12} item>
          <ProvidersIntro providerId={providerId} category="Consulation" />
        </Grid>
      </Grid>
      {providerStatus}
      <Grid
        container
        justifyContent="center"
        xs={12}
        md={10}
        spacing={1}
        style={{ flexWrap: "wrap-reverse" }}
      >
        <Grid item xs={12} sm={10} md={7}>
          <Paper style={{ height: "100%" }} className={classes.paper}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <ProviderIntro />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={10}
          md={5}
          justifyContent="center"
          alignItems="cneter"
        >
          <Paper
            style={{
              paddingBottom: 20,
              marginBottom: 15,
              width: "100%",
            }}
          >
            <ProductPicker
              data={subCategories}
              onSelect={setSubCategory}
              selectedCategory={subCategory}
            />
          </Paper>
          <Paper style={{ flexGrow: 1 }}>
            <ServiceVitrine
              subCategory={subCategory}
              providerId={providerId}
              postActions={offlineConsultAction}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={12}>
          <Paper style={{ width: "100%" }}>
            <ProviderinfoTab providerId={providerId} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProviderPage;
