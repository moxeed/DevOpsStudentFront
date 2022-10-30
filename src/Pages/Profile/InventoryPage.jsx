import { Container, Grid } from "@material-ui/core";
import StudentWebinars from "../../Components/Inventory/StudentWebinars";
import React from "react";

const InventoryPage = () => {
  return (
    <Container style={{ minHeight: "90vh", width: "100%" }}>
      <Grid
        container
        direction={"column"}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "12px" }}
      >
        <Grid item>
          <StudentWebinars />
        </Grid>
      </Grid>
    </Container>
  );
};
export default InventoryPage;
