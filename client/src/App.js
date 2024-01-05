import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Insights } from "./pages/Insights";
import { News } from "./pages/News";
import Services from "./pages/Services";
import { Navigation } from "./components/Navigation";
import Footer from "./components/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#224957",
    },
    secondary: {
      main: "#20DF7F",
    },
  },
  typography: {
    fontFamily: "Lexend Deca",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightBold: 700,
    fontWeightMedium: 600,
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/news" element={<News />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
