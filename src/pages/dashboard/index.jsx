import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockTransactions } from "./../../data/usersData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StateBox from "./../../components/StatBox";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "./../../components/LineChart";
import BarChart from "./../../components/BarChart";
import PieChart from "./../../components/PieChart";
import ProgressCircle from "./../../components/ProgressCircle";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome To Ur Dashboard" />
        <Box>
          <Button
            sx={{
              // backgroundColor: colors.whiteAccent[700],
              backgroundColor: colors.whiteAccent[900],
              color: colors.primary[200],
              fontSize: "14px",
              fontWeight: "bold",
              p: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* Grids and Charts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Row 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.whiteAccent[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StateBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.primary[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.whiteAccent[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StateBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.5"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.primary[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.whiteAccent[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StateBox
            title="32,441"
            subtitle="New Customers"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.primary[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.whiteAccent[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StateBox
            title="1,234,123"
            subtitle="Traffic Inbound"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.primary[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Row 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.whiteAccent[900]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.primary[500]}
              >
                $50,342,42
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.primary[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* Transactions */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.whiteAccent[900]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[200]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((t, i) => (
            <Box
              key={`${t.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[200]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.primary[900]}
                  variant="h5"
                  fontWeight="600"
                >
                  {t.txId}
                </Typography>
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  {t.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{t.date}</Box>
              <Box color={colors.primary[600]} p="5px" borderRadius="4px">
                {t.cost}
              </Box>
            </Box>
          ))}
        </Box>
        {/* Row 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.whiteAccent[900]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.primary[400]}
              sx={{ mt: "15px" }}
            >
              $49,000
            </Typography>
            <Typography>Includes Extra Money</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.whiteAccent[900]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ p: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.whiteAccent[900]}
          p="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ mb: "15px"}}
          >
            Pie Chart
          </Typography>
          <Box height="100%">
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        {/* */}
      </Box>
    </Box>
  );
};

export default Dashboard;
