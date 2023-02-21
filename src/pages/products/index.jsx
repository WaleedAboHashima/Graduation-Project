import { Box, IconButton, Tooltip } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllProducts } from "./../../apis/Products/AllProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../../apis/Products/DeleteProduct";
const Products = () => {
  // Vairables
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.allProducts.data.Products);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "img",
      headerName: "Image",
      renderCell: ({ row: { img } }) => {
        return (
          <img
            src={`http://192.168.1.2:8000/${img}`}
            style={{ padding: "5px 0" }}
            alt={img}
            width="auto"
            height="100%"
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "flavor", headerName: "Flavor", flex: 1 },
    { field: "price", headerName: "Price", flex: 1, type: "number" },
    { field: "quantity", headerName: "Quantity", flex: 1, type: "number" },
    { field: "weight", headerName: "Weight", flex: 1, type: "number" },
    { field: "validDate", headerName: "Validation Date", flex: 1 },
    { field: "expDate", headerName: "Expiration Date", flex: 1 },
    { field: "createdAt", headerName: "Creation Date", flex: 1 },
    { field: "updatedAt", headerName: "Last Updated", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
        return (
          <Box>
            <IconButton onClick={() => handleDeleteProduct(_id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  // Functions
  const handleDeleteProduct = async (_id) => {
    await dispatch(deleteProduct({ _id })).then(() =>
      dispatch(fetchAllProducts())
    );
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="Products are listed below." />
      <Box marginTop="40px" height="75vh">
        {productsData ? (
          <DataGrid
            rows={productsData.map((product, index) => ({
              id: index + 1,
              ...product,
            }))}
            columns={columns}
            getRowId={(row) => row._id}
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

export default Products;
