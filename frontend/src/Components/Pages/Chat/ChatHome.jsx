import React, { useState } from "react";
import { Navbar } from "../Home/Navbar";
import { AppNavBar } from "../Home/AppNavBar";
import { RightSidebar } from "../Home/RightSidebar";
import { useSmoothNavigation } from "../../../hooks/useSmoothNavigation";
import image1 from '../../../assets/images/image1.png';
import image2 from '../../../assets/images/image2.png';
import image3 from '../../../assets/images/image3.png';
import profileimg from '../../../assets/images/profileimg.png';
import profileimg1 from '../../../assets/images/profileimg1.png';
import profileimg2 from '../../../assets/images/profileimg2.png';
import chatimg from '../../../assets/images/chatimg.png';
import chatimg1 from '../../../assets/images/chatimg1.png';
import chatimg2 from '../../../assets/images/chatimg2.png';
import chatimg3 from '../../../assets/images/chatimg3.png';
import chatimg4 from '../../../assets/images/chatimg4.png';
import {
  ChatThreeDotIcon,
  ChatInboxIcon,
  ChatEditIcon,
  ChatSearchIcon,
  ChatShortcutsArrowIcon,
  ChatStarIcon,
  ChatAllMessagesArrowIcon,
  ChatAddReactionIcon,
  ChatAttachIcon,
  ChatSendIcon,
  ChatProfileDropdownIcon,
  ChatProfileSearchIcon,
  ChatRecentFileIcon
} from '../../../assets/icons/Icons1';

