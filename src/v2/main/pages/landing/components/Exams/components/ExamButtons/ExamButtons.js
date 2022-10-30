import { Grid, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";

export const ExamButtons = ({ item, id }) => {
  if (item.courses) {
    return (
      <Grid sx={{ ml: 7 }} item>
        {item.courses.slice(0, 3).map((filter, id) => (
          <Grid xs={6} key={id} sx={{ m: 2 }}>
            <BlueButton
              label={filter.name}
              type={Link}
              link={`/Selection/Product/CourseQuiz/${item.group.id}/${filter.id}`}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Grid sx={{ ml: 7 }} item>
      <Grid
        xs={6}
        key={id}
        sx={{
          m: 2,
        }}
      >
        {[...Array(3)].map((item, _id) => (
          <Skeleton key={_id} variant="rectangular" width={200} height={45} />
        ))}
      </Grid>
    </Grid>
  );
};
