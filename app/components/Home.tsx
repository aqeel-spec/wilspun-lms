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
    <div className="page-container">
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <Suspense fallback={fallbackComponent}>
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
      </Suspense>
      <Suspense fallback={fallbackComponent}>
        <Hero />
      </Suspense>
      <Suspense fallback={fallbackComponent}>
        <Courses />
      </Suspense>
      <Suspense fallback={fallbackComponent}>
        <Reviews />
      </Suspense>
      <Suspense fallback={fallbackComponent}>
        <FAQ />
      </Suspense>
      <Suspense fallback={fallbackComponent}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
