import React from "react";
import { List, ListItem, Typography, Box } from "@mui/material";
import { green, red } from "@mui/material/colors";

const GreenIndexList = ({ companyNames, greenIndices, threshold }) => {
  // Combine company names and green indices into an array of objects
  const companies = companyNames.map((name, index) => ({
    name,
    greenIndex: greenIndices[index],
  }));

  // Sort companies by greenIndex in descending order
  const sortedCompanies = [...companies].sort(
    (a, b) => b.greenIndex - a.greenIndex
  );

  const getColor = (percent) => {
    return percent > threshold ? green[500] : red[500];
  };

  return (
    <Box mt={6} p={2} bgcolor="background.paper" borderRadius={2} boxShadow={3}>
      <Typography variant="h6" mb={3} color="primary">
        Green Index Rankings
      </Typography>
      <List disablePadding>
        {sortedCompanies.map((company, index) => (
          <ListItem
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: getColor(company.greenIndex, threshold),
            }}
          >
            <Typography
              variant="body1"
              flex={1}
              color="text.primary"
            >
              {company.name}
            </Typography>
            <Typography variant="body" color="text.primary">
              {company.greenIndex}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GreenIndexList;
