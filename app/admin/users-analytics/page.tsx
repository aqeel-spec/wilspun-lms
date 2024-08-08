"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loader2 from "@/app/components/Loader/Loader2";

const AdminSidebar = dynamic(() => import("../../components/Admin/sidebar/AdminSidebar"), {
  loading: () => <Loader2 />,
});
const Heading = dynamic(() => import('../../utils/Heading'), {
  loading: () => <Loader2 />,
});
const DashboardHeader = dynamic(() => import('../../components/Admin/DashboardHeader'), {
  loading: () => <Loader2 />,
});
const UserAnalytics = dynamic(() => import('../../../app/components/Admin/Analytics/UserAnalytics'), {
  loading: () => <Loader2 />,
});

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<Loader2 />}>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
          <div className="w-[85%]">
            <DashboardHeader />
            <UserAnalytics />
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default page;
