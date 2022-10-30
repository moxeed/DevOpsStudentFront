import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { ServiceVitrineTouring } from "../../Components/Financial/ServiceVitrineTouring";
import ProductPicker from "../../Components/Package/ProductPicker";
import ProviderinfoTab from "../../Components/Provider/ProviderInfoTab";
import ProvidersIntro from "../../Components/Tutoring/ProvidersIntro";
import ProductService from "../../Services/Product/PackageService";
import TutoringIntro from "../../Components/Tutoring/TutoringIntro";
import usePersistedState from "../../Utility/usePersistedState";
import Questionnaire from "../../Components/Tutoring/Questionnaire";
import TutoringCard from "src/v2/components/reusable/cards/TutoringCard/TutoringCard";
import ProviderService from "src/Services/Provider/ProviderService";
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

const TutoringPage = () => {
  const [subCategories, setsubCategories] = useState();
  const [subCategory, setSubCategory] = usePersistedState("SLCJ", 0);
  const { category, providerId, courseId } = useParams();
  const [busyProvider, setBusyProvider] = useState();
  const classes = useStyles();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (providerId)
      ProviderService.GetTutoringProviderProfile(providerId).then((res) => {
        setProfile(res.data);
      });
  }, [providerId]);
  useEffect(() => {
    ProductService.GetSubCategories("Tutoring").then((response) => {
      setsubCategories(response.data);
      if (response.data.length > 0 && subCategory === 0) {
        const subCategoryId = response.data[0].productSubCategoryId;
        setSubCategory(subCategoryId);
      }
    });
  }, [providerId, category, subCategory, setSubCategory]);

  useEffect(() => {
    ProductService.GetCheckAnotherCa(providerId).then((res) => {
      setBusyProvider(res);
    });
  }, [busyProvider, providerId]);

  const offlineTutoring = (obj) => {
    return Questionnaire(obj);
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
          <TutoringCard item={profile} />
        </Grid>
        <Grid xs={12} sm={10} md={12} item>
          <ProvidersIntro providerId={providerId} category="Tutoring" />
        </Grid>
      </Grid>
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
                {busyProvider === true ? (
                  <Paper
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      className={"Text-Type-Ex"}
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        marginTop: "auto",
                        lineHeight: "50px",
                        color: "red",
                      }}
                    >
                      پشتیبان با فرد دیگری در کلاس می باشد لطفا تدریس خصوصی
                      آفلاین را جهت رزرو تدریس خصوصی کلیک کنید.
                    </Typography>
                  </Paper>
                ) : null}

                <TutoringIntro providerId={providerId} />
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
            <ServiceVitrineTouring
              subCategory={subCategory}
              providerId={providerId}
              courseId={courseId}
              postAction={offlineTutoring}
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

export default TutoringPage;
