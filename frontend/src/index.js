import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import "./index.css";
import { store, persistor } from "./reducers";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/Default";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
