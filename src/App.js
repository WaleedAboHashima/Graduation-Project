import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Users from './pages/users';
import Products from "./pages/products";
import Orders from "./pages/orders";
import { Routes, Route } from "react-router-dom";
import ErrorPage from './pages/Error/index';
import Bar from "./pages/BarChart";
import Pie from "./pages/PieChart";
import Line from './pages/LineChart/index';
import SrOrders from "./pages/orders/srorders";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
