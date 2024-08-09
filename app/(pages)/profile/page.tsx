'use client';

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from "@/redux/features/reduxHooks";
import { setOpen, setActiveItem, setRoute } from "@/redux/features/globalSlice";
import Loader from "@/app/components/Loader/Loader";
import { RootState } from "@/redux/features/store";

// Dynamic imports for components
const Protected = dynamic(() => import("@/app/hooks/useProtected"), { ssr: false, loading: () => <Loader /> });
const Heading = dynamic(() => import("@/app/utils/Heading"), { ssr: false, loading: () => <Loader /> });
const Profile = dynamic(() => import("@/app/components/Profile/Profile"), { ssr: false, loading: () => <Loader /> });

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } : {user : any} = useAppSelector((state : RootState) => state.auth);

  useEffect(() => {
    dispatch(setActiveItem(5)); // Assuming '5' corresponds to the "Profile" item
    dispatch(setRoute("Profile"));
    dispatch(setOpen(false)); // Assuming you want to start with the modal closed
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} profile - Wilpsun LMS`}
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default ProfilePage;
