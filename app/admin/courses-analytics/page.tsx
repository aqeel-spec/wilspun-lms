'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Loader2 from '@/app/components/Loader/Loader2';

const AdminSidebar = dynamic(() => import("../../components/Admin/sidebar/AdminSidebar"), {
  ssr: false,
  loading: () => <Loader2 />,
});

const Heading = dynamic(() => import('../../../app/utils/Heading'), {
  ssr: false,
  loading: () => <Loader2 />,
});

const CourseAnalytics = dynamic(() => import("../../components/Admin/Analytics/CourseAnalytics"), {
  ssr: false,
  loading: () => <Loader2 />,
});

const DashboardHeader = dynamic(() => import('../../../app/components/Admin/DashboardHeader'), {
  ssr: false,
  loading: () => <Loader2 />,
});

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="w-[85%]">
          <DashboardHeader />
          <CourseAnalytics />
        </div>
      </div>
    </div>
  );
}

export default page;
