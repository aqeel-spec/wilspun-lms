// components/Admin/AdminLayout.tsx
"use client";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import Loader from "../components/Loader/Loader";
// import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
// import LoadingSpinner from "../../Loader/Loader";

// Dynamically import components
const AdminSidebar = dynamic(() => import("../components/Admin/sidebar/AdminSidebar"), {
  ssr: false,
  loading: () => <Loader />,
});

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="1500px:w-[16%] w-1/5">
        <AdminSidebar />
      </div>
      <div className="w-[85%]">{children}</div>
    </div>
  );
};

export default AdminLayout;