const ChatHome = () => {
  const { visible, smoothNavigate } = useSmoothNavigation(1000);

  // State for input and messages
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    // Example initial message
    { text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry", fromMe: true }
  ]);

  // --- Chats sidebar state ---
  const [chatSearch, setChatSearch] = useState("");
  const chatList = [
    { name: "Ricky Smith", img: image1, time: "1 min ago", bold: true, unread: 3 },
    { name: "Michael", img: image2, time: "5 min ago", bold: false },
    { name: "Sophia", img: image3, time: "10 min ago", bold: false },
    { name: "James", img: profileimg, time: "15 min ago", bold: true, unread: 2 }, // Added unread badge
    { name: "Olivia", img: profileimg1, time: "20 min ago", bold: false },
    { name: "Liam", img: profileimg2, time: "25 min ago", bold: true, highlight: true, unread: 5 }, // Added unread badge
    { name: "Emma", img: profileimg, time: "25 min ago", bold: false },
    { name: "Noah", img: image1, time: "35 min ago", bold: false },
    { name: "Emma", img: image2, time: "30 min ago", bold: false },
    { name: "Noah", img: image3, time: "35 min ago", bold: false }
  ];
  const filteredChats = chatList.filter(chat =>
    chat.name.toLowerCase().includes(chatSearch.toLowerCase())
  );

  // --- Details section state ---
  const [activeTab, setActiveTab] = useState("files"); // "files" or "settings"
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Handle input change
  const handleInputChange = (e) => setInput(e.target.value);

  // Handle send (Enter key or send button)
  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, fromMe: true }]);
    setInput("");
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // --- Details section handlers ---
  const handleTabClick = (tab) => setActiveTab(tab);
  const handleViewAllPhotos = () => setShowAllPhotos(true);

  // Example files and photos
  const files = [
    { name: "images.png", icon: "image" },
    { name: "images.png", icon: "image" },
    { name: "Files.pdf", icon: "pdf" }
  ];
  const photos = [chatimg, chatimg1, chatimg2, chatimg3, chatimg4];

  return (
    <>
      <div
        className={`w-full min-h-screen flex flex-col transition-all duration-1000 ease-in-out
        ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <Navbar />
        <AppNavBar />
        
        {/* Chat Content Area */}
        <div className="flex flex-1 overflow-hidden w-full">
           {/* Sidebar */}
           <div className="w-[261px] h-[700px] p-[10px]">
            <div className="flex flex-col w-[229px] h-[660px] gap-[24px]">

              {/* Chats */}
              <div className="flex flex-col w-full h-[180px] gap-[24px]">
                 <div className="flex flex-col w-full h-[77px] gap-[23px]">

                    <div className="flex flex-row justify-between items-center w-full h-[20px]">
                      <span className="inter-bold text-[16px] text-[#040B23] tracking-[0.07em]">Chats</span>
                      <div className="flex flex-row items-center w-[100px] justify-center h-[20px] gap-[20px]">
                         <ChatThreeDotIcon />
                         <ChatInboxIcon />
                         <ChatEditIcon />
                      </div>
                    </div>

                    <div className="relative w-[229px] h-[34px]">
                       <ChatSearchIcon 
                         className="absolute left-[10px] top-[50%] translate-y-[-50%]"
                       />
                       <input
                         type="text"
                         placeholder="Search chat"
                         className="w-full h-full pl-[33px] pr-[10px] py-[9px] bg-[#F6F6F6] border border-[#EAEAEA] rounded-[6px] opacity-100 outline-none text-[12px] inter-regular"
                         value={chatSearch}
                         onChange={e => setChatSearch(e.target.value)}
                       />
                     </div>
                 </div>
                 <div className="flex flex-col w-full h-[79px] gap-[16px]">
                   <div className="flex flex-row items-center justify-between w-full h-[16px]">
                      <span className="inter-bold text-[12px] tracking-[0.07em]">Shortcuts</span>
                      <ChatShortcutsArrowIcon />
                   </div>

                   <div className="flex flex-row items-center justify-between w-[87.23px] h-[15px]">
                     <span className="text-[#5A5A5A]">@</span>
                      <span className="inter-regular text-[12px] tracking-[0.07em] text-[#5A5A5A]">Mentions</span>
                   </div>

                   <div className="flex flex-row items-center justify-between w-[75px] h-[16px]">
                     <ChatStarIcon />
                      <span className="inter-regular text-[12px] tracking-[0.07em] text-[#5A5A5A]">Starred</span>
                   </div>
                 </div>
                  <div className="w-full h-[79px] gap-[16px]"></div>
              </div>

              {/* All messages */}
              <div className="flex flex-col w-full h-[490px] gap-[22px]">
                <div className="flex flex-row items-center justify-between w-full h-[16px]">
                   <span className="inter-bold text-[12px] tracking-[0.07em]">All Messages</span>
                   <ChatAllMessagesArrowIcon />
                </div>

                <div className="flex flex-col w-[229px] h-[452px] overflow-y-auto">
                  {filteredChats.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-full text-[#B6B6B6] text-[12px]">
                      No chats found.
                    </div>
                  ) : (
                    filteredChats.map((chat, idx) => (
                      <div key={idx} className={`w-full h-[50px] ${idx === 0 ? "bg-[#F6F3FF]" : ""} px-[10px] py-[10px]`}>
                        <div className="flex flex-row items-center justify-between w-[201px] h-[30px]">
                          <div className="flex flex-row w-[115px] h-[30px] gap-[5px]">
                            <img src={chat.img} alt="Image" className="w-[30px] h-[30px] rounded-[50%]" />
                            <div className="flex flex-col justify-between w-full h-[30px]">
                              <span className={`inter-bold text-[12px] tracking-[0.07em]${chat.bold ? "" : " inter-regular"}`}>{chat.name}</span>
                              <span className={`inter-regular text-[8px] tracking-[0.07em] ${chat.highlight ? "text-[#6A37F5]" : "text-[#B6B6B6]"}`}>{chat.time}</span>
                            </div>
                          </div>
                          {/* Unread badge for Ricky Smith */}
                          {chat.unread && (
                            <div
                              className="flex items-center justify-center"
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                background: "#6A37F5",
                                opacity: 1,
                              }}
                            >
                              <span className="inter-regular text-[10px] tracking-[0.07em] text-white">{chat.unread}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
           </div>

          {/* Chat Main Area */}
          <div className="flex flex-row flex-1 h-full overflow-hidden">
            <div className="flex flex-col flex-1">
              <div className="flex flex-row items-center justify-between w-full h-[64px] bg-[#040B23] px-[25px]">
                <div className="flex flex-row w-[118px] h-[30px] gap-[10px]">
                  <img src={image1} alt="" className="w-[30px] h-[30px] rounded-[50%] border-[1px] border-[#9D9D9D]" />
                  <div className="flex flex-col justify-between w-[200px] h-[30px]">
                    <span className="inter-bold text-[12px] tracking-[0.07em] text-[white] whitespace-nowrap">Ricky Smith</span>
                    <span className="inter-regular text-[8px] text-[#03C582]">Online</span>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between w-[80px] h-[20px] ">
                  <div className="flex flex-row justify-between items-center w-[40px] h-[20px]">
                    <ChatProfileSearchIcon />
                    <ChatProfileDropdownIcon />
                  </div>
                  <ChatProfileSearchIcon />
                </div>
              </div>

              {/* Chat area */}
              <div className="flex-1 w-full px-[20px] pt-[40px]">
                <div className="flex flex-col w-[full] h-[610px] gap-[33px] ">
                  <div className="flex flex-col  w-[full] h-[510px] border-b-[1px] border-[#EDEDED] pb-[20px] gap-[40px] overflow-y-auto">

                    <div className="flex  justify-center w-[full] h-[60px]">
                     <div className="flex items-center justify-center w-[69px] h-[22px] rounded-[11px] bg-[#040B2314] inter-regular text-[10px] tracking-[0.07em]">Yesterday</div>
                     </div>
                      <div className="flex flex-col w-[338px] h-[224px] gap-[20px]">
                         <div className="flex flex-row w-[full] h-[85px] gap-[12px]">
                           <div className="w-[34px] h-[34px] rounded-[50%] bg-[#D9D9D9]"></div> 
                           <div className="flex flex-col w-[292px] h-[85px] gap-[14px]">
                            <div className="flex flex-row items-center gap-[8px]">
                              <span className="inter-bold text-[11px]">Ricky Smith</span>
                              <span className="inter-regular text-[9px] text-[#898989]">11:00 am</span>
                            </div>
                            <div className="flex items-center justify-center w-[292px] h-[58px]">
                              <span className="inter-regular text-[12px] tracking-[0.07em]">Lorem Ipsum is simply dummy text of the printing and typesetting industry </span>
                            </div>
                           </div>
                         </div>
                         <div className="flex flex-row w-[full] h-[119px] gap-[12px]">
                            <div className="w-[34px] h-[34px] rounded-[50%] bg-[#D9D9D9]"></div>
                            <div className="flex flex-col w-[292px] h-[119px] gap-[13px]">
                              <div className="flex flex-row items-center gap-[8px]">
                              <span className="inter-bold text-[11px]">Ricky Smith</span>
                              <span className="inter-regular text-[9px] text-[#898989]">12:00 am</span>
                            </div>
                            <div className="flex items-center justify-center w-[full] h-[58px]">
                              <span className="inter-regular text-[12px] tracking-[0.07em]">Lorem Ipsum is simply dummy text of the printing and typesetting industry </span>
                            </div>
                            <div className="flex flex-row w-[110px] h-[22px] gap-[6px]">
                              <div className="flex flex-row items-center justify-center w-[38px] h-[22px] rounded-[11px] border-[1px] border-[#EDEDED] bg-[#D1D1D12B]">
                                <span className="text-[12px]">👍</span>
                                <span className="inter-regular text-[12px]">2</span>
                              </div>
                              <div className="flex flex-row items-center justify-center w-[38px] h-[22px] rounded-[11px] border-[1px] border-[#EDEDED] bg-[#D1D1D12B]">
                                <span className="text-[12px]">😀</span>
                                <span className="inter-regular text-[12px]">2</span>
                              </div>
                              <div className="flex items-center justify-center w-[22px] h-[22px] border-[1px] border-[#EDEDED] bg-[#D1D1D12B] rounded-[11px]">
                                <ChatAddReactionIcon />
                              </div>
                            </div>
                            </div>
                         </div>
                      </div>
                      <div className="flex flex-col w-[338px] h-[236px] ml-[555px] gap-[66px]">
                        <div className="flex flex-row w-[full]  h-[85px] gap-[12px]">
                          <div className="flex items-center justify-end w-[292px] h-[58px] rounded-[8px] mt-[27px] px-[10px] bg-[#009FFF]">
                            <span className="inter-regular text-[12px] tracking-[0.07em] text-[#FFFFFF] text-right w-full">
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </span>
                          </div>
                          <div className="w-[34px] h-[34px] bg-[#D9D9D9] rounded-[50%]"></div>

                        </div>

                        <div className="flex flex-row w-[full] h-[85px] gap-[12px]">
                          <div className="flex items-center justify-end w-[292px] h-[58px] rounded-[8px] mt-[27px] px-[10px] bg-[#009FFF]">
                            <span className="inter-regular text-[12px] tracking-[0.07em] text-[#FFFFFF] text-right w-full">
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </span>
                          </div>
                          <div className="w-[34px] h-[34px] bg-[#D9D9D9] rounded-[50%]"></div>

                        </div>
                      </div>
                  </div>
                  <div className="w-[full] h-[52px] rounded-[6px] p-[14px] gap-[10px] bg-[#F4F4F4]">
                    <div className="flex flex-row items-center justify-between w-full h-[24px]">
                      <div className="flex flex-row items-center justify-center flex-1 h-[24px] gap-[10px]">
                        <ChatAttachIcon />
                        <input
                          className="flex-1 bg-transparent outline-none text-[10px] tracking-[0.07em] px-2 inter-normal"
                          type="text"
                          placeholder="Type your message..."
                          value={input}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      <button onClick={handleSend} className="focus:outline-none">
                        <ChatSendIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Details section */}
             <div className="w-[282px] h-[700px] pt-[40px] pr-[31px] pb-[24px] pl-[31px] gap-[10px]">
               <div className="flex flex-col items-center justify-center w-[220px] h-[605px] gap-[30px]">
                  <div className="flex flex-col w-full h-[551px] gap-[20px]">
                      <div className="flex flex-col items-center justify-center w-full h-[217px] gap-[10px]">
                        <div className="flex items-center justify-center w-[100px] h-[100px]">
                          <img src={image1} alt="" className="w-[80px] h-[80px] rounded-[50%]" />
                        </div>
                        <div className="flex flex-col items-center justify-center w-[146px] h-[37px] gap-[9px]">
                          <span className="inter-bold text-[12px] ">Ricky Smith</span>
                          <span className="inter-regular text-[11px] text-[#909090]">Rickysmith@thestackly.com</span>
                        </div>
                        <div className="flex flex-row items-center w-[165px] h-[40px] px-[3px] rounded-[20px] mt-[20px] border-[1px] border-[#D6D6D6]">
                          <div
                            className={`flex items-center justify-center w-[79.5px] h-[34px] rounded-[20px] cursor-pointer ${activeTab === "files" ? "bg-[#040B23] text-white" : ""}`}
                            onClick={() => handleTabClick("files")}
                          >
                            <span className="inter-medium text-[11px]">Files</span>
                          </div>
                          <span
                            className={`inter-regular ml-[20px] text-[11px] cursor-pointer rounded-[20px] px-3 py-1 transition-colors duration-150 ${
                              activeTab === "settings" ? "bg-[#040B23] w-[79.5px] h-[34px] text-white font-bold " : ""
                            }`}
                            onClick={() => handleTabClick("settings")}
                            tabIndex={0}
                          >
                            Settings
                          </span>
                        </div>
                      </div>
                      {/* Tab content */}
                      {activeTab === "files" ? (
                        <div className="flex flex-col w-full h-[111px] gap-[16px]">
                          <span className="inter-bold text-[12px] tracking-[0.02em]">Recent files</span>
                          {files.map((file, idx) => (
                            <div key={idx} className="flex flex-row items-center w-[103px] h-[16px] px-[2px] gap-[10px]">
                              <ChatRecentFileIcon />
                              <span className="inter-regular text-[12px] tracking-[0.07em] text-[#5A5A5A]">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col w-full h-[111px] gap-[16px]">
                          <span className="inter-bold text-[12px] tracking-[0.02em]">Settings</span>
                          <span className="inter-regular text-[12px] text-[#5A5A5A]">Settings content goes here.</span>
                        </div>
                      )}
                      {/* Photos */}
                      <div className="w-[220px] h-[165px] mt-[20px]">
                        <span className="inter-bold text-[12px]  tracking-[0.02em]">Photos</span>
                        <div className="w-[220px] h-[165px] mt-[1px] grid grid-rows-3 grid-cols-3 gap-y-[7px] gap-x-[8px]">
                          {(showAllPhotos ? photos : photos.slice(0, 5)).map((img, idx) => (
                            <img key={idx} src={img} alt="" className="w-full h-full rounded-[9px]" />
                          ))}
                        </div>
                      </div>
                  </div>
                  {!showAllPhotos && (
                    <button
                      className="w-[60px] h-[24px] bg-[#040B230F] rounded-[20px] mt-[30px] border-[1px] border-[#E2E2E2] inter-medium text-[11px] text-[#040B23]"
                      onClick={handleViewAllPhotos}
                    >
                      View all
                    </button>
                  )}
               </div>
          </div>
          </div>

          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default ChatHome;