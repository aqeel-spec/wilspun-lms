'use client';
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loader2 from "../../components/Loader/Loader2";

// Dynamic import with loader
const CourseDetailsPage = dynamic(
  () => import("../../components/Course/CourseDetailsPage"),
  {
    loading: () => <Loader2 />,
    ssr: false
  }
);

const Page = ({ params }: any) => {
  return (
    <div>
      <Suspense fallback={<Loader2 />}>
        <CourseDetailsPage id={params.id} />
      </Suspense>
    </div>
  );
};

export default Page;