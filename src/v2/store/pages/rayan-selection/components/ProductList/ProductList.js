import { Container, Grid } from "@mui/material";
import img404 from "src/v2/assets/images/notFound.png";
import RayanCard from "../RayanCard/RayanCard";

export const ProductList = ({ data }) => {
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        minHeight: "30vh",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        xs={12}
        md={12}
      >
        {data && data.length > 0 ? (
          data.map((p, i) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={3}
              xl={3}
              container
              justifyContent="center"
              key={i}
              style={{ direction: "ltr", marginBottom: 4 }}
            >
              <RayanCard item={p} />
            </Grid>
          ))
        ) : (
          <img
            width="100%"
            style={{ maxWidth: "20em", height: "auto", margin: 10 }}
            src={img404}
            alt="چیزی برای نمایش یافت نشد"
          />
        )}
      </Grid>
    </Container>
  );
};
