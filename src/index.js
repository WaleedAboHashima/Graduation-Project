import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./apis/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}
root.render(
  <Provider store={store}>
      <Router>
        <App />
      </Router>
  </Provider>
);
