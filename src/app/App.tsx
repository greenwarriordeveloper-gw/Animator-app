import { RouterProvider } from "react-router";
import { router } from "./routes";
import "../styles/fonts.css";
import { initUsers } from "./utils/auth";
import { initHistory } from "./utils/history";

// Initialize auth and history on app load
initUsers();
initHistory();

export default function App() {
  return <RouterProvider router={router} />;
}