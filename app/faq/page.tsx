"use client";
import React, { useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Heading from "../utils/Heading";
import { GlobalContext } from "../context/GlobalContext";
import LoadingSpinner from "../components/Loader/Loader";

const FAQ = dynamic(() => import("../components/FAQ/FAQ"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const FAQPage: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  const { setActiveItem, setRoute, setOpen } = globalContext;

  useEffect(() => {
    setActiveItem(4); // Assuming '4' corresponds to the "FAQ" item
    setRoute("FAQ");
    setOpen(false); // Assuming you want to start with the modal closed
  }, [setActiveItem, setRoute, setOpen]);

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
