"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loader2 from "@/app/components/Loader/Loader2";


const Heading = dynamic(() => import("../../../app/utils/Heading"), {
  ssr: false,
  loading: () => <Loader2 />,
});

const CreateCourse = dynamic(() => import("../../components/Admin/Course/CreateCourse"), {
  ssr: false,
  loading: () => <Loader2 />,
});

const DashboardHeader = dynamic(() => import("../../../app/components/Admin/DashboardHeader"), {
  ssr: false,
  loading: () => <Loader2 />,
});

type Props = {};

const Page: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<Loader2 />}>
      <div>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
          <div className="w-[85%]">
            <DashboardHeader />
            <CreateCourse />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
