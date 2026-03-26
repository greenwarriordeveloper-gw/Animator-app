import { createBrowserRouter, redirect } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { getUser } from "./utils/auth";
import LoginScreen from "./pages/LoginScreen";
import SplashScreen from "./pages/SplashScreen";
import HomeScreen from "./pages/HomeScreen";
import CameraScreen from "./pages/CameraScreen";
import WorkersScreen from "./pages/WorkersScreen";
import SubmitScreen from "./pages/SubmitScreen";
import PunchStatusScreen from "./pages/PunchStatusScreen";
import ReportScreen from "./pages/ReportScreen";
import PDFPreviewScreen from "./pages/PDFPreviewScreen";
import ProfileScreen from "./pages/ProfileScreen";
import HistoryScreen from "./pages/HistoryScreen";
import IndividualHistoryScreen from "./pages/IndividualHistoryScreen";
import BulkHistoryScreen from "./pages/BulkHistoryScreen";
import UserManagementScreen from "./pages/UserManagementScreen";

// Protected route loader - redirects to login if not authenticated
function protectedLoader() {
  const user = getUser();
  if (!user) {
    return redirect("/login");
  }
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { 
        index: true, 
        loader: () => {
          const user = getUser();
          return redirect(user ? "/home" : "/login");
        }
      },
      { path: "login",        Component: LoginScreen },
      { path: "splash",       Component: SplashScreen, loader: protectedLoader },
      { path: "home",         Component: HomeScreen, loader: protectedLoader },
      { path: "camera",       Component: CameraScreen, loader: protectedLoader },
      { path: "workers",      Component: WorkersScreen, loader: protectedLoader },
      { path: "submit",       Component: SubmitScreen, loader: protectedLoader },
      { path: "punch-status", Component: PunchStatusScreen, loader: protectedLoader },
      { path: "reports",      Component: ReportScreen, loader: protectedLoader },
      { path: "pdf-preview",  Component: PDFPreviewScreen, loader: protectedLoader },
      { path: "profile",      Component: ProfileScreen, loader: protectedLoader },
      { path: "history",      Component: HistoryScreen, loader: protectedLoader },
      { path: "history/individual", Component: IndividualHistoryScreen, loader: protectedLoader },
      { path: "history/bulk", Component: BulkHistoryScreen, loader: protectedLoader },
      { path: "users",        Component: UserManagementScreen, loader: protectedLoader },
    ],
  },
]);
