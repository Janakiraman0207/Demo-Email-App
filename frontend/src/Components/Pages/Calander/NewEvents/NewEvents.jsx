import React, { useState } from 'react';
import image1 from '../../../../assets/images/image1.png';
import image2 from '../../../../assets/images/image2.png';
import image3 from '../../../../assets/images/image3.png';
import profileimg from '../../../../assets/images/profileimg.png';
import profileimg1 from '../../../../assets/images/profileimg1.png';
import profileimg2 from '../../../../assets/images/profileimg2.png';
import { NewEvents1 } from './NewEvents1';
import SuccessPopUp from './SuccessPopUp';
import {
  Closeicon,
  VideoIcon,
  Smallicons,
  Calandericons,
  DropdownIcon,
  ClockIcon,
  ArrowsIcon,
  ParticipantIcon,
  ThreedotIcon,
  Locationicon,
  DescriptionIcon} from '../../../../assets/icons/Icons';
 

export const NewEvents = ({ showEventModal, handleCloseModal, addEvent, currentDate }) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('10:00');
  const [showFromTimeDropdown, setShowFromTimeDropdown] = useState(false);
  const [showToTimeDropdown, setShowToTimeDropdown] = useState(false);
  const [participants, setParticipants] = useState([profileimg, profileimg1, profileimg2]);
  const [showParticipantDropdown, setShowParticipantDropdown] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // All available participants
  const allParticipants = [
    { id: 1, image: profileimg, name: 'User 1' },
    { id: 2, image: profileimg1, name: 'User 2' },
    { id: 3, image: profileimg2, name: 'User 3' },
    { id: 4, image: image1, name: 'User 4' },
    { id: 5, image: image2, name: 'User 5' },
    { id: 6, image: image3, name: 'User 6' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create event object
    const newEvent = {
      title: eventTitle,
      date: selectedDate,
      fromTime: fromTime,
      toTime: toTime,
      participants: participants,
      location: location,
      description: description
    };

    // Add event to calendar
    addEvent(newEvent);

    // Clear form
    setEventTitle('');
    setDescription('');
    setLocation('');
    setFromTime('09:00');
    setToTime('10:00');
    setParticipants([profileimg, profileimg1, profileimg2]);

    // Show success popup
    setShowSuccess(true);

    // Hide popup and close modal after 1.5s
    setTimeout(() => {
      setShowSuccess(false);
      handleCloseModal();
    }, 1500);
  };

  const handleAdvancedOptions = () => {
    setShowAdvancedOptions(true);
  };

  const handleCloseAdvancedOptions = () => {
    setShowAdvancedOptions(false);
    handleCloseModal(); // Close the main NewEvents modal as well
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Generate time options (24-hour format)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        times.push(`${hourStr}:${minuteStr}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const formatTime12Hour = (time24) => {
    const [hour, minute] = time24.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
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

  if (!showEventModal) return null;

  return (
    <>
      {/* Success Popup */}
      {showSuccess && <SuccessPopUp />}

      {/* Backdrop */}
      <div 
        className='fixed inset-0 bg-opacity-20 z-20'
        onClick={handleCloseModal}
      ></div>
      
      {/* Main Modal - Only show when Advanced Options is not open */}
      {!showAdvancedOptions && (
        <div 
          className='fixed z-50 bg-white rounded-[20px] shadow-2xl'
          style={{
            width: '460px',
            height: '637px',
            top: '98px',
            left: '500px'
          }}
        >
          {/* Modal Header */}
          <div className='flex items-center justify-between px-6 py-4'>
            <h2 className='inter-bold text-[18px] text-[#040B23]'>Create Event</h2>
            <button 
              onClick={handleCloseModal}
              className='w-[24px] h-[24px] flex items-center justify-center hover:bg-[#F3F3F3] rounded-full transition-colors'
            >
              <Closeicon />
            </button>
          </div>

          {/* Modal Content */}
          <div className='px-6 py-4 overflow-y-auto' style={{ height: '541px' }}>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              {/* Event Title */}
              <div className='flex flex-row w-[400px] h-[42px] gap-[10px]'>
                  <div className='flex items-center justify-center w-[42px] h-[42px] rounded-[12.15px] bg-[#03081B]'>
                      <VideoIcon />
                  </div>
                  <input 
                    type='text' 
                    placeholder='Title here'
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className='flex-1 px-3 py-2 bg-white border border-[#EAEAEA] rounded-[6px] inter-regular text-[10px] focus:outline-none focus:border-[#040B23]'
                  />
              </div>

              {/* Date */}
              <div className='flex justify-between w-[400px] h-[13px]'>
                  <span className='inter-regular text-[11px] tracking-[0.02em] '>Date & Time</span>
                  <div className='flex flex-row items-center w-[64px] h-[13px] gap-[10px]'>
                      <Smallicons />
                      <span className='inter-regular text-[11px] tracking-[0.02em]'>All days</span>
                  </div>
              </div>

              {/* Date schedule */}
              <div className='relative'>
                <div 
                  className='w-[400px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px] gap-[10px] cursor-pointer hover:border-[#040B23] transition-colors'
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <div className='flex flex-row justify-between w-[374px] h-[20px] '>
                      <div className='flex flex-row items-center w-[144px] h-[20px] gap-[8px]'>
                        <div className='w-[20px] h-[20px]'>
                          <Calandericons />
                        </div>
                        <span className='inter-bold text-[10px] whitespace-nowrap'>{formatDate(selectedDate)}</span>
                      </div>
                      <div className='flex items-center justify-center w-[14px] h-[14px]'>
                        <DropdownIcon />
                      </div>
                  </div>
                </div>

                {/* Date Picker Dropdown */}
                {showDatePicker && (
                  <div className='absolute top-[45px] left-0 z-50 bg-white rounded-[8px] border border-[#EAEAEA] shadow-lg p-4 w-[400px]'>
                    <input 
                      type='date'
                      value={selectedDate.toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange(new Date(e.target.value))}
                      className='w-full px-3 py-2 border border-[#EAEAEA] rounded-[6px] inter-regular text-[12px] focus:outline-none focus:border-[#040B23]'
                    />
                  </div>
                )}
              </div>

              {/*Time*/}
              <div className='flex flex-row items-center w-[400px] h-[42px] gap-[6px]'>
                  {/* From */}
                  <div className='relative w-[184px]'>
                    <div 
                      className='w-[184px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] gap-[10px] px-[12px] py-[11px] cursor-pointer hover:border-[#040B23] transition-colors'
                      onClick={() => setShowFromTimeDropdown(!showFromTimeDropdown)}
                    >
                        <div className='flex flex-row justify-between w-[158px] h-[20px] gap-[21px]'>
                          <div className='flex items-center w-[123px] h-[20px] gap-[8px]'>
                             <ClockIcon />
                             <span className='inter-bold text-[10px]'>{formatTime12Hour(fromTime)}</span>
                          </div>
                          <div className='flex items-center justify-center mt-[3px] w-[14px] h-[14px]'>
                            <DropdownIcon />
                          </div>
                        </div>
                    </div>
                    
                    {/* From Time Dropdown */}
                    {showFromTimeDropdown && (
                      <div className='absolute top-[45px] left-0 z-50 bg-white rounded-[8px] border border-[#EAEAEA] shadow-lg w-[184px] max-h-[200px] overflow-y-auto'>
                        {timeOptions.map((time) => (
                          <div
                            key={time}
                            className='px-4 py-2 hover:bg-[#F3F3F3] cursor-pointer inter-regular text-[10px]'
                            onClick={() => {
                              setFromTime(time);
                              setShowFromTimeDropdown(false);
                            }}
                          >
                            {formatTime12Hour(time)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className='flex items-center w-[20px] h-[20px]'>
                      <ArrowsIcon />
                  </div>

                  {/* To */}
                  <div className='relative w-[184px]'>
                    <div 
                      className='w-[184px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] gap-[10px] px-[12px] py-[11px] cursor-pointer hover:border-[#040B23] transition-colors'
                      onClick={() => setShowToTimeDropdown(!showToTimeDropdown)}
                    >
                        <div className='flex flex-row justify-between w-[158px] h-[20px] gap-[21px]'>
                             <span className='inter-bold text-[10px]'>{formatTime12Hour(toTime)}</span>
                          <div className='flex items-center justify-center mt-[3px] w-[14px] h-[14px]'>
                            <DropdownIcon />
                          </div>
                        </div>
                    </div>
                    
                    {/* To Time Dropdown */}
                    {showToTimeDropdown && (
                      <div className='absolute top-[45px] left-0 z-50 bg-white rounded-[8px] border border-[#EAEAEA] shadow-lg w-[184px] max-h-[200px] overflow-y-auto'>
                        {timeOptions.map((time) => (
                          <div
                            key={time}
                            className='px-4 py-2 hover:bg-[#F3F3F3] cursor-pointer inter-regular text-[10px]'
                            onClick={() => {
                              setToTime(time);
                              setShowToTimeDropdown(false);
                            }}
                          >
                            {formatTime12Hour(time)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
              </div>

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

              {/* Location */}
              <div className='flex flex-col w-[400px] h-[70px] gap-[10px]'>
                <span className='inter-regular text-[11px] tracking-[0.02em]'>Location</span>
                <div className='w-[400px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
                  <div className='flex flex-row items-center w-[376px] h-[20px] gap-[8px]'>
                    <Locationicon />
                    <input 
                      type='text' 
                      placeholder='Add meeting room or location'
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className='flex-1 inter-regular text-[10px] text-[#040B2363] focus:outline-none border-none'
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className='flex flex-col w-[400px] h-[65px] gap-[10px]'>
                 <span className='inter-regular text-[11px] tracking-[0.02em]'>Description</span>
                  <div className='w-[400px] h-[42px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[12px] py-[11px]'>
                  <div className='flex flex-row items-start w-[376px] h-[20px] gap-[8px]'>
                    {description === '' && (
                     <DescriptionIcon />
                    )}
                    <textarea
                     placeholder='Add a description'
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     rows={1}
                     className='flex-1 inter-regular text-[10px] text-[black] focus:outline-none border-none resize-none'
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className='flex flex-row items-center justify-between w-[400px] h-[42px] mt-[10px]'>
                  <button type='submit' className='flex items-center justify-center w-[105px] h-[42px] rounded-[8px] bg-[#6231A5] text-[14px] text-white inter-semibold'>Save</button>
                  <button 
                    type='button'
                    onClick={handleAdvancedOptions}
                    className='inter-semibold text-[14px] text-[#6231A5] cursor-pointer hover:underline'
                  >
                    Advanced option
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Advanced Options Modal Component */}
      <NewEvents1 
        showAdvancedOptions={showAdvancedOptions}
        handleCloseAdvancedOptions={handleCloseAdvancedOptions}
      />
    </>
  );
};