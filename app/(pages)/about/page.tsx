"use client"
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Heading from "../../utils/Heading";
import About from "./About";
import { useAppDispatch } from "@/redux/features/reduxHooks";
import { setActiveItem, setRoute } from "@/redux/features/globalSlice";

const AboutPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveItem(2)); // Assuming '2' corresponds to the "About" item
    dispatch(setRoute("About"));
  }, [dispatch]);

  return (
    <div>
      <Heading
        title="About us - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <About />
    </div>
  );
};

export default AboutPage;
