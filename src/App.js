import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Products from "./pages/products";
import Orders from "./pages/orders";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/Error/index";
import Bar from "./pages/BarChart";
import Pie from "./pages/PieChart";
import Line from "./pages/LineChart/index";
import SrOrders from "./pages/orders/srorders";
import { isMobile } from "react-device-detect";
import Login from "./pages/Auth/Login";
import Cookies  from "universal-cookie";
import Forgot from "./pages/Auth/Forget";
import Reset from './pages/Auth/Reset';
import Update from './pages/Auth/Update';
function App() {
  const cookies = new Cookies();
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {cookies.get("token") ? (
          isMobile ? (
            <div style={{ width: "100%", height: "100%" }}>
              PLEASE TURN ON DESKTOP MODE
            </div>
          ) : (
            <div className="App">
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/*" element={<ErrorPage />} />
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/srorders" element={<SrOrders />} />
                </Routes>
              </main>
            </div>
          )
        ) : (
            <Routes>
              <Route path="/*" element={<Login/>}></Route>
              <Route path="/forgot" element={<Forgot/>}></Route>
              <Route path="/reset" element={<Reset/>}></Route>
              <Route path="/update" element={<Update/>}></Route>
            </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
