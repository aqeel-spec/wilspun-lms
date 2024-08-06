"use client";
import React, { useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { GlobalContext } from "../context/GlobalContext";
import LoadingSpinner from "../components/Loader/Loader"; // Assume there's a spinner component for loading


const Hero = dynamic(() => import("../components/Route/Hero"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const Courses = dynamic(() => import("../components/Route/Courses"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const Reviews = dynamic(() => import("../components/Route/Reviews"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const FAQ = dynamic(() => import("../components/FAQ/FAQ"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const Home: React.FC = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  const { setActiveItem, setRoute } = globalContext;

  // Set the initial values for Home page
  useEffect(() => {
    setActiveItem(0); // Assuming '0' corresponds to the "Home" item
    setRoute("Home");
  }, [setActiveItem, setRoute]);

  return (
    <div className="page-container">
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
    </div>
  );
};

export default Home;