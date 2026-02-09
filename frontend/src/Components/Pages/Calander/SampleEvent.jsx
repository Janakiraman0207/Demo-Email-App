import React from 'react';
import image1 from '../../../assets/images/image1.png';
import image2 from '../../../assets/images/image2.png';
import image3 from '../../../assets/images/image3.png';

export const SampleEvent = ({ dayIndex, events = [], currentDate }) => {
  // Helper function to calculate event position and height
  const calculateEventStyle = (fromTime, toTime) => {
    const [fromHour, fromMinute] = fromTime.split(':').map(Number);
    const [toHour, toMinute] = toTime.split(':').map(Number);
    
    const startMinutes = fromHour * 60 + fromMinute;
    const endMinutes = toHour * 60 + toMinute;
    const durationMinutes = endMinutes - startMinutes;
    
    return {
      top: `${startMinutes}px`,
      height: `${durationMinutes}px`
    };
  };

  // Get the start of the week (Sunday) for the current date
  const getWeekStart = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    start.setHours(0, 0, 0, 0);
    return start;
  };

  // Get the date for the specific day in the week
  const getDayDate = (dayIndex) => {
    const weekStart = getWeekStart(currentDate);
    const dayDate = new Date(weekStart);
    dayDate.setDate(dayDate.getDate() + dayIndex);
    return dayDate;
  };

  // Filter events for this specific day
  const dayDate = getDayDate(dayIndex);
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === dayDate.toDateString();
  });

  // Color schemes for events
  const colorSchemes = [
    { bg: '#FFEDED', accent: '#F07062' },
    { bg: '#EBEAFF', accent: '#6C63FF' },
    { bg: '#EBF6F2', accent: '#348163' },
    { bg: '#FFF4E6', accent: '#FF9800' },
    { bg: '#E8F5E9', accent: '#4CAF50' },
  ];

  return (
    <>
      {/* Dynamic Events */}
      {dayEvents.map((event, index) => {
        const style = calculateEventStyle(event.fromTime, event.toTime);
        const colorScheme = colorSchemes[index % colorSchemes.length];
        
        return (
          <div 
            key={event.id}
            className='absolute cursor-pointer'
            style={{
              top: style.top,
              left: '8px',
              width: '150px',
              height: style.height,
              borderRadius: '4px',
              background: colorScheme.bg,
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: style.height,
                background: colorScheme.accent,
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] tracking-[0.07em]' style={{ color: colorScheme.accent }}>
                {event.title || 'Untitled Event'}
              </span>
              {event.participants && event.participants.length > 0 && (
                <div className='flex flex-row h-[12px]'>
                  {event.participants.slice(0, 6).map((participant, idx) => (
                    <img 
                      key={idx}
                      src={participant} 
                      alt="Participant" 
                      className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px] first:ml-0'
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Hardcoded Sample Events (existing events) */}
      {/* Event: 9AM - 10AM on Sunday */}
      {dayIndex === 0 && (
        <>
          <div 
            className='absolute cursor-pointer'
            style={{
              top: '570px', // 9 hours * 60px = 540px
              left: '8px',
              width: '150px',
              height: '57px',
              borderRadius: '4px',
              background: '#FFEDED',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: '57px',
                background: '#F07062',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] text-[#F07062] tracking-[0.07em]'>Site Redesign</span>
               <div className='flex flex-row h-[12px]'>
                 <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
                 <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
                 <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               </div>
            </div>
          </div>

          {/* Event: 2PM - 3PM on Sunday */}
          <div 
            className='absolute cursor-pointer'
            style={{
              top: '840px', // 14 hours * 60px = 840px
              left: '8px',
              width: '150px',
              height: '99px',
              borderRadius: '4px',
              background: '#EBEAFF',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: '99px',
                background: '#6C63FF',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] text-[#6C63FF] tracking-[0.07em]'>Site Redesign</span>
               <div className='flex flex-row h-[12px]'>
                 <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
                 <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
                 <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               </div>
            </div>
          </div>
        </>
      )}

      {/* Event: 10AM - 12PM on Monday */}
      {dayIndex === 1 && (
        <>
          <div 
            className='absolute cursor-pointer'
            style={{
              top: '600px', // 10 hours * 60px = 600px
              left: '8px',
              width: '150px',
              height: '99px',
              borderRadius: '4px',
              background: '#EBF6F2',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: '99px',
                background: '#348163',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] text-[#348163] tracking-[0.07em]'>Site Redesign</span>
               <div className='flex flex-row h-[12px]'>
                 <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
                 <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
                 <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               </div>
            </div>
          </div>

          {/* Event: 12:30 AM - 1 AM on Monday */}
          <div 
            className='absolute cursor-pointer'
            style={{
              top: '750px', // 12.5 hours * 60px = 750px
              left: '8px',
              width: '150px',
              height: '57px',
              borderRadius: '4px',
              background: '#FFEDED',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: '57px',
                background: '#F07062',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] text-[#F07062] tracking-[0.07em]'>Site Redesign</span>
               <div className='flex flex-row h-[12px]'>
                 <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
                 <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
                 <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               </div>
            </div>
          </div>
        </>
      )}

      {/* Event: 10:30 AM on Wednesday */}
      {dayIndex === 3 && (
        <>
          <div 
            className='absolute cursor-pointer'
            style={{
              top: '630px', // 10.5 hours * 60px = 630px
              left: '8px',
              width: '150px',
              height: '57px',
              borderRadius: '4px',
              background: '#FFEDED',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: '57px',
                background: '#F07062',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] text-[#F07062] tracking-[0.07em]'>Site Redesign</span>
               <div className='flex flex-row h-[12px]'>
                 <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
                 <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
                 <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               </div>
            </div>
          </div>

          {/* Event: 3:30 PM on Wednesday */}
          <div 
            className='absolute cursor-pointer'
            style={{
              top: '930px', // 15.5 hours * 60px = 930px
              left: '8px',
              width: '150px',
              height: '57px',
              borderRadius: '4px',
              background: '#FFEDED',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: '57px',
                background: '#F07062',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] text-[#F07062] tracking-[0.07em]'>Site Redesign</span>
               <div className='flex flex-row h-[12px]'>
                 <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
                 <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
                 <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               </div>
            </div>
          </div>
        </>
      )}

      {/* Event: 11:30 AM - 12:30 PM on Thursday */}
      {dayIndex === 4 && (
        <div 
          className='absolute cursor-pointer'
          style={{
            top: '690px', // 11.5 hours * 60px = 690px
            left: '8px',
            width: '150px',
            height: '99px',
            borderRadius: '4px',
            background: '#EBF6F2',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden'
          }}
        >
          {/* Vertical line at left */}
          <div 
            style={{
              width: '3.88px',
              height: '99px',
              background: '#348163',
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px'
            }}
          />
          {/* Event content */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '50px',
              padding: '8px 10px',
              flex: 1
            }}
          >
            <span className='inter-bold text-[12px] text-[#348163] tracking-[0.07em]'>Site Redesign</span>
             <div className='flex flex-row h-[12px]'>
               <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
               <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
             </div>
          </div>
        </div>
      )}

      {/* Event: 11:00 AM - 11:30 AM on Friday */}
      {dayIndex === 5 && (
        <>
          <div 
            className='absolute cursor-pointer'
            style={{
              top: '660px', // 11 hours * 60px = 660px
              left: '8px',
              width: '150px',
              height: '57px',
              borderRadius: '4px',
              background: '#FFEDED',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: '57px',
                background: '#F07062',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] text-[#F07062] tracking-[0.07em]'>Site Redesign</span>
               <div className='flex flex-row h-[12px]'>
                 <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
                 <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
                 <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               </div>
            </div>
          </div>

          {/* Event: 1:30 PM - 2:30 PM on Friday */}
          <div 
            className='absolute cursor-pointer'
            style={{
              top: '810px', // 13.5 hours * 60px = 810px
              left: '8px',
              width: '150px',
              height: '99px',
              borderRadius: '4px',
              background: '#EBF6F2',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden'
            }}
          >
            {/* Vertical line at left */}
            <div 
              style={{
                width: '3.88px',
                height: '99px',
                background: '#348163',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px'
              }}
            />
            {/* Event content */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
                padding: '8px 10px',
                flex: 1
              }}
            >
              <span className='inter-bold text-[12px] text-[#348163] tracking-[0.07em]'>Site Redesign</span>
               <div className='flex flex-row h-[12px]'>
                 <img src={image1} alt="Profile" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full'/>
                 <img src={image2} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
                 <img src={image3} alt="" className='w-[11.63px] h-[12px] border-[0.5px] border-[#FAFAFA] rounded-full -ml-[3px]'/>
               </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
