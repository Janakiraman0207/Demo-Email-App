import React, { useState } from 'react';
import SettingsGeneral from './SettingsGeneral';
import SettingsPeople from './SettingsPeople';
import SettingsCalander from './SettingsCalander'; // Add this import

const popupStyle = {
  position: 'absolute',
  width: '715px',
  height: '499px',
  top: '167px',
  left: '281px',
  opacity: 1,
  borderWidth: '0px 0px 0px 0px',
  borderStyle: 'solid',
  borderColor: '#EAEAEA',
  boxSizing: 'border-box',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
};

function Settings() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotif, setEmailNotif] = useState(false);
  const [search, setSearch] = useState('');
  const [activeSidebar, setActiveSidebar] = useState('Account');

  return (
    <div style={popupStyle}>
      <div className='w-full h-[60px] border-b-[1px] border-[#EAEAEA]'>
        <h1 className='inter-bold text-[18px] text-[#03081B] px-[25px] py-[25px]'>Settings</h1>
      </div>
      <div className='flex-grow flex flex-row overflow-auto'>
        {/* Left Sidebar */}
        <div className='w-[240px] h-full flex flex-col border-r-[1px] border-[#EAEAEA] gap-[20px] pl-[30px] py-[25px]'>
          <div className='flex flex-row items-center gap-[10px] w-[190px] h-[40px] rounded-[8px] border-[1px] border-[#EAEAEA] px-[15px] py-[10px] bg-white'>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83333 9.83333L12.5 12.5M11.1667 5.83333C11.1667 4.41885 10.6048 3.06229 9.60457 2.0621C8.60438 1.0619 7.24782 0.5 5.83333 0.5C4.41885 0.5 3.06229 1.0619 2.0621 2.0621C1.0619 3.06229 0.5 4.41885 0.5 5.83333C0.5 7.24782 1.0619 8.60438 2.0621 9.60457C3.06229 10.6048 4.41885 11.1667 5.83333 11.1667C7.24782 11.1667 8.60438 10.6048 9.60457 9.60457C10.6048 8.60438 11.1667 7.24782 11.1667 5.83333Z" stroke="#70707C" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search settings"
              className="inter-regular text-[14px]  bg-transparent outline-none w-full"
            />
          </div>
          <div className='flex flex-col w-[88px] h-full gap-[10px]'>
            {/* Account */}
            <div
              className={`flex flex-row items-center gap-[12px] cursor-pointer ${activeSidebar === 'Account' ? 'bg-[#6A37F5] rounded-[9px] w-[190px] h-[44px] px-[15px] py-[10px]' : 'w-[190px] h-[44px] px-[15px] py-[10px]'} `}
              onClick={() => setActiveSidebar('Account')}
            >
              <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.83333 3.16667C7.83333 3.87391 7.55238 4.55219 7.05229 5.05229C6.55219 5.55238 5.87391 5.83333 5.16667 5.83333C4.45942 5.83333 3.78115 5.55238 3.28105 5.05229C2.78095 4.55219 2.5 3.87391 2.5 3.16667C2.5 2.45942 2.78095 1.78115 3.28105 1.28105C3.78115 0.780951 4.45942 0.5 5.16667 0.5C5.87391 0.5 6.55219 0.780951 7.05229 1.28105C7.55238 1.78115 7.83333 2.45942 7.83333 3.16667Z" stroke={activeSidebar === 'Account' ? 'white' : '#70707C'}/>
                <path d="M6.5 7.83301H3.83333C2.94928 7.83301 2.10143 8.1842 1.47631 8.80932C0.851189 9.43444 0.5 10.2823 0.5 11.1663C0.5 11.52 0.640476 11.8591 0.890524 12.1092C1.14057 12.3592 1.47971 12.4997 1.83333 12.4997H8.5C8.85362 12.4997 9.19276 12.3592 9.44281 12.1092C9.69286 11.8591 9.83333 11.52 9.83333 11.1663C9.83333 10.2823 9.48214 9.43444 8.85702 8.80932C8.2319 8.1842 7.38406 7.83301 6.5 7.83301Z" stroke={activeSidebar === 'Account' ? 'white' : '#70707C'} strokeLinejoin="round"/>
              </svg>
              <span className={`inter-regular text-[14px] ${activeSidebar === 'Account' ? 'text-white' : 'text-[#70707C]'}`}>Account</span>
            </div>
            {/* General */}
            <div
              className={`flex flex-row items-center gap-[12px] cursor-pointer ${activeSidebar === 'General' ? 'bg-[#6A37F5] rounded-[9px] w-[190px] h-[44px] px-[15px] py-[10px]' : 'w-[190px] h-[44px] px-[15px] py-[10px]'} `}
              onClick={() => setActiveSidebar('General')}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0384 2.08907C9.64507 2.08907 9.44774 2.08907 9.2684 2.0224L9.1944 1.99174C9.0204 1.91174 8.88107 1.77307 8.6024 1.4944C7.96107 0.853069 7.6404 0.532402 7.2464 0.502402C7.19312 0.499199 7.13969 0.499199 7.0864 0.502402C6.6924 0.532402 6.37174 0.853069 5.7304 1.4944C5.45174 1.77307 5.3124 1.9124 5.1384 1.99174L5.06507 2.0224C4.88507 2.08907 4.6884 2.08907 4.2944 2.08907H4.22107C3.2164 2.08907 2.71374 2.08907 2.40107 2.40107C2.0884 2.71307 2.08907 3.2164 2.08907 4.22107V4.2944C2.08907 4.68774 2.08907 4.88507 2.0224 5.0644C2.01262 5.08974 2.0024 5.1144 1.99174 5.1384C1.91174 5.3124 1.77307 5.45174 1.4944 5.7304C0.853069 6.37174 0.532402 6.6924 0.502402 7.0864C0.499199 7.13969 0.499199 7.19312 0.502402 7.2464C0.532402 7.6404 0.853069 7.96107 1.4944 8.6024C1.77307 8.88107 1.9124 9.0204 1.99174 9.1944C2.00285 9.2184 2.01307 9.24285 2.0224 9.26774C2.08907 9.44774 2.08907 9.6444 2.08907 10.0384V10.1117C2.08907 11.1164 2.08907 11.6191 2.40107 11.9317C2.71307 12.2444 3.2164 12.2437 4.22107 12.2437H4.2944C4.68774 12.2437 4.88507 12.2437 5.0644 12.3104C5.08974 12.3197 5.1144 12.33 5.1384 12.3411C5.3124 12.4211 5.45174 12.5597 5.7304 12.8384C6.37174 13.4797 6.6924 13.8004 7.0864 13.8304C7.13974 13.8344 7.19307 13.8344 7.2464 13.8304C7.6404 13.8004 7.96107 13.4797 8.6024 12.8384C8.88107 12.5597 9.0204 12.4211 9.1944 12.3411C9.2184 12.33 9.24285 12.3197 9.26774 12.3104C9.44774 12.2437 9.6444 12.2437 10.0384 12.2437H10.1117C11.1164 12.2437 11.6191 12.2437 11.9317 11.9317C12.2444 11.6197 12.2437 11.1164 12.2437 10.1117V10.0384C12.2437 9.64507 12.2437 9.44774 12.3104 9.2684C12.3197 9.24307 12.33 9.2184 12.3411 9.1944C12.4211 9.0204 12.5597 8.88107 12.8384 8.6024C13.4797 7.96107 13.8004 7.6404 13.8304 7.2464C13.8344 7.19307 13.8344 7.13974 13.8304 7.0864C13.8004 6.6924 13.4797 6.37174 12.8384 5.7304C12.5597 5.45174 12.4211 5.3124 12.3411 5.1384L12.3104 5.06507C12.2437 4.88507 12.2437 4.6884 12.2437 4.2944V4.22107C12.2437 3.2164 12.2437 2.71374 11.9317 2.40107C11.6197 2.0884 11.1164 2.08907 10.1117 2.08907H10.0384Z" stroke={activeSidebar === 'General' ? 'white' : '#70707C'}/>
                <path d="M9.49967 7.16536C9.49967 7.47178 9.43932 7.7752 9.32206 8.05829C9.2048 8.34139 9.03293 8.59861 8.81626 8.81528C8.59959 9.03195 8.34236 9.20382 8.05927 9.32108C7.77618 9.43834 7.47276 9.4987 7.16634 9.4987C6.85992 9.4987 6.55651 9.43834 6.27341 9.32108C5.99032 9.20382 5.7331 9.03195 5.51643 8.81528C5.29976 8.59861 5.12788 8.34139 5.01062 8.05829C4.89336 7.7752 4.83301 7.47178 4.83301 7.16536C4.83301 6.54653 5.07884 5.95303 5.51643 5.51545C5.95401 5.07786 6.5475 4.83203 7.16634 4.83203C7.78518 4.83203 8.37867 5.07786 8.81626 5.51545C9.25384 5.95303 9.49967 6.54653 9.49967 7.16536Z" stroke={activeSidebar === 'General' ? 'white' : '#70707C'}/>
              </svg>
              <span className={`inter-regular text-[14px] ${activeSidebar === 'General' ? 'text-white' : 'text-[#70707C]'}`}>General</span>
            </div>
            {/* People */}
            <div
              className={`flex flex-row items-center gap-[12px] cursor-pointer ${activeSidebar === 'People' ? 'bg-[#6A37F5] rounded-[9px] w-[190px] h-[44px] px-[15px] py-[10px]' : 'w-[190px] h-[44px] px-[15px] py-[10px]'} `}
              onClick={() => setActiveSidebar('People')}
            >
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.83333 0.5C10.2918 0.499869 10.7364 0.65725 11.0926 0.94579C11.4489 1.23433 11.6952 1.63651 11.7904 2.08499C11.8855 2.53347 11.8237 3.00102 11.6152 3.40935C11.4068 3.81768 11.0644 4.142 10.6453 4.328M10.976 6.5C11.3512 6.5 11.7228 6.57391 12.0695 6.7175C12.4161 6.8611 12.7311 7.07157 12.9964 7.33689C13.2618 7.60222 13.4722 7.91721 13.6158 8.26388C13.7594 8.61055 13.8333 8.9821 13.8333 9.35733C13.8333 9.98867 13.322 10.5 12.6907 10.5M4.5 0.5C4.04154 0.499869 3.59696 0.65725 3.24069 0.94579C2.88442 1.23433 2.63809 1.63651 2.54296 2.08499C2.44783 2.53347 2.50966 3.00102 2.71811 3.40935C2.92656 3.81768 3.26897 4.142 3.688 4.328M1.64267 10.5C1.33961 10.5 1.04897 10.3796 0.834679 10.1653C0.620388 9.95103 0.5 9.66039 0.5 9.35733C0.5 8.9821 0.573907 8.61055 0.717501 8.26388C0.861096 7.91721 1.07157 7.60222 1.33689 7.33689C1.60222 7.07157 1.91721 6.8611 2.26388 6.7175C2.61055 6.57391 2.9821 6.5 3.35733 6.5M9.16667 3.16667C9.16667 3.6971 8.95595 4.20581 8.58088 4.58088C8.20581 4.95595 7.6971 5.16667 7.16667 5.16667C6.63623 5.16667 6.12753 4.95595 5.75245 4.58088C5.37738 4.20581 5.16667 3.6971 5.16667 3.16667C5.16667 2.63623 5.37738 2.12753 5.75245 1.75245C6.12753 1.37738 6.63623 1.16667 7.16667 1.16667C7.6971 1.16667 8.20581 1.37738 8.58088 1.75245C8.95595 2.12753 9.16667 2.63623 9.16667 3.16667ZM8.30933 7.16667H6.024C5.64877 7.16667 5.27721 7.24057 4.93055 7.38417C4.58388 7.52776 4.26889 7.73823 4.00356 8.00356C3.73823 8.26889 3.52776 8.58388 3.38417 8.93055C3.24057 9.27721 3.16667 9.64877 3.16667 10.024C3.16667 10.6553 3.678 11.1667 4.30933 11.1667H10.024C10.6553 11.1667 11.1667 10.6553 11.1667 10.024C11.1667 9.64877 11.0928 9.27721 10.9492 8.93055C10.8056 8.58388 10.5951 8.26889 10.3298 8.00356C10.0644 7.73823 9.74946 7.52776 9.40279 7.38417C9.05612 7.24057 8.68456 7.16667 8.30933 7.16667Z" stroke="#70707C" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={`inter-regular text-[14px] ${activeSidebar === 'People' ? 'text-white' : 'text-[#70707C]'}`}>People</span>
            </div>
            {/* Calendar */}
            <div
              className={`flex flex-row items-center gap-[12px] cursor-pointer ${activeSidebar === 'Calander' ? 'bg-[#6A37F5] rounded-[9px] w-[190px] h-[44px] px-[15px] py-[10px]' : 'w-[190px] h-[44px] px-[15px] py-[10px]'} `}
              onClick={() => setActiveSidebar('Calander')}
            >
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.16667 0.5V3.16667M3.83333 0.5V3.16667M0.5 5.83333H12.5M7.16667 1.83333H5.83333C3.31933 1.83333 2.062 1.83333 1.28133 2.61467C0.500667 3.396 0.5 4.65267 0.5 7.16667V8.5C0.5 11.014 0.5 12.2713 1.28133 13.052C2.06267 13.8327 3.31933 13.8333 5.83333 13.8333H7.16667C9.68067 13.8333 10.938 13.8333 11.7187 13.052C12.4993 12.2707 12.5 11.014 12.5 8.5V7.16667C12.5 4.65267 12.5 3.39533 11.7187 2.61467C10.9373 1.834 9.68067 1.83333 7.16667 1.83333Z" stroke={activeSidebar === 'Calander' ? 'white' : '#70707C'} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={`inter-regular text-[14px] ${activeSidebar === 'Calander' ? 'text-white' : 'text-[#70707C]'}`}>Calander</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {activeSidebar === 'Account' && (
          <div className='flex-grow flex flex-col h-full gap-[42px] px-[20px] py-[10px]'>
            <h1 className='inter-bold text-[18px]'>Account Settings</h1>
            <div className='flex flex-col w-full h-[296px] gap-[20px]'>
              <div className='w-full flex flex-col h-[60px] border-b-[1px] border-[#EAEAEA] gap-[5px]'>
                <h2 className='inter-medium text-[12px]'>Email Address</h2>
                <span className='inter-regular text-[12px] text-[#70707C]'>jessica.utt@example.com</span>
              </div>
              <div className='w-full flex flex-col h-[60px] border-b-[1px] border-[#EAEAEA] gap-[5px]'>
                <h2 className='inter-medium text-[12px]'>User Name</h2>
                <span className='inter-regular text-[12px] text-[#70707C]'>jessica.utt@example.com</span>
              </div>
              <div className='w-full flex flex-row items-center justify-between h-[60px] border-b-[1px] border-[#EAEAEA] gap-[5px]'>
                <div className='flex flex-col gap-[5px]'>
                  <h2 className='inter-medium text-[12px]'>Two-factor authentication</h2>
                  <span className='inter-regular text-[12px] text-[#70707C]'>Add an extra layer of security</span>
                </div>
                <button
                  className={`flex items-center w-[42px] h-[23px] rounded-[12px] px-[2px] transition-colors duration-200 ${
                    twoFactor ? 'bg-[#6A37F5]' : 'bg-[#EDECFF]'
                  }`}
                  onClick={() => setTwoFactor((prev) => !prev)}
                  aria-pressed={twoFactor}
                  type="button"
                >
                  <div
                    className={`w-[19px] h-[19px] rounded-full transition-all duration-200 ${
                      twoFactor ? 'bg-white' : 'bg-[#6A37F5]'
                    }`}
                    style={{
                      transform: twoFactor ? 'translateX(19px)' : 'translateX(0)',
                    }}
                  ></div>
                </button>
              </div>
              <div className='w-full flex flex-row items-center justify-between h-[60px] border-b-[1px] border-[#EAEAEA] gap-[5px]'>
                <div className='flex flex-col gap-[5px]'>
                  <h2 className='inter-medium text-[12px]'>Email notification</h2>
                  <span className='inter-regular text-[12px] text-[#70707C]'>Receive email updates about your account</span>
                </div>
                <button
                  className={`flex items-center w-[42px] h-[23px] rounded-[12px] px-[2px] transition-colors duration-200 ${
                    emailNotif ? 'bg-[#6A37F5]' : 'bg-[#EDECFF]'
                  }`}
                  onClick={() => setEmailNotif((prev) => !prev)}
                  aria-pressed={emailNotif}
                  type="button"
                >
                  <div
                    className={`w-[19px] h-[19px] rounded-full transition-all duration-200 ${
                      emailNotif ? 'bg-white' : 'bg-[#6A37F5]'
                    }`}
                    style={{
                      transform: emailNotif ? 'translateX(19px)' : 'translateX(0)',
                    }}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        )}
        {activeSidebar === 'General' && (
          <SettingsGeneral />
        )}
        {activeSidebar === 'People' && (
          <SettingsPeople />
        )}
        {activeSidebar === 'Calander' && (
          <SettingsCalander />
        )}
        {/* ...other sidebar content... */}
      </div>
    </div>
  );
}

export default Settings;