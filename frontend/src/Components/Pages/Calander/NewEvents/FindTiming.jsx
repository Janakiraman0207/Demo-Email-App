import React, { useState } from 'react';
import image1 from '../../../../assets/images/image1.png';
import image2 from '../../../../assets/images/image2.png';
import image3 from '../../../../assets/images/image3.png';
import profileimg from '../../../../assets/images/profileimg.png';
import profileimg1 from '../../../../assets/images/profileimg1.png';
import profileimg2 from '../../../../assets/images/profileimg2.png';
import {
  AddParticipantIcon,
  RemoveAttendeeIcon,
  MoreIcon,
  LocationIcon,
  CalendarDropdownIcon,
  PrevMonthIcon,
  NextMonthIcon
} from '../../../../assets/icons/Icons';

export const FindTiming = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 27)); // December 27, 2025
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1));
  const [requiredAttendees, setRequiredAttendees] = useState([profileimg, profileimg1, profileimg2]);
  const [optionalAttendees, setOptionalAttendees] = useState([profileimg, profileimg1, profileimg2]);
  const [showRequiredDropdown, setShowRequiredDropdown] = useState(false);
  const [showOptionalDropdown, setShowOptionalDropdown] = useState(false);

  // All available participants
  const allParticipants = [
    { id: 1, image: profileimg, name: 'User 1' },
    { id: 2, image: profileimg1, name: 'User 2' },
    { id: 3, image: profileimg2, name: 'User 3' },
    { id: 4, image: image1, name: 'User 4' },
    { id: 5, image: image2, name: 'User 5' },
    { id: 6, image: image3, name: 'User 6' },
  ];

  // Format date for display
  const formatDateDisplay = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Required attendees functions
  const addRequiredAttendee = (participantImage) => {
    if (!requiredAttendees.includes(participantImage)) {
      setRequiredAttendees([...requiredAttendees, participantImage]);
    }
    setShowRequiredDropdown(false);
  };

  const removeRequiredAttendee = (participantImage) => {
    setRequiredAttendees(requiredAttendees.filter(p => p !== participantImage));
  };

  // Optional attendees functions
  const addOptionalAttendee = (participantImage) => {
    if (!optionalAttendees.includes(participantImage)) {
      setOptionalAttendees([...optionalAttendees, participantImage]);
    }
    setShowOptionalDropdown(false);
  };

  const removeOptionalAttendee = (participantImage) => {
    setOptionalAttendees(optionalAttendees.filter(p => p !== participantImage));
  };

  // Get available participants for each dropdown
  const availableRequiredParticipants = allParticipants.filter(
    p => !requiredAttendees.includes(p.image)
  );

  const availableOptionalParticipants = allParticipants.filter(
    p => !optionalAttendees.includes(p.image)
  );

  const isToday = (date) => {
    const today = new Date();
    return date && date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return date && selectedDate && 
           date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };

  const monthYear = currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className='flex flex-row w-[816px] h-[568px] gap-[16px]'>
      {/* Left Panel */}
      <div className='flex flex-col w-[400px] h-[500px] gap-[20px]'>
        {/* Required Attendance */}
        <div className='relative flex flex-col w-[400px] h-[115px] gap-[10px]'>
          <span className='inter-regular text-[11px] tracking-[0.02em] '>Required attendance</span>
          <div className='w-[400px] h-[92px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
            <div className='flex flex-col w-[376px] h-[64px] gap-[24px]'>
              <div 
                className='flex flex-row items-center w-[123px] h-[20px] gap-[8px] cursor-pointer hover:opacity-70 transition-opacity'
                onClick={() => setShowRequiredDropdown(!showRequiredDropdown)}
              >
                <CalendarDropdownIcon />
                <span className='inter-regular text-[10px] text-[#040B2363]'>Add participant(s)</span>
              </div>
              <div className='flex flex-row justify-between w-[376px] h-[20px]'>
                <div className='flex flex-row h-[20px] gap-[6px] flex-wrap'>
                  {requiredAttendees.map((attendee, index) => (
                    <div key={index} className='relative group'>
                      <img 
                        src={attendee} 
                        alt='Attendee' 
                        className='w-[20px] h-[20px] rounded-full cursor-pointer hover:opacity-70 transition-opacity'
                        onClick={() => removeRequiredAttendee(attendee)}
                      />
                      <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                        <RemoveAttendeeIcon />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex items-center w-[20px] h-[20px]'>
                  <MoreIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Required Attendees Dropdown */}
          {showRequiredDropdown && availableRequiredParticipants.length > 0 && (
            <div className='absolute top-[45px] left-0 z-50 bg-white rounded-[8px] border border-[#EAEAEA] shadow-lg w-[200px] max-h-[200px] overflow-y-auto'>
              {availableRequiredParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className='flex items-center gap-[8px] px-4 py-2 hover:bg-[#F3F3F3] cursor-pointer'
                  onClick={() => addRequiredAttendee(participant.image)}
                >
                  <img src={participant.image} alt={participant.name} className='w-[24px] h-[24px] rounded-full' />
                  <span className='inter-regular text-[10px]'>{participant.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Optional Attendance */}
        <div className='relative flex flex-col w-[400px] h-[115px] gap-[10px]'>
          <span className='inter-regular text-[11px] tracking-[0.02em] '>Optional attendance</span>
          <div className='w-[400px] h-[92px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
            <div className='flex flex-col w-[376px] h-[64px] gap-[24px]'>
              <div 
                className='flex flex-row items-center w-[123px] h-[20px] gap-[8px] cursor-pointer hover:opacity-70 transition-opacity'
                onClick={() => setShowOptionalDropdown(!showOptionalDropdown)}
              >
                <CalendarDropdownIcon />
                <span className='inter-regular text-[10px] text-[#040B2363]'>Add participant(s)</span>
              </div>
              <div className='flex flex-row justify-between w-[376px] h-[20px]'>
                <div className='flex flex-row h-[20px] gap-[6px] flex-wrap'>
                  {optionalAttendees.map((attendee, index) => (
                    <div key={index} className='relative group'>
                      <img 
                        src={attendee} 
                        alt='Attendee' 
                        className='w-[20px] h-[20px] rounded-full cursor-pointer hover:opacity-70 transition-opacity'
                        onClick={() => removeOptionalAttendee(attendee)}
                      />
                      <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                        <RemoveAttendeeIcon />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex items-center w-[20px] h-[20px]'>
                  <MoreIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Optional Attendees Dropdown */}
          {showOptionalDropdown && availableOptionalParticipants.length > 0 && (
            <div className='absolute top-[45px] left-0 z-50 bg-white rounded-[8px] border border-[#EAEAEA] shadow-lg w-[200px] max-h-[200px] overflow-y-auto'>
              {availableOptionalParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className='flex items-center gap-[8px] px-4 py-2 hover:bg-[#F3F3F3] cursor-pointer'
                  onClick={() => addOptionalAttendee(participant.image)}
                >
                  <img src={participant.image} alt={participant.name} className='w-[24px] h-[24px] rounded-full' />
                  <span className='inter-regular text-[10px]'>{participant.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location input */}
        <div className='flex flex-col w-[400px] h-[65px] gap-[10px]'>
          <span className='inter-regular text-[11px] tracking-[0.02em]'>Location</span>
          <div className='flex flex-row items-center w-[400px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px] gap-[8px]'>
            <div className='w-[20px] h-[20px] flex items-center justify-center'>
              <LocationIcon />
            </div>
            <span className='inter-regular text-[10px] text-[#040B2363]' >Add meeting room or location</span>  
          </div>
        </div>
      </div>

      {/* Right Panel for Find Timing */}
      <div className='flex flex-col w-[400px] h-[568px] rounded-[8px] bg-[#F7F7F7] mt-[-130px] border-[1px] border-[#EAEAEA] gap-[16px]'>
         <div className='relative flex items-center w-[400px] h-[42px] rounded-tl-[8px] rounded-tr-[8px] bg-[#040B23]'>
            <div 
              className='w-[176px] h-[17px] gap-[12px] px-[10px] flex items-center cursor-pointer'
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
                <span className='inter-bold text-[12px] tracking-[0.07em] text-[white]'>
                  {formatDateDisplay(selectedDate)}
                </span>
                <div className={`w-[14px] h-[14px] flex items-center justify-center transition-transform duration-200 ${
  isCalendarOpen ? 'rotate-180' : ''
}`}>
  <CalendarDropdownIcon />
</div>
            </div>

            {/* Calendar Dropdown */}
            {isCalendarOpen && (
              <div className='absolute top-[42px] left-0 w-[320px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#EAEAEA] z-50 p-[16px]'>
                {/* Month Navigation */}
                <div className='flex items-center justify-between mb-[16px]'>
                  <button 
                    onClick={handlePrevMonth}
                    className='w-[24px] h-[24px] flex items-center justify-center hover:bg-[#F7F7F7] rounded-[4px] transition-colors'
                  >
                    <PrevMonthIcon />
                  </button>
                  <span className='inter-semibold text-[13px] text-[#040B23]'>{monthYear}</span>
                  <button 
                    onClick={handleNextMonth}
                    className='w-[24px] h-[24px] flex items-center justify-center hover:bg-[#F7F7F7] rounded-[4px] transition-colors'
                  >
                    <NextMonthIcon />
                  </button>
                </div>

                {/* Weekday Headers */}
                <div className='grid grid-cols-7 gap-[4px] mb-[8px]'>
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className='flex items-center justify-center h-[32px]'>
                      <span className='inter-medium text-[10px] text-[#040B2380]'>{day}</span>
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className='grid grid-cols-7 gap-[4px]'>
                  {daysInMonth.map((date, index) => (
                    <div key={index} className='flex items-center justify-center'>
                      {date ? (
                        <button
                          onClick={() => handleDateClick(date)}
                          className={`w-[36px] h-[36px] flex items-center justify-center rounded-[6px] transition-all duration-150 ${
                            isSelected(date)
                              ? 'bg-[#040B23] text-white'
                              : isToday(date)
                              ? 'bg-[#F0F0F0] text-[#040B23] font-semibold'
                              : 'hover:bg-[#F7F7F7] text-[#040B23]'
                          }`}
                        >
                          <span className='inter-regular text-[12px]'>{date.getDate()}</span>
                        </button>
                      ) : (
                        <div className='w-[36px] h-[36px]'></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
         </div>
         
         {/* Timing meeting schedule */}
         <div className='flex flex-row w-full h-[500px] overflow-y-auto'>
            {/* Time Column */}
            <div className='w-[80px] '>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className='h-[60px] flex items-center justify-center pt-1'>
                  <span className='inter-regular text-[12px] text-[#040B23] tracking-[0.07em]'>
                    {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                  </span>
                </div>
              ))}
            </div>

            {/* Empty Time Grid */}
            <div className='flex-1'>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className='h-[60px] border-b border-[#EAEAEA]'>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};