import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";

const GreenIndexList = ({ companyNames, greenIndices }) => {
  // Combine company names and green indices into an array of objects
  const companies = companyNames.map((name, index) => ({
    name,
    greenIndex: greenIndices[index],
  }));

  // Sort companies by greenIndex in descending order
  const sortedCompanies = [...companies].sort(
    (a, b) => b.greenIndex - a.greenIndex
  );

  const backgroundGradient = `linear-gradient(to bottom, ${green[700]}, ${red[300]})`;

  return (
    <List sx={{ background: backgroundGradient,padding:"0.8rem",marginTop:"3rem" }}>
      {sortedCompanies.map((company, index) => (
        <ListItem
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" style={{ flex: 1 }}>
            {company.name}
          </Typography>
          <Typography variant="body1">{company.greenIndex}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default GreenIndexList;
