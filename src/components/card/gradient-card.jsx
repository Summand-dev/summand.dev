import PropTypes from "prop-types";
import { forwardRef, ReactElement } from "react";
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";
import { Card } from "@mui/material";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const GradientCard = forwardRef(
  (
    {
      children,
      borderRadius = 2,
      borderWidth = 2,
      fullWidth = false,
      ...other
    },
    ref
  ) => (
    <Box
      sx={{
        borderRadius: borderRadius,
        background:
          "linear-gradient(146.84deg, #A586FF 19.76%, #547AFF 90.92%)",
      }}
    >
      <Card
        ref={ref}
        className="card-gradient"
        sx={{
          border: borderWidth,
          borderRadius: borderRadius,
          borderColor: "transparent",
          flexGrow: fullWidth ? 1 : 0,
          ...other,
        }}
      >
        {children}
      </Card>
    </Box>
  )
);

GradientCard.propTypes = {
  children: PropTypes.any,
  fullWidth: PropTypes.bool,
  borderRadius: PropTypes.oneOfType([PropTypes.number]),
  borderWidth: PropTypes.oneOfType([PropTypes.number]),
};

export default GradientCard;
