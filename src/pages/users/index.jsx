import Cookies from "universal-cookie";
import Header from "../../components/Header";
import { useEffect } from "react";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchallUsers } from "../../apis/Users/AllUsers";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser } from "../../apis/Users/DeleteUsers";
const Users = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IldhbGVlZCBBIiwiZW1haWwiOiJ3YWxlZWRzYWJyeXl5eUBnbWFpbC5jb20iLCJwaG9uZSI6IjAxMTI5ODAwMzA1IiwibG9jYXRpb24iOiIxMHRoIE9mIFJhbWFkYW4iLCJyb2xlIjo1MDUwLCJpYXQiOjE2NzY5MzEzMjMsImV4cCI6MTY3NzAxNzcyM30.1a7hddPIqu43OY3MAe0bghsVUf9qBoGdhYOILjIbQKg";
  // Variables.
  const cookies = new Cookies();
  const usersData = useSelector((state) => state.allUsers.data.All_Users);
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "PHONE",
      type: "number",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role, _id } }) => {
        return (
          <Box
            onClick={() => changePermission(_id)}
            width="60%"
            p="5px"
            display="flex"
            backgroundColor={
              role === 5050 ? colors.primary[900] : colors.primary[500]
            }
            borderRadius="4px"
          >
            {role === 5050 ? (
              <AdminPanelSettingsOutlinedIcon />
            ) : role === 2500 ? (
              <LocalShippingOutlinedIcon />
            ) : role === 5000 ? (
              <MoneyOutlinedIcon />
            ) : (
              <PersonOutlineOutlinedIcon />
            )}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role === 5050
                ? "Admin"
                : role === 2500
                ? "SR"
                : role === 5000
                ? "Accountant"
                : "User"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Action",
      renderCell: ({ row: { _id } }) => {
        return (
          <Box>
            <IconButton onClick={() => handleDeleteUser(_id)}>
              <DeleteIcon sx={{ color: "#B22222" }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  // Functions

  const changePermission = (_id) => {
    console.log(`Permission Clicked And User Id Is ${_id}`); /////////////////////// Stopped Here. ##
  };

  const handleDeleteUser = async (_id) => {
    await dispatch(deleteUser({ _id })).then(() => {
      dispatch(fetchallUsers());
    });
  };

  useEffect(() => {
    dispatch(fetchallUsers());
    cookies.set("token", token);
    cookies.set("username", "Waleed A");
  }, [dispatch]);

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="Manage Users" />
      <Box m="40px 0 0 0" height="75vh">
        {/* sx={{ "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: "white !important" } }} */}
        {usersData ? (
          <DataGrid
            rows={usersData.map((user, index) => ({
              id: index + 1,
              ...user,
            }))}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <DataGrid
            rows={[]}
            columns={[]}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
