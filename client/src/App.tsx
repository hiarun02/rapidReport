import {RouterProvider, createBrowserRouter} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Layout from "./components/layout/Layout";
import SubmitReport from "./components/pages/SubmitReport";
import TrackReport from "./components/pages/TrackReport";
import NearbySupport from "./components/pages/NearbySupport";
import HowItWorks from "./components/pages/HowItWorks";
import NotFound from "./components/pages/NotFound";
import Login from "./components/admin/login/Login";
import Dashboard from "./components/admin/dashboard/Dashboard";

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
      // admin
      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
