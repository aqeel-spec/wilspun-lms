"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loader2 from "@/app/components/Loader/Loader2";

const Heading = dynamic(() => import("../../../app/utils/Heading"), {
  ssr: false,
  loading: () => <Loader2 />,
});
const DashboardHeader = dynamic(() => import("../../../app/components/Admin/DashboardHeader"), {
  ssr: false,
  loading: () => <Loader2 />,
});
const AllInvoices = dynamic(() => import("../../../app/components/Admin/Order/AllInvoices"), {
  ssr: false,
  loading: () => <Loader2 />,
});

type Props = {};

const Page: React.FC<Props> = (props) => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <Suspense fallback={<Loader2 />}>
        <Heading
          title="Wilpsun LMS - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
      </Suspense>
      <div className="flex">
        <div className="w-[85%]">
          <Suspense fallback={<Loader2 />}>
            <DashboardHeader />
          </Suspense>
          <Suspense fallback={<Loader2 />}>
            <AllInvoices />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
