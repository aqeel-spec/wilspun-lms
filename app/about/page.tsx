"use client";
import React, { useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import Heading from "../utils/Heading";
import About from "./About";
import { GlobalContext } from "../context/GlobalContext";


const AboutPage = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  const { setActiveItem, setRoute } = globalContext;

  useEffect(() => {
    setActiveItem(2); // Assuming '2' corresponds to the "About" item
    setRoute("About");
  }, [setActiveItem, setRoute]);

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
