"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/redux/features/reduxHooks";
import { setOpen, setActiveItem, setRoute } from "@/redux/features/globalSlice";
import Loader from "@/app/components/Loader/Loader";
import Heading from "@/app/utils/Heading";

const Policy = dynamic(() => import("../policy/Policy"), {
  ssr: false,
  loading: () => <Loader />,
});

const PolicyPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Set the initial values for Policy page
  useEffect(() => {
    dispatch(setActiveItem(3)); // Assuming '3' corresponds to the "Policy" item
    dispatch(setRoute("Policy"));
    dispatch(setOpen(false)); // Assuming you want to start with the modal closed
  }, [dispatch]);

  return (
    <div>
      <Heading
        title="Policy - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <Policy />
    </div>
  );
};

export default PolicyPage;
