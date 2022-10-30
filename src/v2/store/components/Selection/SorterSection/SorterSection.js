import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Align from "src/v2/assets/images/Icons/textalign-right.svg";
import classes from "../ProductSelection.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { embolden } from "src/v2/components/utility/converters";

export const SorterSection = ({ sorters, sorter, setSorter }) => {
  const [search, setSearch] = useState("");
  return (
    <Box sx={{ mt: { md: 10, xs: 5 } }} className={classes.SorterSection}>
      <Grid container alignItems="center" sx={{ p: 2 }}>
        <Grid item xs={12} sm={6} container justifyContent={"center"}>
          <TextField
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            sx={{
              input: { direction: "ltr", textAlign: "left" },
              backgroundColor: "#fff",
              mx: { md: 5, xs: 1 },
            }}
            label={"جست‌و‌جوی عنوان"}
            placeholder="نام محصول را وارد کنید"
            InputProps={{
              endAdornment: (
                <IconButton
                  color="primary"
                  component="label"
                  onClick={() => {
                    embolden(search);
                    setSorter({ ...sorter, search, page: 1 });
                  }}
                >
                  <SearchIcon className={classes.SearchIcon} fontSize="large" />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          justifyContent={"center"}
          sx={{ mt: { sm: 0, xs: 5 } }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "90%",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <img src={Align} />
              مرتب سازی بر اساس
            </Typography>
            <ButtonGroup sx={{ justifyContent: "center" }}>
              {sorters.slice(0, 3).map((item, key) => (
                <Button
                  key={key}
                  className={
                    classes.SorterButton +
                    " " +
                    (item.fieldName === sorter.orderBy
                      ? classes.ActiveButton
                      : classes.DeactiveButton)
                  }
                  onClick={() =>
                    setSorter({ ...sorter, orderBy: item.fieldName })
                  }
                >
                  {item.displayName}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
