import React from "react";
import Speedometer from "react-d3-speedometer";
import { Typography, Box } from "@mui/material";

const CustSpeedometer = ({ value }) => {
  return (
    <Box textAlign="center" mt={2}>
      <Typography variant="h5" gutterBottom  color="text.primary">
        Weighted Green Index Measure
      </Typography>
      <Speedometer
        value={parseFloat(value.toFixed(3))}
        minValue={0}
        maxValue={1}
        width={500}
        height={500}
        needleColor="steelblue"
        startColor="tomato"
        segments={10}
        endColor="lightgreen"
      />
   
    </Box>
  );
};

export default CustSpeedometer;
