import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { router } from "./components/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import DataContextProvider from "../contextApi/DataContaxt.jsx";

createRoot(document.getElementById("root")).render(
  <DataContextProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </DataContextProvider>,
);
