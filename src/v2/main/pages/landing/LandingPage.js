import * as React from "react";
import Container from "@mui/material/Container";
import Main from "./components/Main";

const LandingPage = () => {
  return (
    <Container sx={{ maxWidth: { md: "84%", xs: "100%" } }}>
      <Main />
    </Container>
  );
};

export default LandingPage;
