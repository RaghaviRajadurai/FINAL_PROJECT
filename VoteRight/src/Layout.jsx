import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    {/* Global Logo/Header */}
    <div className="w-full flex justify-center py-4 bg-white shadow">
      <img
        src="/src/assets/logo.png"
        alt="VoteRight Logo"
        className="h-16"
      />
    </div>
    {/* Page Content */}
    <Outlet />
  </div>
);

export default Layout;