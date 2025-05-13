import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      <main className="relative z-10 pt-16 sm:pt-20 min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
