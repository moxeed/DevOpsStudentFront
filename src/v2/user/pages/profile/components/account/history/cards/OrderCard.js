import * as React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import BamisCard from "../../../../../../../components/reusable/cards/_card";
import { IconTooltip } from "../../../../../../../components/utility/tooltip";
import { tomanConverter } from "../../../../../../../components/utility/converters";
import { warningToast } from "../../../../../../../components/utility/toast";


const OrderCard = ({ item, isBasket = false }) => {
  return (
    <BamisCard>
      <Grid container spacing={2} direction={"column"}>
        <Grid item>
          <Typography component={"div"} variant={"p"} sx={{ mb: 2 }}>
            <IconTooltip
              color={isBasket ? "secondary" : "success"}
              text="نمایش محصول"
              Icon={PreviewIcon}
            />
            {item.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant={"caption"}
            color={"text.secondary"}
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <EventIcon fontSize={"small"} />
            1400/02/09
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6} sx={{ display: "flex" }}>
            <Typography
              variant={"caption"}
              color={"text.secondary"}
              component={"div"}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PaidIcon fontSize={"small"} />
              {tomanConverter(12000)}
            </Typography>
          </Grid>
          {isBasket ? (
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
              <IconTooltip
                onClick={() => warningToast("محصول از سبد حذف شد")}
                text={"حذف از سبد"}
                color={"secondary"}
                Icon={DeleteIcon}
              />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </BamisCard>
  );
};

OrderCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isBasket: PropTypes.bool,
};

export default OrderCard;
