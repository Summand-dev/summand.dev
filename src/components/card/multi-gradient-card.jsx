import PropTypes from "prop-types";
import { forwardRef, ReactElement } from "react";
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import { bgBlur } from "@/src/theme/css";
import { Opacity } from "@mui/icons-material";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const MultiGradientCard = forwardRef(
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
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -25,
          right: -25,
          height: 1,
          width: 1,
          borderRadius: borderRadius,
          background:
            "linear-gradient(127.97deg, #587DFF 6.54%, #A586FF 67.15%)",
        }}
      ></Box>
      <Box
        sx={{
          borderRadius: borderRadius,
          position: "relative",
        }}
      >
        <Card
          ref={ref}
          className="card-gradient"
          sx={{
            ...bgBlur({
              opacity: 0.3,
              color: "#E4E4E433",
              blur: 25,
            }),
            border: borderWidth,
            borderRadius: borderRadius,
            borderColor: "white",
            flexGrow: fullWidth ? 1 : 0,
            ...other,
          }}
        >
          {children}
        </Card>
      </Box>
    </Box>
  )
);

MultiGradientCard.propTypes = {
  children: PropTypes.any,
  fullWidth: PropTypes.bool,
  borderRadius: PropTypes.oneOfType([PropTypes.number]),
  borderWidth: PropTypes.oneOfType([PropTypes.number]),
};

export default MultiGradientCard;
