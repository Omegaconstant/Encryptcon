import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import DropdownCheck from "../components/DropdownCheck";
import axios from "axios";
import PieChartComponent from "../components/PieChartComponent";
import { List, ListItem, Typography } from "@mui/material";
import GreenIndexList from "../components/GreenIndexList";
import CustSpeedometer from "../components/CustSpeedometer";

const Services = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [greenIndexValue, setGreenIndexValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responseData, setresponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [greenIndex, setGreenIndex] = useState([]);
  const items = ["JCI", "TGT", "JPM", "VZ", "MSFT", "HPQ"];

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Set loading state to true

      const response = await axios.post("http://localhost:5000/predict", {
        start_date: startDate,
        end_date: endDate,
        assets: selectedItems,
        rm: mapModel(selectedModel),
        objective: selectedObjective,
      });

      console.log(
        "Server Response:",
        Object.entries(JSON.parse(response.data.prediction).weights).map(
          ([label, value]) => ({
            label,
            value,
          })
        )
      );
      setresponseData(
        Object.entries(JSON.parse(response.data.prediction).weights).map(
          ([label, value], id) => ({
            id,
            label,
            value,
          })
        )
      );
      setGreenIndex(
        Array.from({ length: selectedItems.length }, () => Math.random())
      );
    } catch (error) {
      console.error("Error Sending Data:", error);
    }
  };
  const models = [
    "Classic using Historical Estimates",
    "Black-Litterman model",
  ];
  const objectives = ["MinRisk", "MaxRet", "Utility", "Sharpe"];
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedObjective, setSelectedObjective] = useState("");

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleObjectiveChange = (event) => {
    setSelectedObjective(event.target.value);
  };
  const handleItemsChange = (items) => {
    setSelectedItems(items);
  };
  // Function to map the selected model value
  const mapModel = (selectedModel) => {
    switch (selectedModel) {
      case "Classic using Historical Estimates":
        return "MV";
      case "Black-Litterman model":
        return "UCI";
      default:
        return selectedModel;
    }
  };
  return (
    <Box py={4} px={2} bgcolor="background.default">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Portfolio Optimization
        </Typography>
        <Grid container spacing={4} my={2} ml={1}>
          <Grid item xs={9}>
            <DropdownCheck
              items={items}
              selectedItems={selectedItems}
              onSelectedItemsChange={handleItemsChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{ width: "90%" }}
              label="Green Index Value"
              variant="outlined"
              value={greenIndexValue}
              onChange={(e) => setGreenIndexValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Start Date"
              mx={2}
              sx={{ width: "60%" }}
              type="date"
              variant="outlined"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              sx={{ width: "60%" }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginBottom: 16 }}
            >
              <InputLabel>Select Model</InputLabel>
              <Select
                value={selectedModel}
                onChange={handleModelChange}
                label="Select Model"
              >
                {models.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Objective Function</InputLabel>
              <Select
                value={selectedObjective}
                onChange={handleObjectiveChange}
                label="Select Objective Function"
              >
                {objectives.map((objective) => (
                  <MenuItem key={objective} value={objective}>
                    {objective}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10} marginTop={1}>
            <Box textAlign="center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          {isLoading ? (
            <>
              <Grid item xs={5}>
                <>
                  {" "}
                  <Typography variant="h5" gutterBottom>
                    Investment Strategy
                  </Typography>
                  <PieChartComponent data={responseData} />
                </>
              </Grid>
              <Grid item xs={5} ml={7}>
                <>
                  {" "}
                  <GreenIndexList
                    companyNames={selectedItems}
                    greenIndices={greenIndex}
                    threshold={greenIndexValue}
                  />
                </>
              </Grid>
              <Grid xs={12}>
                <CustSpeedometer
                  value={greenIndex
                    .map((value, index) => value * responseData[index].value)
                    .reduce((acc, curr) => acc + curr, 0)}
                />
              </Grid>
            </>
          ) : (
            <div></div>
          )}{" "}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Services;
