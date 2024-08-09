"use client";
import React, { FC, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/features/reduxHooks";
import { setOpen, setActiveItem, setRoute } from "@/redux/features/globalSlice";
import LoadingSpinner from "../components/Loader/Loader"; // Assume there's a spinner component for loading
import { RootState } from "@/redux/features/store";

const Header = dynamic(() => import("../components/Header"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
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

interface Props {}

const Home: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { open, activeItem, route } = useAppSelector((state: RootState) => state.global);

  useEffect(() => {
    dispatch(setOpen(false));
    dispatch(setActiveItem(0));
    dispatch(setRoute("Home"));
  }, [dispatch]);

  const fallbackComponent = <LoadingSpinner />;

  return (
    <Suspense fallback={fallbackComponent}>
      <div className="page-container">
        <Hero />
        <Courses />
        <Reviews />
        <FAQ />
      </div>
    </Suspense>
  );
};

export default Home;
