"use client";
import React, { FC } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "../components/Loader/Loader";


const DynamicHeader = dynamic(() => import("../components/Header"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const DynamicFooter = dynamic(() => import("../components/Footer"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {


  return (
    <div className="main-layout">
      <React.Suspense fallback={<LoadingSpinner />}>
        <DynamicHeader />
      </React.Suspense>
      <div>{children}</div>
      <React.Suspense fallback={<LoadingSpinner />}>
        <DynamicFooter />
      </React.Suspense>
    </div>
  );
};

export default MainLayout;
