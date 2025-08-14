import {RouterProvider, createBrowserRouter} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Layout from "./components/layout/Layout";
import SubmitReport from "./components/pages/SubmitReport";
import TrackReport from "./components/pages/TrackReport";
import NearbySupport from "./components/pages/NearbySupport";
import HowItWorks from "./components/pages/HowItWorks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
