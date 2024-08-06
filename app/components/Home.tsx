"use client";
import React, { FC, useState, lazy, Suspense } from "react";
import Heading from "../utils/Heading";
import LoadingSpinner from "../components/Loader/Loader"; // Assume there's a spinner component for loading

// Lazy load the components
const Header = lazy(() => import("../components/Header"));
const Hero = lazy(() => import("../components/Route/Hero"));
const Courses = lazy(() => import("../components/Route/Courses"));
const Reviews = lazy(() => import("../components/Route/Reviews"));
const FAQ = lazy(() => import("../components/FAQ/FAQ"));
const Footer = lazy(() => import("../components/Footer"));

export const dynamic = "force-dynamic";

interface Props {}

const Home: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  const fallbackComponent = <LoadingSpinner />;

  return (
    <Suspense fallback={fallbackComponent}>
      <div className="page-container">
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Hero />
        <Courses />
        <Reviews />
        <FAQ />
        
      </div>
    </Suspense>
  );
};

export default Home;
