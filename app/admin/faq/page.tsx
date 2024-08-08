"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loader2 from "@/app/components/Loader/Loader2";

const DashboardHero = dynamic(() => import("@/app/components/Admin/DashboardHero"), {
  loading: () => <Loader2 />,
});
const AdminProtected = dynamic(() => import("@/app/hooks/adminProtected"), {
  loading: () => <Loader2 />,
});
const Heading = dynamic(() => import("@/app/utils/Heading"), {
  loading: () => <Loader2 />,
});
const EditFaq = dynamic(() => import("../../components/Admin/Customization/EditFaq"), {
  loading: () => <Loader2 />,
});

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<Loader2 />}>
        <AdminProtected>
          <Heading
            title="Elearning - Admin"
            description="ELearning is a platform for students to learn and get help from teachers"
            keywords="Programming,MERN,Redux,Machine Learning"
          />
          <div className="flex min-h-screen">
            <div className="w-[85%]">
              <DashboardHero />
              <EditFaq />
              <br />
            </div>
          </div>
        </AdminProtected>
      </Suspense>
    </div>
  );
};

export default Page;
