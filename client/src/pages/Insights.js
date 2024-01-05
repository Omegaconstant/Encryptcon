import React, { useState } from "react";
import Stock from "../media/stock.png"; // Import your image file

import Plot from "react-plotly.js";
import {
    TextField,
    Button,
    Grid,
    Typography,
    FormControl,
} from "@mui/material";

const Insights = () => {
    const [stockSymbol, setStockSymbol] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stockData, setStockData] = useState([]);
    const [esgData, setEsgData] = useState([]);
    const [loading, setIsLoading] = useState(false);

    const handleSymbolChange = (event) => {
        setStockSymbol(event.target.value.toUpperCase());
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = () => {
        fetchData();
    };

    const fetchData = async () => {
        try {
            const accessKey = "DT3S3MdWgPuT0nyCvJWb4eyU6JEqX8Rz";
            const proxyUrl = "https://cors-anywhere.herokuapp.com/";
            const period1 = Math.floor(new Date(startDate).getTime() / 1000); // Start date in Unix timestamp format
            const period2 = Math.floor(new Date(endDate).getTime() / 1000); // End date in Unix timestamp format

            // const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}?period1=${period1}&period2=${period2}&interval=1d`;

            // const response = await fetch(proxyUrl + apiUrl);
            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            // }

            // const data = await response.json();
            // console.log(data.chart.result);
            // // console.log(data.chart);

            // const stockValues = data.chart.result[0].indicators.quote.map(
            //     (item, index) => {
            //         return {
            //             time: new Date(
            //                 data.chart.result[0].timestamp[index] * 1000
            //             ).toISOString(), // Convert date to a string format (e.g., "2024-01-05T12:30:00.000Z")
            //             price: item.close,
            //             volume: item.volume,
            //         };
            //     }
            // );
            // setStockData(stockValues);
            // console.log(stockData);
            setIsLoading(true);

            // Fetch ESG data from Yahoo Finance
            // Code for fetching ESG data is commented out for now
        } catch (error) {
            console.error("Error fetching data:", error);
            setStockData([]);
            setEsgData([]);
        }
    };

    const plotData = [
        {
            x: stockData.map((item) => item.time),
            y: stockData.map((item) => item.price),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
        },
    ];

    const plotESG = [
        {
            x: esgData.map((item) => item.timestamp),
            y: esgData.map((item) => item.esgScore),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "green" },
            name: "ESG Score",
        },
    ];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3" gutterBottom>
                    Stock Market Insights
                </Typography>
                <FormControl>
                    <TextField
                        label="Stock Symbol"
                        value={stockSymbol}
                        onChange={handleSymbolChange}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        style={{ marginTop: "15px" }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            {loading ? (
                <>
                    <Grid item xs={12} ml={2} sx={{ width: "50%" }}>
                        <img src={Stock} alt="My Image" />
                    </Grid>
                </>
            ) : (
                <></>
            )}
        </Grid>
    );
};

export default Insights;
