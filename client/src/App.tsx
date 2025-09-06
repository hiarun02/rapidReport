import {RouterProvider, createBrowserRouter} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import SubmitReport from "./components/pages/SubmitReport";
import TrackReport from "./components/pages/TrackReport";
import NearbySupport from "./components/pages/NearbySupport";
import HowItWorks from "./components/pages/HowItWorks";
import NotFound from "./components/pages/NotFound";
import Login from "./components/admin/login/Login";
import Dashboard from "./components/admin/dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/submit-report",
        element: <SubmitReport />,
      },
      {
        path: "/track-report",
        element: <TrackReport />,
      },
      {
        path: "/near-by-support",
        element: <NearbySupport />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />,
      },
      // admin login (no layout)
      {
        path: "/admin/login",
        element: <Login />,
      },
    ],
  },
  // Admin routes with separate layout
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
