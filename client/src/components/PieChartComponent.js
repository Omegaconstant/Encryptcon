// PieChartComponent.js
import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography,Box } from '@mui/material';



const PieChartComponent = ({data}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
     
      <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 40, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={300}
    />
    </Box>
  );
};

export default PieChartComponent;
