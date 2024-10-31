import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import IndexRoute from "./routes/index";
import ErrorPage from "./components/Error/Error";
import LoginRoute from "./routes/login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginRoute />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}