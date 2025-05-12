
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import StarBackground from "./StarBackground";

const Layout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-constellation-dark to-black">
      <StarBackground />
      <Navigation />
      <main className="relative z-10 min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
