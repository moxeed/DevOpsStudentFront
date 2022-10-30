import { Button, CardActions, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import BamisCard from "../../../../../../../components/reusable/cards/_card";
import { IconTooltip } from "../../../../../../../components/utility/tooltip";


const ExamInventoryCard = ({ item }) => {
  return (
    <BamisCard>
      <Typography
        sx={{ fontSize: 14, display: "flex", alignItems: "center" }}
        color={"text.secondary"}
        gutterBottom
      >
        <CategoryIcon fontSize={"small"} color={"secondary"} /> {item.name}
      </Typography>
      <Typography variant="p" component={"div"}>
        آزمون دروس عمومی کنکور 1400
      </Typography>
      <CardActions>
        <Button
          size={"small"}
          variant={"contained"}
          color={"secondary"}
          disabled
        >
          ورود به آزمون
        </Button>
        <div>
          <IconTooltip
            color={"secondary"}
            text={"تاریخ شروع 1400/12/12 ساعت 14:30 میباشد"}
            Icon={EventIcon}
          />
        </div>
      </CardActions>
    </BamisCard>
  );
};

ExamInventoryCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExamInventoryCard;
