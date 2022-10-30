import * as React from "react";
import PropTypes from "prop-types";
import { Button, CardActions, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import BamisCard from "../../../../../../../components/reusable/cards/_card";
import { IconTooltip } from "../../../../../../../components/utility/tooltip";

const ConsultInventoryCard = ({ item }) => {
  return (
    <BamisCard>
      <Typography
        sx={{ fontSize: 14, display: "flex", alignItems: "center" }}
        color={"text.secondary"}
        gutterBottom
      >
        <CategoryIcon fontSize={"small"} color={"primary"} /> {item.name}
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        رزرو تماس آفلاین 10 دقیقه ای
      </Typography>
      <Typography
        color={"text.secondary"}
        variant={"caption"}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <PersonIcon fontSize={"small"} /> محسن درویشی
      </Typography>
      <CardActions>
        <Button size={"small"} color="primary" variant={"contained"}>
          نمایش برنامه پشتیبان
        </Button>
        <IconTooltip
          color={"primary"}
          text={"تاریخ فعال سازی محصول 1400/12/12 میباشد"}
          Icon={EventIcon}
        ></IconTooltip>
      </CardActions>
    </BamisCard>
  );
};

ConsultInventoryCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default ConsultInventoryCard;
