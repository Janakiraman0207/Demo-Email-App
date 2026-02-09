import React from 'react';
import {
  DownArrowSmallIcon,
  CalendarLeftArrowIcon,
  CalendarRightArrowIcon,
  CalendarAddIcon,
  CalendarLegendHolidayIcon,
  CalendarLegendReminderIcon,
  CalendarLegendTaskIcon,
  CalendarLegendEventsIcon
} from '../../../assets/icons/Icons1';

export const CalanderLeftside = ({ currentDate, setCurrentDate }) => {

  // Get month and year
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Get previous month's last days
  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const prevMonthDays = startingDayOfWeek;

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    const prevMonth = currentDate.getMonth() - 1;
    const prevYear = prevMonth < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    const actualMonth = prevMonth < 0 ? 11 : prevMonth;
    calendarDays.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      date: new Date(prevYear, actualMonth, prevMonthLastDay - i)
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
    });
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonth = currentDate.getMonth() + 1;
    const nextYear = nextMonth > 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    const actualMonth = nextMonth > 11 ? 0 : nextMonth;
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(nextYear, actualMonth, i)
    });
  }

  // Get week range (Sunday to Saturday)
  const getWeekStartEnd = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // Sunday
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Saturday
    end.setHours(23, 59, 59, 999);
    
    return { start, end };
  };

  const { start: weekStart, end: weekEnd } = getWeekStartEnd(currentDate);

  // Check if a date is in the current week range
  const isInWeekRange = (date) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate >= weekStart && checkDate <= weekEnd;
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Split into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className='flex flex-col w-[215px] h-[full] gap-[10px] border-r border-[#E2E2E2] py-[40px] pr-[5px]'>
      <div className='flex flex-row items-center justify-center w-[92px] h-[26px] rounded-[4px] px-[9px] py-[7px] gap-[10px] bg-[#ECECEC]'>
        <span className='w-[54px] h-[12px] inter-regular text-[10px]'>GMT +5:30</span>
        <DownArrowSmallIcon />
      </div>
      
      {/* Calendar */}
      <div className='flex flex-col w-[206px] h-[220px] gap-[15px]'>
        <div className='w-full h-[15px] flex items-center justify-between'>
          <span className='w-[95px] h-[15px] inter-bold text-[12px]'>{month} {year}</span>
          <div className='w-[45px] h-[15px] pr-[10px] flex items-center justify-between'>
            <button onClick={goToPreviousMonth} className='cursor-pointer'>
              <CalendarLeftArrowIcon />
            </button>
            <button onClick={goToNextMonth} className='cursor-pointer'>
              <CalendarRightArrowIcon />
            </button>
          </div>
        </div>
        
        {/* Days of week */}
        <div className='flex flex-row items-center w-full h-[12px] gap-[7px] mb-[10px]'>
          {daysOfWeek.map((day, index) => (
            <div key={index} className={`${index === 0 ? 'w-[20px]' : 'w-[24px]'} h-[12px]`}>
              <span className='inter-regular text-[10px]  text-[#878787]'>{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid - show only first 6 weeks */}
        {weeks.slice(0, 6).map((week, weekIndex) => {
          // Check if any day in this week is in the selected week range
          const isWeekHighlighted = week.some(dayObj => isInWeekRange(dayObj.date));
          
          // Get today's date for comparison
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          return (
            <div 
              key={weekIndex} 
              className={`flex flex-row items-center w-full h-[20px] gap-[18px] ${isWeekHighlighted ? 'bg-[#ECECEC] rounded-[2px] px-[2px]' : ''}`}
            >
              {week.map((dayObj, dayIndex) => {
                const dayDate = new Date(dayObj.date);
                dayDate.setHours(0, 0, 0, 0);
                const isToday = dayDate.getTime() === today.getTime();
                
                return (
                  <div 
                    key={dayIndex} 
                    className={`${dayIndex === 0 ? 'w-[15px]' : 'w-[15px]'} h-[12px] flex items-center justify-center ${isToday ? 'bg-[#4D4AF7] text-[black] rounded-[2px]' : ''}`}
                  >
                    <span className={`inter-regular text-[10px] ${!dayObj.isCurrentMonth ? 'text-[#909090]' : isToday ? 'text-black' : ''}`}>
                      {dayObj.day}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Horizontal Line */}
      <div className='w-[182px] border-t-2 border-[#ECECEC] mt-[10px]'></div>
      
      <div className='flex flex-row items-center justify-between mt-[10px] w-[200px] h-[15px]'>
        <div className='w-[89px] h-[15px] flex items-center px-[10px]'>
          <span className='inter-bold text-[12px] tracking-[0.07em]'>Schedules</span>
        </div>
        <div className='w-[20px] h-[20px] p-[2px]'>
          <CalendarAddIcon />
        </div>
      </div>

      <div className='flex flex-col w-[99px] h-[142px] ml-[10px] mt-[10px] gap-[11px]'>
        <div className='flex flex-col w-[99px] h-[119px] gap-[13px]'>
          <div className='flex flex-row w-[80px] h-[20px] gap-[12px]'>
            <div className='flex item-center justify-center w-[20px] h-[20px]'>
              <CalendarLegendHolidayIcon />
            </div>
            <span className='inter-regular text-[12px] tracking-[0.07em] text-[#5A5A5A]'>Holiday</span>
          </div>
          <div className='flex flex-row w-[99px] h-[20px] gap-[12px]'>
            <div className='flex item-center justify-center w-[20px] h-[20px]'>
              <CalendarLegendReminderIcon />
            </div>
            <span className='inter-regular text-[12px] tracking-[0.07em] text-[#5A5A5A]'>Reminders</span>
          </div>
          <div className='flex flex-row w-[61px] h-[20px] gap-[12px]'>
            <div className='flex item-center justify-center w-[20px] h-[20px]'>
              <CalendarLegendTaskIcon />
            </div>
            <span className='inter-regular text-[12px] tracking-[0.07em] text-[#5A5A5A]'>Task</span>
          </div>
          <div className='flex flex-row w-[75px] h-[20px] gap-[12px]'>
            <div className='flex item-center justify-center w-[20px] h-[20px]'>
              <CalendarLegendEventsIcon />
            </div>
            <span className='inter-regular text-[12px] tracking-[0.07em] text-[#5A5A5A]'>Events</span>
          </div>
        </div>
        <span className='w-[36px] h-[12px] inter-regular text-[10px] tracking-[0.07em] text-[#379FF5] whitespace-nowrap'>See all</span>
      </div>
    </div>
  );
};