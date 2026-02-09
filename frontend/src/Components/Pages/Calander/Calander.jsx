import React, { useState } from 'react';
import { Navbar } from '../Home/Navbar';
import { AppNavBar } from '../Home/AppNavBar';
import { RightSidebar } from '../Home/RightSidebar';
import { CalanderLeftside } from './CalanderLeftside';
import { CalanderMainContent } from './CalanderMainContent';

const Calander = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AppNavBar />
      <div className="flex flex-row w-full h-[full] px-[10px] py-[0px] gap-4">
        <CalanderLeftside currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <CalanderMainContent currentDate={currentDate} setCurrentDate={setCurrentDate} events={events} addEvent={addEvent} />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Calander;