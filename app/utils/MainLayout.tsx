"use client";
import React, { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "../components/Loader/Loader";
import { GlobalProvider } from "../context/GlobalContext";

// Dynamic imports for components
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
    <GlobalProvider>
      <div className="main-layout">
        {/* Ensure GlobalProvider is correctly setting up the context */}
        <Suspense fallback={<LoadingSpinner />}>
          <DynamicHeader />
        </Suspense>
        <div>{children}</div>
        <Suspense fallback={<LoadingSpinner />}>
          <DynamicFooter />
        </Suspense>
      </div>
    </GlobalProvider>
  );
};

export default MainLayout;
