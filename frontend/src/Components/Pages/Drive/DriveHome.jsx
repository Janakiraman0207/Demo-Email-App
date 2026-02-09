import React from "react";
import { Navbar } from "./Navbar";
import { AppNavBar } from "./AppNavBar";
import { RightSidebar } from "./RightSidebar";

export const DrivePage = () => (
  <>
    <Navbar />
    <AppNavBar />
    <RightSidebar />
    {/* Add your Drive content here */}
  </>
);