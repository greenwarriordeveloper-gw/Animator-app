import { Outlet, useLocation } from "react-router";
import { BottomNav } from "./BottomNav";

// Screens that show the bottom nav
const SHOW_NAV = ["/home", "/workers", "/reports", "/profile"];

export function MainLayout() {
  const location = useLocation();
  const showNav = SHOW_NAV.some(p => location.pathname.startsWith(p));

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Outlet />
      {showNav && <BottomNav />}
    </div>
  );
}
