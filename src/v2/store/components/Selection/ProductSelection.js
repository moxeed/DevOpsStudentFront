import {
  Container,
  Grid,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FilterSection } from "./FilterSection/FilterSection";
import classes from "./ProductSelection.module.scss";
import { SorterSection } from "./SorterSection/SorterSection";

const CardPerPage = 16;

export const ProductSelection = ({
  sorters,
  GetData,
  filtersSection,
  ProductList = () => <div></div>,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    orderBy: "id",
    ascending: true,
    page: 1,
    length: CardPerPage,
  });
  const [data, setData] = useState();

  useEffect(() => {
    setData();
    GetData(filters).then(setData);
  }, [filters]);

  return (
    <Container
      className={classes.ProductSelesction}
      sx={{
        maxWidth: { md: "84%", xs: "100%" },
      }}
      so
    >
      <Grid container>
        {sorters && (
          <Grid item xs={12}>
            <SorterSection
              sorter={filters}
              setSorter={setFilters}
              sorters={sorters}
            />
          </Grid>
        )}
        {filtersSection && (
          <Grid
            item
            xs={12}
            sm={3}
            sx={{ display: { sm: "block", xs: "none" } }}
          >
            <FilterSection filters={filtersSection} />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={filtersSection ? 9 : 12}
          sx={{ display: "grid", placeItems: "center", mt: 4 }}
        >
          {data ? (
            <>
              <ProductList data={data.rows} />
              <Stack spacing={2} sx={{ width: "100%", mt: 5 }}>
                <Pagination
                  size="large"
                  count={Math.ceil(data.totalCount / CardPerPage)}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  page={filters.page}
                  onChange={(e, v) => setFilters({ ...filters, page: v })}
                />
              </Stack>
            </>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
