import { Outlet } from "react-router-dom";
import Navbar from "./components/cores/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ReduxProvider from "./providers/ReduxProvider";

export default function App() {
  return (
    <ReduxProvider>
      <Navbar />
      <div>
        <ToastContainer />
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </div>
    </ReduxProvider>
  );
}
