import React, { useState } from 'react';
import image1 from '../../../../assets/images/image1.png';
import image2 from '../../../../assets/images/image2.png';
import image3 from '../../../../assets/images/image3.png';
import profileimg from '../../../../assets/images/profileimg.png';
import profileimg1 from '../../../../assets/images/profileimg1.png';
import profileimg2 from '../../../../assets/images/profileimg2.png';
import { FindTiming } from './FindTiming';
import {
  Closeicon,
  VideoIcon,
  Smallicons,
  Calandericons,
  DropdownIcon,
  ClockIcon,
  RightarrowIcon,
  ArrowsIcon,
  AlarmIcon,
  Boldicon,
  Italicicon,

  ParticipantIcon,
  ThreedotIcon,
  Locationicon,
  DescriptionIcon,
  Underlineicon,
  Alignicon,
  LinkIcon,
  BulletIcon,
  CheckboxIcon} from '../../../../assets/icons/Icons';

export const NewEvents1 = ({ showAdvancedOptions, handleCloseAdvancedOptions }) => {
  const [activeTab, setActiveTab] = useState('eventDetails');
  const [selectedDate, setSelectedDate] = useState(new Date()); // Today's date
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [isFromTimeOpen, setIsFromTimeOpen] = useState(false);
  const [isToTimeOpen, setIsToTimeOpen] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [notification, setNotification] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [category, setCategory] = useState({ name: '', color: '' });
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState([profileimg, profileimg1, profileimg2]);
  const [showParticipantDropdown, setShowParticipantDropdown] = useState(false);

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
    const dayName = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    return `${dayName}, ${month} ${day}`;
  };

  // Get days in month for calendar
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  // Generate time slots (15-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        slots.push({
          value: `${hourStr}:${minuteStr}`,
          display: `${displayHour}:${minuteStr} ${period}`
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Notification options
  const notificationOptions = [
    '5 minutes before',
    '10 minutes before',
    '15 minutes before',
    '30 minutes before',
    '1 hour before',
    '2 hours before',
    '1 day before',
    '1 week before'
  ];

  // Category options with colors
  const categoryOptions = [
    { name: 'Work', color: '#D22A84' },
    { name: 'Personal', color: '#2A84D2' },
    { name: 'Meeting', color: '#2AD284' },
    { name: 'Important', color: '#D2842A' },
    { name: 'Others', color: '#842AD2' }
  ];

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsDateDropdownOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleYearChange = (year) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  const addParticipant = (participantImage) => {
    if (!participants.includes(participantImage)) {
      setParticipants([...participants, participantImage]);
    }
    setShowParticipantDropdown(false);
  };

  const removeParticipant = (participantImage) => {
    setParticipants(participants.filter(p => p !== participantImage));
  };

  // Get available participants (not already added)
  const availableParticipants = allParticipants.filter(
    p => !participants.includes(p.image)
  );

  // Generate year options (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

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
  
  if (!showAdvancedOptions) return null;

  return (
    <>
      {/* Advanced Options Backdrop */}
      <div 
        className='fixed inset-0 bg-opacity-30 z-60'
        onClick={handleCloseAdvancedOptions}
      ></div>
      
      {/* Advanced Options Modal */}
      <div 
        className='fixed z-[70] bg-white rounded-[20px] shadow-2xl'
        style={{
          width: '868px',
          height: '758px',
          padding: '20px',
          top: '37px',
          left: '300px'
        }}
      >
        {/* Advanced Modal Header */}
        <div className='flex flex-col w-[825px] h-[723px] gap-[22px]'>
            <div className='flex flex-row items-center justify-between w-[full] h-[27px] gap-[0px]'>
              <div className='flex flex-row w-[158px] h-[27px] gap-[12px]'>
                <div className='flex flex-col gap-[3px]' onClick={() => setActiveTab('eventDetails')}>
                  <span className={`${activeTab === 'eventDetails' ? 'inter-bold' : 'inter-regular'} text-[11px] text-[#040B23]`}>Event Details</span>
                  {activeTab === 'eventDetails' && (
                    <div className='w-[71px] h-[2px] bg-[#040B23]'></div>
                  )}
                </div>
                <div className='flex flex-col gap-[3px]' onClick={() => setActiveTab('findTimings')}>
                  <span className={`${activeTab === 'findTimings' ? 'inter-bold' : 'inter-regular'} text-[11px]`}>Find Timings</span>
                  {activeTab === 'findTimings' && (
                    <div className='w-[71px] h-[2px] bg-[#040B23]'></div>
                  )}
                </div>
              </div>
              <div className='w-[24px] h-[24px] flex items-center justify-center cursor-pointer' onClick={handleCloseAdvancedOptions}>
                <Closeicon />
              </div>
            </div>

            <div className='flex items-center w-[61px] h-[22px]'>
                <span className='inter-bold text-[18px] '>Events</span>
            </div>

            <div className='flex flex-row w-[816px] h-[630px] gap-[16px]'>
                {/*Left panel - Always visible */}
                <div className='flex flex-col w-[400px] h-[full] gap-[20px]'>

                    {/* Title Input - Only show when Event Details is active */}
                    {activeTab === 'eventDetails' && (
                      <div className='flex flex-row w-[400px] h-[42px] gap-[10px]'>
                          <div className='flex items-center justify-center w-[42px] h-[42px] rounded-[12.15px] bg-[#03081B]'>
                              <VideoIcon />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Title here" 
                            className='w-[348px] h-[42px] inter-regular text-[10px] placeholder:text-[#909090] px-[10px] py-[11px] border border-[#EAEAEA] rounded-[8px]'
                          />
                      </div>
                    )}

                    {/* Date and Time Input */}
                    <div className='flex flex-col w-[400px] h-[115px] gap-[5px]'>
                        {/* Date & Time Label and Input */}
                        <div className='flex flex-col w-[400px] h-[65px] gap-[10px]'>
                          <div className='flex flex-row justify-between w-[400px] h-[13px]'>
                              <span className='inter-regular text-[11px] tracking-[0.02em]'>Date & Time</span>
                              <div 
                                className='flex flex-row items-center justify-between w-[64px] h-[13px] cursor-pointer'
                                onClick={() => setAllDay(!allDay)}
                              >
                                <Smallicons />
                                 {/* <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="8" height="8" rx="4" fill={allDay ? '#040B23' : '#CFCFCF'}/>
                                    {allDay && (
                                      <path d="M2 4L3.5 5.5L6 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    )}
                                 </svg> */}
                                  <span className='inter-regular text-[11px] tracking-[0.02em]'>All days</span>
                              </div>
                          </div>
                          <div className='relative w-[400px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px] gap-[10px]'>
                              <div 
                                className='flex items-center justify-between w-[375px] h-[20px] cursor-pointer'
                                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                              >
                                 <div className='flex flex-row w-[144px] h-[20px] gap-[8px]'>
                                    <Calandericons />
                                     <span className='inter-bold text-[10px] whitespace-nowrap'>{formatDateDisplay(selectedDate)}</span>
                                 </div>
                                 <div className={`flex items-center justify-center w-[14px] h-[14px] transition-transform duration-200 ${
                                   isDateDropdownOpen ? 'rotate-180' : ''
                                 }`}>
                                  <DropdownIcon />
                                 </div>
                              </div>

                              {/* Date Calendar Dropdown */}
                              {isDateDropdownOpen && (
                                <div className='absolute top-[44px] left-0 w-[320px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#EAEAEA] z-50 p-[16px]'>
                                  {/* Month Navigation */}
                                  <div className='flex items-center justify-between mb-[16px]'>
                                    <button 
                                      onClick={handlePrevMonth}
                                      className='w-[24px] h-[24px] flex items-center justify-center hover:bg-[#F7F7F7] rounded-[4px] transition-colors'
                                    >
                                      <ClockIcon />
                                    </button>
                                    <div className='relative flex items-center gap-[8px]'>
                                      <span className='inter-semibold text-[13px] text-[#040B23]'>
                                        {currentMonth.toLocaleString('en-US', { month: 'long' })}
                                      </span>
                                      <div 
                                        className='flex items-center gap-[4px] cursor-pointer hover:bg-[#F7F7F7] px-[6px] py-[2px] rounded-[4px] transition-colors'
                                        onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                                      >
                                        <span className='inter-semibold text-[13px] text-[#040B23]'>
                                          {currentMonth.getFullYear()}
                                        </span>
                                        <DropdownIcon />
                                      </div>
                                      
                                      {/* Year Dropdown */}
                                      {isYearDropdownOpen && (
                                        <div className='absolute top-[28px] right-0 w-[100px] max-h-[200px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#EAEAEA] z-50 overflow-y-auto'>
                                          {yearOptions.map((year) => (
                                            <div
                                              key={year}
                                              onClick={() => handleYearChange(year)}
                                              className={`px-[12px] py-[6px] cursor-pointer transition-colors duration-150 hover:bg-[#F7F7F7] ${
                                                currentMonth.getFullYear() === year ? 'bg-[#F0F0F0]' : ''
                                              }`}
                                            >
                                              <span className='inter-regular text-[12px] text-[#040B23]'>{year}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <button 
                                      onClick={handleNextMonth}
                                      className='w-[24px] h-[24px] flex items-center justify-center hover:bg-[#F7F7F7] rounded-[4px] transition-colors'
                                    >
                                      <RightarrowIcon />
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
                        </div>

                        {/* Time zone input */}
                        <div className='flex flex-row items-center w-[400px] h-[42px] gap-[6px]'>
                            {/* From */}
                            <div className='relative w-[184px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
                               <div 
                                 className='flex flex-row w-[158px] h-[20px] gap-[8px] cursor-pointer'
                                 onClick={() => setIsFromTimeOpen(!isFromTimeOpen)}
                               >
                                   <div className='flex flex-row items-center w-[123px] h-[20px] gap-[8px]'>
                                      <ClockIcon />
                                      <span className='inter-regular text-[10px] text-[#040B2363]'>
                                        {fromTime || 'From'}
                                      </span>
                                   </div>
                                   <div className={`flex items-center justify-center w-[14px] h-[14px] transition-transform duration-200 ${
                                     isFromTimeOpen ? 'rotate-180' : ''
                                   }`}>
                                     <DropdownIcon />
                                   </div>
                               </div>

                               {/* From Time Dropdown */}
                               {isFromTimeOpen && (
                                 <div className='absolute top-[44px] left-0 w-[180px] max-h-[200px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#EAEAEA] z-50 overflow-y-auto'>
                                   {timeSlots.map((slot, index) => (
                                     <div
                                       key={index}
                                       onClick={() => {
                                         setFromTime(slot.display);
                                         setIsFromTimeOpen(false);
                                       }}
                                       className={`px-[12px] py-[8px] cursor-pointer transition-colors duration-150 hover:bg-[#F7F7F7] ${
                                         fromTime === slot.display ? 'bg-[#F0F0F0]' : ''
                                       }`}
                                     >
                                       <span className='inter-regular text-[11px] text-[#040B23]'>{slot.display}</span>
                                     </div>
                                   ))}
                                 </div>
                               )}
                            </div>

                            <div className='flex items-center justify-between w-[20px] h-[20px]'>
                                <ArrowsIcon />
                            </div>

                            {/* To */}
                            <div className='relative w-[184px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
                               <div 
                                 className='flex flex-row w-[158px] h-[20px] gap-[21px] cursor-pointer'
                                 onClick={() => setIsToTimeOpen(!isToTimeOpen)}
                               >
                                   <div className='flex flex-row items-center w-[123px] h-[20px] gap-[8px]'>
                                      <span className='inter-regular text-[10px] text-[#040B2363]'>
                                        {toTime || 'To'}
                                      </span>
                                   </div>
                                   <div className={`flex items-center justify-center w-[14px] h-[14px] transition-transform duration-200 ${
                                     isToTimeOpen ? 'rotate-180' : ''
                                   }`}>
                                     <DropdownIcon />
                                   </div>
                               </div>

                               {/* To Time Dropdown */}
                               {isToTimeOpen && (
                                 <div className='absolute top-[44px] left-0 w-[180px] max-h-[200px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#EAEAEA] z-50 overflow-y-auto'>
                                   {timeSlots.map((slot, index) => (
                                     <div
                                       key={index}
                                       onClick={() => {
                                         setToTime(slot.display);
                                         setIsToTimeOpen(false);
                                       }}
                                       className={`px-[12px] py-[8px] cursor-pointer transition-colors duration-150 hover:bg-[#F7F7F7] ${
                                         toTime === slot.display ? 'bg-[#F0F0F0]' : ''
                                       }`}
                                     >
                                       <span className='inter-regular text-[11px] text-[#040B23]'>{slot.display}</span>
                                     </div>
                                   ))}
                                 </div>
                               )}
                            </div>
                        </div>
                    </div>

                    {activeTab === 'eventDetails' && (
                      <>
                        {/* Notification and Categories */}
                        <div className='flex flex-row w-[400px] h-[65px] gap-[16px]'>
                            {/* Notification */}
                            <div className='flex flex-col w-[192px] h-[65px] gap-[10px]'>
                                <span className='inter-regular text-[11px] tracking-[0.02em]'>Notification</span>
                                <div className='relative w-[192px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
                                    <div 
                                      className='flex flex-row justify-between w-[167px] h-[20px] cursor-pointer'
                                      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                    >
                                        <div className='flex flex-row items-center w-[123px] h-[20px] gap-[8px]'>
                                          <AlarmIcon />
                                          <span className='inter-regular text-[10px] text-[#040B2363] whitespace-nowrap overflow-hidden text-ellipsis'>
                                            {notification || 'Select time'}
                                          </span>
                                        </div>
                                        <div className={`w-[14px] h-[14px] flex items-center justify-center transition-transform duration-200 ${
                                          isNotificationOpen ? 'rotate-180' : ''
                                        }`}>
                                            <DropdownIcon/>
                                        </div>
                                    </div>

                                    {/* Notification Dropdown */}
                                    {isNotificationOpen && (
                                      <div className='absolute top-[44px] left-0 w-[192px] max-h-[200px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#EAEAEA] z-50 overflow-y-auto'>
                                        {notificationOptions.map((option, index) => (
                                          <div
                                            key={index}
                                            onClick={() => {
                                              setNotification(option);
                                              setIsNotificationOpen(false);
                                            }}
                                            className={`px-[12px] py-[8px] cursor-pointer transition-colors duration-150 hover:bg-[#F7F7F7] ${
                                              notification === option ? 'bg-[#F0F0F0]' : ''
                                            }`}
                                          >
                                            <span className='inter-regular text-[11px] text-[#040B23]'>{option}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className='flex flex-col w-[192px] h-[65px] gap-[10px]'>
                                <span className='inter-regular text-[11px] tracking-[0.02em]'>Categories</span>
                                <div className='relative w-[192px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
                                    <div 
                                      className='flex flex-row justify-between w-[167px] h-[20px] cursor-pointer'
                                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    >
                                        <div className='flex flex-row items-center w-[123px] h-[20px] gap-[8px]'>
                                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="7" cy="7" r="7" fill={category.color || '#D22A84'}/>
                                          </svg>
                                          <span className='inter-regular text-[10px] text-[#040B2363]'>
                                            {category.name || 'Select'}
                                          </span>
                                        </div>
                                        <div className={`w-[14px] h-[14px] flex items-center justify-center transition-transform duration-200 ${
                                          isCategoryOpen ? 'rotate-180' : ''
                                        }`}>
                                            <DropdownIcon/>
                                        </div>
                                    </div>

                                    {/* Categories Dropdown */}
                                    {isCategoryOpen && (
                                      <div className='absolute top-[44px] left-0 w-[192px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#EAEAEA] z-50'>
                                        {categoryOptions.map((option, index) => (
                                          <div
                                            key={index}
                                            onClick={() => {
                                              setCategory(option);
                                              setIsCategoryOpen(false);
                                            }}
                                            className={`px-[12px] py-[8px] cursor-pointer transition-colors duration-150 hover:bg-[#F7F7F7] flex items-center gap-[8px] ${
                                              category.name === option.name ? 'bg-[#F0F0F0]' : ''
                                            }`}
                                          >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <circle cx="7" cy="7" r="7" fill={option.color}/>
                                            </svg>
                                            <span className='inter-regular text-[11px] text-[#040B23]'>{option.name}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Location input */}
                        <div className='flex flex-col w-[400px] h-[65px] gap-[10px]'>
                            <span className='inter-regular text-[11px] tracking-[0.02em]'>Location</span>
                            <div className='flex flex-row items-center w-[400px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px] gap-[8px]'>
                               <div className='w-[20px] h-[20px] flex items-center justify-center'>
                                  <Locationicon />
                               </div>
                               <span className='inter-regular text-[10px] text-[#040B2363]' >Add meeting room or location</span>  
                            </div>
                        </div>

                        {/* Description Input */}
                        <div className='flex flex-col w-[400px] h-[246px] gap-[10px]'>
                          <span className='inter-regular text-[11px] tracking-[0.02em]'>Description</span>
                          <div className='flex flex-col w-[400px] h-[223px] rounded-[8px] border-[1px] border-[#EAEAEA] gap-[4px]'>
                            <div className='w-[400px] h-[24px] bg-[#F1F2F3] rounded-tl-[8px] rounded-tr-[8px] py-[5px] px-[15px] gap-[10px]'>
                              <div className='flex flex-row w-[184px] h-[14px] gap-[20px]'>

                                {/* Bold */}
                                  <div className='w-[14px] h-[14px] cursor-pointer hover:opacity-70 transition-opacity' title='Bold'>
                                     <Boldicon />
                                  </div>
                                  <div className='w-[14px] h-[14px] cursor-pointer hover:opacity-70 transition-opacity' title='Italic'>
                                      <Italicicon />
                                  </div>
                                  <div className='w-[14px] h-[14px] cursor-pointer hover:opacity-70 transition-opacity' title='Underline'>
                                      <Underlineicon />
                                  </div>
                                  <div className='w-[14px] h-[14px] cursor-pointer hover:opacity-70 transition-opacity' title='Align'>
                                      <Alignicon />
                                  </div>
                                  <div className='w-[14px] h-[14px] cursor-pointer hover:opacity-70 transition-opacity' title='Quote'>
                                      <LinkIcon />
                                  </div>
                                  <div className='w-[14px] h-[14px] cursor-pointer hover:opacity-70 transition-opacity' title='List'>
                                      <BulletIcon />
                                  </div>
                              </div>
                            </div>
                            <div className='flex flex-row items-start w-[400px] h-[199px] px-[12px] py-[11px] gap-[8px]'>
                                 {description === '' && (
                                  <DescriptionIcon />
                                  )}
                                 <textarea  
                                      placeholder='Add a description'
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      className='flex-1 inter-regular text-[10px] placeholder:text-[#909090] border-none outline-none resize-none'
                                 />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === 'findTimings' && (
                      <FindTiming />
                    )}
                </div>
                
                {/*Right panel - Only show when Event Details is active */}
                {activeTab === 'eventDetails' && (
                  <div className='flex flex-col w-[400px] h-[full] gap-[20px]'>
                    {/* Participants */}
                    <div className='relative flex flex-col w-[400px] h-[111px] gap-[10px]'>
                      <span className='inter-regular text-[11px] tracking-[0.02em] '>Participants</span>
                      <div className='w-[400px] h-[88px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
                          <div className='flex flex-col w-[376px] h-[64px] gap-[24px]'>
                             <div 
                               className='flex flex-row items-center w-[123px] h-[20px] gap-[8px] cursor-pointer hover:opacity-70 transition-opacity'
                               onClick={() => setShowParticipantDropdown(!showParticipantDropdown)}
                             >
                                <ParticipantIcon />
                                <span className='inter-regular text-[10px] text-[#040B2363]'>Add participant(s)</span>
                             </div>

                             <div className='flex flex-row justify-between w-[376px] h-[20px]'>
                               <div className='flex flex-row h-[20px] gap-[6px] flex-wrap'>
                                  {participants.map((participant, index) => (
                                    <div key={index} className='relative group'>
                                      <img 
                                        src={participant} 
                                        alt='Participant' 
                                        className='w-[20px] h-[20px] rounded-full cursor-pointer hover:opacity-70 transition-opacity'
                                        onClick={() => removeParticipant(participant)}
                                      />
                                      {/* Remove icon on hover */}
                                      <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                      </div>
                                    </div>
                                  ))}
                               </div>
                               <div className='flex items-center w-[20px] h-[20px]'>
                                  <ThreedotIcon />
                               </div>
                             </div>
                          </div>
                      </div>

                      {/* Participant Dropdown */}
                      {showParticipantDropdown && availableParticipants.length > 0 && (
                        <div className='absolute top-[45px] left-0 z-50 bg-white rounded-[8px] border border-[#EAEAEA] shadow-lg w-[200px] max-h-[200px] overflow-y-auto'>
                          {availableParticipants.map((participant) => (
                            <div
                              key={participant.id}
                              className='flex items-center gap-[8px] px-4 py-2 hover:bg-[#F3F3F3] cursor-pointer'
                              onClick={() => addParticipant(participant.image)}
                            >
                              <img src={participant.image} alt={participant.name} className='w-[24px] h-[24px] rounded-full' />
                              <span className='inter-regular text-[10px]'>{participant.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className='flex flex-col w-[146px] h-[115px] gap-[20px]'>
                        <span className='inter-regular text-[11px] tracking-[0.02em]'>Guest Permissions</span>
                        <div className='flex flex-col w-[146px] h-[82px] gap-[10px]'>
                          <div className='flex flex-row w-[146px] h-[20px] gap-[10px]'>
                             <div className='w-[20px] h-[20px] flex items-center justify-center'>
                                <CheckboxIcon />
                             </div>
                            <span className='inter-semibold text-[12px] text-[#040B23]'>Modify event</span>
                          </div>
                          <div className='flex flex-row w-[146px] h-[20px] gap-[10px]'>
                             <div className='w-[20px] h-[20px] flex items-center justify-center'>
                                <CheckboxIcon />
                             </div>
                            <span className='inter-semibold text-[12px] text-[#040B23]'>Invite others</span>
                          </div>
                          <div className='flex flex-row w-[146px] h-[20px] gap-[10px]'>
                             <div className='w-[20px] h-[20px] flex items-center justify-center'>
                                <CheckboxIcon />
                             </div>
                            <span className='inter-semibold text-[12px] text-[#040B23]'>See guest list</span>
                          </div>
                        </div>
                    </div>
                  </div>
                )}
            </div>
        </div>

        {/* Save Button - Bottom Right */}
        <div className='flex w-full'>
            <button 
              type='button' 
              className='w-[105px] h-[42px] bg-[#6231A5] rounded-[8px] mt-[-40px] ml-[720px] flex items-center justify-center text-white inter-semibold text-[14px] hover:bg-[#7843b8] transition-colors'
            >
              Save
            </button>
        </div>
      </div>
    </>
  );
};