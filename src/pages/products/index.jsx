import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "./../../apis/Products/AllProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../../apis/Products/DeleteProduct";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import { fetchAddProduct } from "./../../apis/Products/AddProduct";
const Products = () => {
  // Vairables
  /* Add Product */
  const theme = useTheme();
  const [productImage, setProductImage] = useState();
  const [productName, setProductName] = useState();
  const [productNameAR, setProductNameAR] = useState();
  const [productFlavor, setProductFlavor] = useState();
  const [productFlavorAR, setProductFlavorAR] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productWeight, setProductWeight] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [productValid, setProductValid] = useState();
  const [productExpire, setProductExpire] = useState();
  // Other Variables
  const dispatch = useDispatch();
  const [productImgPreview, setProductImgPreview] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const colors = tokens(theme.palette.mode);
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
            <Tooltip title="Delete" placement="right">
              <IconButton onClick={() => handleDeleteProduct(_id)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  /* Functions */

  // Image Preview

  const handleImagePreview = (e) => {
    setProductImgPreview({
      file: URL.createObjectURL(e.target.files[0]),
    });
  };
  // Api Calls
  const handleDeleteProduct = async (_id) => {
    await dispatch(deleteProduct({ _id })).then(() =>
      dispatch(fetchAllProducts())
    );
  };

  // Form
  const handleAddForm = async () => {
    const formData = new FormData();
    formData.append("productImg", productImage);
    formData.append("name", productName);
    formData.append("nameAR", productNameAR);
    formData.append("flavor", productFlavor);
    formData.append("flavorAR", productFlavorAR);
    formData.append("price", productPrice);
    formData.append("quantity", productQuantity);
    formData.append("weight", productWeight);
    formData.append("validDate", productValid);
    formData.append("expDate", productExpire);
    await dispatch(fetchAddProduct(formData)).then(() => {
      setFormOpen(false);
      dispatch(fetchAllProducts());
    });
  };

  const handleCloseForm = () => {
    if (formOpen) {
      setFormOpen(false);
    } else {
      setFormOpen(true);
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PRODUCTS" subtitle="Products are listed below." />
        <Button
          sx={{
            // backgroundColor: colors.whiteAccent[700],
            backgroundColor: colors.whiteAccent[900],
            color: colors.primary[200],
            fontSize: "14px",
            fontWeight: "bold",
            p: "10px 20px",
          }}
          onClick={handleCloseForm}
        >
          <AddIcon sx={{ mr: "10px" }} />
          Add Products
        </Button>
      </Box>
      <Dialog open={formOpen} onClose={handleCloseForm}>
        <DialogTitle>Add Product</DialogTitle>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <img
            width="150px"
            height="auto"
            src={productImgPreview.file}
            alt="Logo"
          />
          <Button variant="contained" component="label" sx={{ width: "75%" }}>
            Upload
            <input
              onChange={(e) => {
                handleImagePreview(e);
                setProductImage(e.currentTarget.files[0]);
              }}
              hidden
              accept="image/*"
              multiple
              type="file"
            />
          </Button>
        </Box>
        <DialogContent>
          <DialogContentText>Product Details</DialogContentText>
          <Formik
            onSubmit={handleAddForm}
            initialValues={initialValues}
            validateSchema={validateSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} onBlur={handleBlur}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  onChange={handleChange}
                  onChangeCapture={(e) => setProductName(e.target.value)}
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  value={values.name}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  onChange={handleChange}
                  id="nameAR"
                  onChangeCapture={(e) => setProductNameAR(e.target.value)}
                  label="Name AR"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!touched.nameAR && !!errors.nameAR}
                  helperText={touched.nameAR && errors.nameAR}
                  value={values.nameAR}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  onChange={handleChange}
                  id="flavor"
                  onChangeCapture={(e) => setProductFlavor(e.target.value)}
                  label="Flavor"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!touched.flavor && !!errors.flavor}
                  helperText={touched.flavor && errors.flavor}
                  value={values.flavor}
                />
                <TextField
                  autoFocus
                  required
                  onChange={handleChange}
                  margin="dense"
                  id="flavorAR"
                  onChangeCapture={(e) => setProductFlavorAR(e.target.value)}
                  label="Flavor AR"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!touched.flavorAR && !!errors.flavorAR}
                  helperText={touched.flavorAR && errors.flavorAR}
                  value={values.flavorAR}
                />
                <TextField
                  autoFocus
                  required
                  onChange={handleChange}
                  margin="dense"
                  id="price"
                  onChangeCapture={(e) => setProductPrice(e.target.value)}
                  label="Price"
                  type="number"
                  fullWidth
                  variant="standard"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  value={values.price}
                />
                <TextField
                  autoFocus
                  required
                  onChange={handleChange}
                  margin="dense"
                  id="quantity"
                  onChangeCapture={(e) => setProductQuantity(e.target.value)}
                  label="Quantity"
                  type="number"
                  fullWidth
                  variant="standard"
                  error={!!touched.quantity && !!errors.quantity}
                  helperText={touched.quantity && errors.quantity}
                  value={values.quantity}
                />
                <TextField
                  autoFocus
                  required
                  onChange={handleChange}
                  margin="dense"
                  id="weight"
                  onChangeCapture={(e) => setProductWeight(e.target.value)}
                  label="Weight"
                  type="number"
                  fullWidth
                  variant="standard"
                  error={!!touched.weight && !!errors.weight}
                  helperText={touched.weight && errors.weight}
                  value={values.weight}
                />
                <TextField
                  autoFocus
                  required
                  onChange={handleChange}
                  margin="dense"
                  id="validDate"
                  onChangeCapture={(e) => setProductValid(e.target.value)}
                  label="Validation Date"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!touched.validDate && !!errors.validDate}
                  helperText={touched.validDate && errors.validDate}
                  value={values.validDate}
                />
                <TextField
                  autoFocus
                  required
                  onChange={handleChange}
                  margin="dense"
                  id="expDate"
                  onChangeCapture={(e) => setProductExpire(e.target.value)}
                  label="Expiration Date"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!touched.expDate && !!errors.expDate}
                  helperText={touched.expDate && errors.expDate}
                  value={values.expDate}
                />
                <DialogActions>
                  <Button onClick={handleCloseForm}>Cancel</Button>
                  <Button type="submit">Add</Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Box marginTop="10px" height="75vh">
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

const initialValues = {
  name: "",
  nameAR: "",
  flavor: "",
  flavorAR: "",
  price: "",
  quantity: "",
  weight: "",
  validDate: "",
  expDate: "",
};

const validateSchema = yup.object().shape({
  name: yup.string().required("Required Field."),
  nameAR: yup.string().required("Required Field."),
  flavor: yup.string().required("Required Field."),
  flavorAR: yup.string().required("Required Field."),
  price: yup
    .number()
    .positive()
    .integer()
    .required("Required Field.")
    .typeError("Invalid Price."),
  quantity: yup
    .number()
    .positive()
    .integer()
    .required("Price Required")
    .typeError("Invalid Quantity."),
  validDate: yup.string().required("Requred Field."),
  expDate: yup.string().required("Requred Field."),
});

export default Products;
