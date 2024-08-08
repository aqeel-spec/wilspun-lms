'use client'
import React from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports for components
const DashboardHero = dynamic(() => import('@/app/components/Admin/DashboardHero'), { ssr: false });
const AdminProtected = dynamic(() => import('@/app/hooks/adminProtected'), { ssr: false });
const Heading = dynamic(() => import('@/app/utils/Heading'), { ssr: false });
const AdminSidebar = dynamic(() => import('../../components/Admin/sidebar/AdminSidebar'), { ssr: false });
const AllUsers = dynamic(() => import('../../components/Admin/Users/AllUsers'), { ssr: false });

type Props = {}

const page: React.FC<Props> = (props) => {
  return (
    <div className="flex h-screen">
      {/* <div className="w-[15%]">
        <AdminSidebar />
      </div> */}
      <div className="w-[85%]">
        <AdminProtected>
          <Heading
            title="Wilpsun LMS - Admin"
            description="ELearning is a platform for students to learn and get help from teachers"
            keywords="Programming, MERN, Redux, Machine Learning"
          />
          <div className="px-4">
            <DashboardHero />
            <AllUsers />
          </div>
        </AdminProtected>
      </div>
    </div>
  )
}

export default page
