'use client';

import React, { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "../components/Loader/Loader";

// Dynamic imports with suspense fallback for loading spinner
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
    <div className="main-layout flex flex-col min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <DynamicHeader />
      </Suspense>

      <main className="flex-grow">
        {children}
      </main>

      <Suspense fallback={<LoadingSpinner />}>
        <DynamicFooter />
      </Suspense>
    </div>
  );
};

export default MainLayout;
