import { configureStore } from "@reduxjs/toolkit";
// Authentication
import loginReducer from "./Auth/Login";
import forgetReducer from "./Auth/ForgetPassword";
import resetReducer from "./Auth/ResetPassword";
import updateReducer from "./Auth/UpdatePassword";
// User
import allUsersReducer from "./Users/AllUsers";
import deleteUserReducer from "./Users/DeleteUsers";
// Product
import allProductsReducer from "./Products/AllProducts";
import deleteProductReducer from "./Products/DeleteProduct";
import addProductReducer from "./Products/AddProduct";
// Orders
import allOrdersReducer from "./Orders/AllOrders";
import archiveOrderReducer from "./Orders/ArchiveOrders";
export default configureStore({
  reducer: {
    // Authorization
    login: loginReducer,
    forget: forgetReducer,
    reset: resetReducer,
    update: updateReducer,
    // Users
    allUsers: allUsersReducer,
    deleteUser: deleteUserReducer,
    // Products
    allProducts: allProductsReducer,
    deleteProduct: deleteProductReducer,
    addProduct: addProductReducer,
    // Orders
    allOrders: allOrdersReducer,
    archiveOrder: archiveOrderReducer,
  },
});
