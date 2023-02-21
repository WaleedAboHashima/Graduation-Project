import { configureStore } from "@reduxjs/toolkit";
// User
import allUsersReducer from "./Users/AllUsers";
import deleteUserReducer from "./Users/DeleteUsers";
// Product
import allProductsReducer from "./Products/AllProducts";
import deleteProductReducer from "./Products/DeleteProduct";
import allOrdersReducer from "./Orders/AllOrders";
import archiveOrderReducer from "./Orders/ArchiveOrders";
export default configureStore({
  reducer: {
    // Users
    allUsers: allUsersReducer,
    deleteUser: deleteUserReducer,
    // Products
    allProducts: allProductsReducer,
    deleteProduct: deleteProductReducer,
    // Orders
    allOrders: allOrdersReducer,
    archiveOrder: archiveOrderReducer
  },
});
