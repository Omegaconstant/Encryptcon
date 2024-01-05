import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
const Insight = () => {
    const [stockSymbol, setStockSymbol] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stockData, setStockData] = useState([]);
    const [esgData, setEsgData] = useState([]);

    const handleSymbolChange = (event) => {
        setStockSymbol(event.target.value.toUpperCase());
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = (e) => {
        fetchData();
    };

    const fetchData = async () => {
        try {
            const accessKey = "370fe978d455d59ffd38a3a19ba5897e";

            const apiUrl = `https://cors-anywhere.herokuapp.com/http://api.marketstack.com/v1/eod?access_key=${accessKey}&symbols=${stockSymbol}&date_from=${startDate}&date_to=${endDate}`;

            const response = await axios(apiUrl, {
                headers: {
                    referrerPolicy: "unsafe-url",
                },
            });
            const data = response.data;
            console.log(data);

            const stockValues = data.data.map((item) => ({
                time: item.date,
                price: item.close,
                volume: item.volume,
            }));
            setStockData(stockValues);

            // Fetch ESG data from Yahoo Finance

            const response_esg = await axios.get(
                `https://cors-anywhere.herokuapp.com/https://query2.finance.yahoo.com/v1/finance/esgChart?symbol=${stockSymbol}`,
                { headers: { "Access-Control-Allow-Origin": "*" } }
            );
            const dataEsg = response_esg.data;
            console.log(dataEsg);

            const esgChartData =
                dataEsg?.esgChart?.result[0]?.symbolSeries || [];

            console.log("ESGCHARTDATA: ",esgChartData.keys(obj).map(key=>({...})));
            const format_data = Object.keys(esgChartData).map(
                (key) => esgChartData[data]
            );
            const formattedData = esgChartData.data.map((item) => ({
                timestamp: new Date(item.timestamp * 1000).toISOString(),
                esgScore: item.esgScore,
            }));

            setEsgData(formattedData);
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
        <div>
            <h1>Stock Market Insights</h1>
            <div>
                <label>
                    Stock Symbol:
                    <input
                        type="text"
                        value={stockSymbol}
                        onChange={handleSymbolChange}
                    />
                </label>
                <br />
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </label>
                <button onClick={handleSubmit}>Search</button>
            </div>
            <Plot
                data={plotData}
                layout={{
                    width: 800,
                    height: 500,
                    title: "Time vs Stock Price",
                }}
            />
            <Plot
                data={plotESG}
                layout={{ width: 400, height: 500, title: "ESG Score" }}
            />
        </div>
    );
};

export default Insight;
