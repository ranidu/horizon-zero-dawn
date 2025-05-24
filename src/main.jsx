import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { HomeLayout } from './layouts'
import { CatalogDrawer, CartDrawer } from './features'
import { store } from "./store";
// import './index.css'
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      { path: '/:catalogId', Component: CatalogDrawer},
      { path: '/:catalogId/cart', Component: CartDrawer}
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
