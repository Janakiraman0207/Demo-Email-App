import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { InboxList } from "./InboxList";
import { MailView } from "./MailView";
import { RightSidebar } from "./RightSidebar";
import { useSmoothNavigation } from "../../../hooks/useSmoothNavigation";
import { AppNavBar } from "./AppNavBar";

const Home = () => {
  const { visible, smoothNavigate } = useSmoothNavigation(1000);
  return (
    <>
        <div
          className={`w-full flex flex-col overflow-hidden transition-all duration-1000 ease-in-out
        ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <Navbar />
          <AppNavBar />
          <div className="flex h-[700px] overflow-hidden">
            <Sidebar />
            <InboxList />
            <MailView />
            <RightSidebar />
          </div>
        </div>
    </>
  );
};
export default Home;
