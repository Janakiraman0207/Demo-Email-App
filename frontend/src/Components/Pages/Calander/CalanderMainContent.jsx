import React, { useState, useRef, useEffect } from 'react';
import { NewEvents } from './NewEvents/NewEvents';
import { SampleEvent } from './SampleEvent';
import profileimg from '../../../assets/images/profileimg.png';
import profileimg1 from '../../../assets/images/profileimg1.png';
import profileimg2 from '../../../assets/images/profileimg2.png';
import {
  CalendarLeftArrowIcon,
  CalendarRightArrowIcon,
  CalendarDropdownBlackIcon,
  CalendarDropdownWhiteIcon
} from '../../../assets/icons/Icons1';

export const CalanderMainContent = ({ currentDate, setCurrentDate, events, addEvent }) => {
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const scrollContainerRef = useRef(null);

  // Scroll to current time on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const currentHour = new Date().getHours();
      const scrollPosition = currentHour * 60; // 60px per hour
      scrollContainerRef.current.scrollTop = scrollPosition;
    }
  }, []);

  // Get week days dynamically
  const getWeekDays = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Sunday
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(day.getDate() + i);
      days.push({
        name: dayNames[i],
        date: day.getDate()
      });
    }
    return days;
  };

  // Get week range
  const getWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // Sunday
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Saturday
    
    return `${start.toLocaleDateString('en-US', { day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric' })} ${end.toLocaleDateString('en-US', { month: 'long' })}, ${end.getFullYear()}`;
  };

  // Get day range
  const getDayRange = (date) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Get month range
  const getMonthRange = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Navigate to previous period
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() - 7);
    } else if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next period
  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + 7);
    } else if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to today
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Get display range based on view mode
  const getDisplayRange = () => {
    if (viewMode === 'day') {
      return getDayRange(currentDate);
    } else if (viewMode === 'week') {
      return getWeekRange(currentDate);
    } else {
      return getMonthRange(currentDate);
    }
  };

  // Handle create meeting
  const handleCreateMeeting = () => {
    console.log('Create Meeting clicked');
    // Add your meeting creation logic here
  };

  // Handle new event
  const handleNewEvent = () => {
    setShowEventModal(true);
  };

  // Close event modal
  const handleCloseModal = () => {
    setShowEventModal(false);
  };

  // Toggle date dropdown
  const handleDateDropdown = () => {
    setShowDateDropdown(!showDateDropdown);
  };

  const weekDays = getWeekDays(currentDate);

  return (
    <div className='flex flex-col w-full h-full gap-[10px]'> 
      {/* Top bar with navigation and controls */}
      <div className="flex items-center w-full h-[64px] border-b border-[#E2E2E2]">
        <div className='flex flex-row items-center justify-between w-[1100px] h-[32px] gap-[97px]'>
          <div className='flex flex-row items-center w-[321px] h-[17px] gap-[14px]'>
            <button 
              onClick={handleToday}
              className='inter-bold text-[14px] tracking-[0.07em] hover:text-[#040B23] transition-colors cursor-pointer'
            >
              Today
            </button>
            <div className='flex flex-row items-center justify-between w-[35px] h-[14px] px-[2px] gap-[7px]'>
              <button onClick={handlePrevious} className='hover:opacity-70 transition-opacity'>
                <CalendarLeftArrowIcon />
              </button>
              <button onClick={handleNext} className='hover:opacity-70 transition-opacity'>
                <CalendarRightArrowIcon />
              </button>
            </div>
            <span className='inter-bold text-[14px] tracking-[0.07em]'>{getDisplayRange()}</span>
            <div className='relative'>
              <button 
                onClick={handleDateDropdown}
                className='w-[14px] h-[14px] flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity'
              >
                <CalendarDropdownBlackIcon />
              </button>
              {showDateDropdown && (
                <div className='absolute top-[20px] left-0 w-[200px] bg-white border border-[#EAEAEA] rounded-[6px] shadow-lg z-10 p-3'>
                  <input 
                    type="date" 
                    value={currentDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                      setCurrentDate(new Date(e.target.value));
                      setShowDateDropdown(false);
                    }}
                    className='w-full px-2 py-1 text-[12px] border border-[#EAEAEA] rounded-[4px] inter-regular'
                  />
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-row w-[561px] h-[32px] gap-[14px]'>
            <div className='flex flex-row w-[200px] h-[32px] rounded-[6px] items-center py-[1px] px-[10px] gap-[30px] bg-[#F3F3F3]'>
              <button 
                onClick={() => handleViewModeChange('day')}
                className={`flex items-center justify-center ${viewMode === 'day' ? 'w-[72px] h-[30px] rounded-[3px] bg-[#040B23] text-[white]' : 'text-[#040B23]'} inter-medium text-[12px] tracking-[0.07em] hover:opacity-90 transition-all`}
              >
                Day
              </button>
              <button 
                onClick={() => handleViewModeChange('week')}
                className={`flex items-center justify-center ${viewMode === 'week' ? 'w-[72px] h-[30px] rounded-[3px] bg-[#040B23] text-[white]' : 'text-[#040B23]'} text-[12px] inter-medium hover:opacity-90 transition-all`}
              >
                Week
              </button>
              <button 
                onClick={() => handleViewModeChange('month')}
                className={`flex items-center justify-center ${viewMode === 'month' ? 'w-[72px] h-[30px] rounded-[3px] bg-[#040B23] text-[white]' : 'text-[#040B23]'} inter-medium text-[12px] tracking-[0.07em] hover:opacity-90 transition-all`}
              >
                Month
              </button>
            </div>
            <button 
              onClick={handleCreateMeeting}
              className='flex items-center justify-center w-[117px] h-[32px] rounded-[4px] border-[1px] border-[#040B23] text-[12px] text-[#040B23] inter-medium hover:bg-[#040B23] hover:text-white transition-colors'
            >
              Create Meeting
            </button>
            <button 
              onClick={handleNewEvent}
              className='flex flex-row items-center justify-center w-[158px] h-[32px] rounded-[6px] gap-[18px] bg-[#040B23] inter-regular text-[12px] tracking-[0.07em] text-[white] hover:bg-[#0a1136] transition-colors'
            >
              <span>New Event</span>
              <div className='w-[1px] h-[30.5px] bg-[#2C3144]'></div>
              <CalendarDropdownWhiteIcon />
            </button>
          </div>
        </div>
      </div>
      
      {/* Calendar grid content */}
      <div className='flex flex-col w-full h-[595px] rounded-[4px] border border-[#EAEAEA] bg-white overflow-hidden'>
        {/* Header with days */}
        <div className='flex items-center w-full h-[50px] bg-[#F1F2F3] border-b border-[#EAEAEA]'>
          <div className='w-[80px] h-full'></div>
          <div className='flex flex-row flex-1'>
            {weekDays.map((day, index) => (
              <div key={index} className='flex items-center justify-center flex-1 h-full'>
                <span className='inter-bold text-[12px] tracking-[0.07em]'>
                  {day.name} {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time slots and grid */}
        <div ref={scrollContainerRef} className='flex flex-1 h-[full] overflow-y-auto'>
          {/* Time column */}
          <div className='w-[80px] h-[1450px] border-r border-[#EAEAEA]'>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className='h-[60px] flex items-center justify-center pt-1'>
                <span className='inter-regular text-[12px] text-[#040B23] tracking-[0.07em]'>
                  {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                </span>
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className='flex flex-1 h-[1450px]'>
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <div key={dayIndex} className={`flex-1 relative ${dayIndex < 6 ? 'h-[1450px] p-[10px] border-r border-[#EAEAEA]' : ''}`}>
                {Array.from({ length: 24 }, (_, hourIndex) => (
                  <div
                    key={hourIndex}
                    className='h-[60px] hover:bg-[#F9F9F9] cursor-pointer transition-colors'
                  >
                  </div>
                ))}
                
                <SampleEvent dayIndex={dayIndex} events={events} currentDate={currentDate} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Event Modal Component */}
      <NewEvents 
        showEventModal={showEventModal}
        handleCloseModal={handleCloseModal}
        addEvent={addEvent}
        currentDate={currentDate}
      />
    </div>
  );
};