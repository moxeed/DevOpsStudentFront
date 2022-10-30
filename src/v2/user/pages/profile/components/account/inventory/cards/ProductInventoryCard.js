import { Button, CardActions, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import CategoryIcon from "@mui/icons-material/Category";
import PreviewIcon from "@mui/icons-material/Preview";
import EventIcon from "@mui/icons-material/Event";
import BamisCard from "../../../../../../../components/reusable/cards/_card";
import { IconTooltip } from "../../../../../../../components/utility/tooltip";

const ProductInventoryCard = ({ item }) => {
  return (
    <BamisCard>
      <Typography
        sx={{ fontSize: 14, display: "flex", alignItems: "center" }}
        color={"text.secondary"}
        gutterBottom
      >
        <CategoryIcon color={"primary"} fontSize={"small"} /> {item.name}
      </Typography>
      <Typography variant="p" component={"div"}>
        همایش عیدانه برترها برای دروس عمومی و تخصصی رشته ریاضی و فیزیک
      </Typography>
      <Typography sx={{ mb: 1.5 }} color={"text.secondary"} variant={"caption"}>
        سحر قریشی، ثنا سادات، اکبر عبدی، محسن درویشی
      </Typography>
      <CardActions>
        <Button size={"small"} variant={"contained"} disabled>
          ورود به اتاق
        </Button>
        <IconTooltip
          color={"primary"}
          text={"نمایش محصول"}
          Icon={PreviewIcon}
        ></IconTooltip>
        <IconTooltip
          color={"primary"}
          text={"تاریخ فعال سازی محصول 1400/12/12 میباشد"}
          Icon={EventIcon}
        ></IconTooltip>
      </CardActions>
    </BamisCard>
  );
};

ProductInventoryCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductInventoryCard;
