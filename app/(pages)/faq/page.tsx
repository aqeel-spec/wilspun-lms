"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/redux/features/reduxHooks";
import { setOpen, setActiveItem, setRoute } from "@/redux/features/globalSlice";
import Heading from "@/app/utils/Heading";
import Loader from "@/app/components/Loader/Loader";

const FAQ = dynamic(() => import("../../components/FAQ/FAQ"), {
  ssr: false,
  loading: () => <Loader />,
});

const FAQPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Set the initial values for FAQ page
  useEffect(() => {
    dispatch(setActiveItem(4)); // Assuming '4' corresponds to the "FAQ" item
    dispatch(setRoute("FAQ"));
    dispatch(setOpen(false)); // Assuming you want to start with the modal closed
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Heading
        title="FAQ - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <br />
      <FAQ />
    </div>
  );
};

export default FAQPage;
