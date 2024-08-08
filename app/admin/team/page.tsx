"use client";
import React from "react";
import dynamic from "next/dynamic";
import Loader2 from "@/app/components/Loader/Loader2";

const DashboardHero = dynamic(
  () => import("@/app/components/Admin/DashboardHero"),
  {
    ssr: false,
    loading: () => <Loader2 />,
  }
);

const AdminProtected = dynamic(() => import("@/app/hooks/adminProtected"), {
  ssr: false,
  loading: () => <Loader2 />,
});

const Heading = dynamic(() => import("@/app/utils/Heading"), {
  ssr: false,
  loading: () => <Loader2 />,
});

const AllUsers = dynamic(
  () => import("../../components/Admin/Users/AllUsers"),
  {
    ssr: false,
    loading: () => <Loader2 />,
  }
);

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="w-[85%]">
           
            <DashboardHero />
            <AllUsers isTeam={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
