"use client";
import React, { useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Heading from "../utils/Heading";
import { GlobalContext } from "../context/GlobalContext";
import LoadingSpinner from "../components/Loader/Loader"; // Assume there's a spinner component for loading


const Policy = dynamic(() => import("./Policy"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const PolicyPage: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  const { setOpen, setActiveItem, setRoute } = globalContext;

  // Set the initial values for Policy page
  useEffect(() => {
    setActiveItem(3); // Assuming '3' corresponds to the "Policy" item
    setRoute("Policy");
    setOpen(false); // Assuming you want to start with the modal closed
  }, [setActiveItem, setRoute, setOpen]);

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
