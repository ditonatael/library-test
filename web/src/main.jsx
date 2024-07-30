import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SigninPage from "./pages/signin/index.jsx";
import SignupPage from "./pages/signup/index.jsx";
import BooksPage from "./pages/books/index.jsx";
import AdminPage from "./pages/admin/index.jsx";

const routerComponent = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <SigninPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routerComponent} />
  </React.StrictMode>
);
