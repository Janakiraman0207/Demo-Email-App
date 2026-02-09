import React, { useState } from "react";
import { Navbar } from "../Home/Navbar";
import { AppNavBar } from "../Home/AppNavBar";
import { RightSidebar } from "../Home/RightSidebar";
import { LeftSidebar } from "./DriveLeftSidebar";
import driveimg from "../../../assets/images/driveimg.png";
import driveimg1 from "../../../assets/images/driveimg1.png";
import driveimg2 from "../../../assets/images/driveimg2.png";
import driveimg3 from "../../../assets/images/driveimg3.png";
import { UploadFileModal } from "./Modals/UploadFileModal";
import { DriveFileIcon, DriveUploadDropdownIcon } from "../../../assets/icons/Icons1";

export const DrivePage = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      {/* Vertical line left side of content */}
      <div
        className="absolute bg-[#D9D9D9] opacity-100"
        style={{
          width: "1px",
          height: "700px",
          top: "132px",
          left: "195px",
          transform: "rotate(0deg)"
        }}
      />
      <Navbar />
      <AppNavBar />
      <div className="flex">
        <LeftSidebar />
        {/* Add margin-left to move content right of the vertical line */}
        <div className="flex-1 flex flex-col gap-[10px] p-5 w-full" style={{ marginLeft: "40px" }}>
          <div className="flex flex-col gap-[15px] mb-[24px] w-full">
            <span className="inter-bold text-[14px] tracking-[0.07em] text-black">For you</span>
            <div className="flex flex-row w-full h-[184px] gap-[16px]">
              {/* Card 1 */}
              <div className="flex flex-col px-[4px] py-[4px] w-[237px] h-[184px] border-[1px] border-[#E6E6E6] rounded-[14px]">
                <img src={driveimg} alt="" className="w-[229px] h-[111px] rounded-[10px]" />
                <div className="flex flex-col w-full h-[40px] px-[10px] gap-[10px]">
                  <span className="inter-semibold text-[12px] tracking-[0.07em]">Project Status - Email</span>
                  <div className="flex flex-row items-center w-[124px] h-[19px] gap-[5px]">
                    <div className="w-[19px] h-[19px] rounded-[50%] bg-[#D9D9D9]"></div>
                    <span className="inter-medium text-[10px] tracking-[0.07em]">You</span>
                    <div className="w-[3px] h-[3px] rounded-[50%] bg-[#949494]"></div>
                    <span className="inter-medium text-[10px] text-[#949494]">3 hours ago</span>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="flex flex-col px-[4px] py-[4px] w-[237px] h-[184px] border-[1px] border-[#E6E6E6] rounded-[14px]">
                <img src={driveimg1} alt="" className="w-[229px] h-[111px] rounded-[10px]" />
                <div className="flex flex-col w-full h-[40px] px-[10px] gap-[10px]">
                  <span className="inter-semibold text-[12px] tracking-[0.07em]">Marketing Report - Email</span>
                  <div className="flex flex-row items-center w-[124px] h-[19px] gap-[5px]">
                    <div className="w-[19px] h-[19px] rounded-[50%] bg-[#D9D9D9]"></div>
                    <span className="inter-medium text-[10px] tracking-[0.07em]">You</span>
                    <div className="w-[3px] h-[3px] rounded-[50%] bg-[#949494]"></div>
                    <span className="inter-medium text-[10px] text-[#949494]">3 hours ago</span>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="flex flex-col px-[4px] py-[4px] w-[237px] h-[184px] border-[1px] border-[#E6E6E6] rounded-[14px]">
                <img src={driveimg2} alt="" className="w-[229px] h-[111px] rounded-[10px]" />
                <div className="flex flex-col w-full h-[40px] px-[10px] gap-[10px]">
                  <span className="inter-semibold text-[12px] tracking-[0.07em]">Team Update - Email</span>
                  <div className="flex flex-row items-center w-[124px] h-[19px] gap-[5px]">
                    <div className="w-[19px] h-[19px] rounded-[50%] bg-[#D9D9D9]"></div>
                    <span className="inter-medium text-[10px] tracking-[0.07em]">You</span>
                    <div className="w-[3px] h-[3px] rounded-[50%] bg-[#949494]"></div>
                    <span className="inter-medium text-[10px] text-[#949494]">3 hours ago</span>
                  </div>
                </div>
              </div>
              {/* Card 4 */}
              <div className="flex flex-col px-[4px] py-[4px] w-[237px] h-[184px] border-[1px] border-[#E6E6E6] rounded-[14px]">
                <img src={driveimg3} alt="" className="w-[229px] h-[111px] rounded-[10px]" />
                <div className="flex flex-col w-full h-[40px] px-[10px] gap-[10px]">
                  <span className="inter-semibold text-[12px] tracking-[0.07em]">Client Feedback - Email</span>
                  <div className="flex flex-row items-center w-[124px] h-[19px] gap-[5px]">
                    <div className="w-[19px] h-[19px] rounded-[50%] bg-[#D9D9D9]"></div>
                    <span className="inter-medium text-[10px] tracking-[0.07em]">You</span>
                    <div className="w-[3px] h-[3px] rounded-[50%] bg-[#949494]"></div>
                    <span className="inter-medium text-[10px] text-[#949494]">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Table contents */}
          <div className="flex flex-col gap-[20px] w-full">
            <div className="flex flex-row w-full h-[13px] gap-[33px]">
              <span className="inter-bold text-[11px] ">Recent</span>
              <span className="inter-regular text-[11px]">Owned by me</span>
              <span className="inter-regular text-[11px]">Shared with me</span>
            </div>
            <div className="flex w-full h-[2px] opacity-100 mt-[10px]">
              <div className="w-[38px] h-[2px] bg-[#040B23]" />
              <div className="flex-1 h-[2px] bg-[#D9D9D9]" />
            </div>
            <div className="flex flex-col w-full h-[356px] rounded-[8px] border-[1px] border-[#EAEAEA] bg-white">
              <div className="w-full h-[36px] bg-[#F1F2F3] rounded-tl-[8px] rounded-tr-[8px] flex items-center px-6">
                <div className="flex-[2] inter-bold text-[10px] text-[#040B23]">Title</div>
                <div className="flex-1 inter-bold text-[10px] text-[#040B23]">Created by</div>
                <div className="flex-1 inter-bold text-[10px] text-[#040B23]">Action</div>
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="flex items-center px-6 border-b border-[#EAEAEA] h-[66px]">
                  <div className="flex-[2] flex flex-row items-center gap-[10px]">
                    <div className="flex items-center justify-center w-[31px] h-[31px] rounded-[7px] bg-[#EEE8FF]">
                      <DriveFileIcon />
                    </div>
                    <div className="flex flex-col gap-[0px] w-full h-full">
                      <span className="inter-regular text-[12px] tracking-[0.07em]">Daily Task Sheet- Email</span>
                      <span className="inter-regular text-[10px] text-[#717171] tracking-[0.07em]">44 MB</span>
                    </div>
                  </div>
                  <div className="flex-1 inter-regular text-[12px] text-[#222]">Raja’s file</div>
                  <div className="flex-1 flex flex-row items-center">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center">
                        <span className="inter-regular text-[12px] tracking-[0.07em]">Rahul</span>
                        <span className="ml-1 inter-regular text-[12px] tracking-[0.07em] text-[#9A9A9B]">+ Many</span>
                      </div>
                      <div className="flex flex-row items-center mt-1">
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#6A37F5]">Edited this</span>
                        <div className="ml-2 w-[2px] h-[2px] bg-[#C0C0C0] opacity-100 rounded-full" />
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#C0C0C0] ml-[7px]">7h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center px-6 border-b border-[#EAEAEA] h-[66px]">
                  <div className="flex-[2] flex flex-row items-center gap-[10px]">
                    <div className="flex items-center justify-center w-[31px] h-[31px] rounded-[7px] bg-[#EEE8FF]">
                      <DriveFileIcon />
                    </div>
                    <div className="flex flex-col gap-[0px] w-full h-full">
                      <span className="inter-regular text-[12px] tracking-[0.07em]">Weekly Report - Sales</span>
                      <span className="inter-regular text-[10px] text-[#717171] tracking-[0.07em]">120 MB</span>
                    </div>
                  </div>
                  <div className="flex-1 inter-regular text-[12px] text-[#222]">Marketing Team</div>
                  <div className="flex-1 flex flex-row items-center">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center">
                        <span className="inter-regular text-[12px] text-[#9A9A9B] tracking-[0.07em]">Sofia + Team Alpha</span>
                      </div>
                      <div className="flex flex-row items-center mt-1">
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#6A37F5]">Edited this</span>
                        <div className="ml-2 w-[2px] h-[2px] bg-[#C0C0C0] opacity-100 rounded-full" />
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#C0C0C0] ml-[7px]">2h ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center px-6 border-b border-[#EAEAEA] h-[66px]">
                  <div className="flex-[2] flex flex-row items-center gap-[10px]">
                    <div className="flex items-center justify-center w-[31px] h-[31px] rounded-[7px] bg-[#EEE8FF]">
                      <DriveFileIcon />
                    </div>
                    <div className="flex flex-col gap-[0px] w-full h-full">
                      <span className="inter-regular text-[12px] tracking-[0.07em]">Project Plan - Q4</span>
                      <span className="inter-regular text-[10px] text-[#717171] tracking-[0.07em]">65 MB</span>
                    </div>
                  </div>
                  <div className="flex-1 inter-regular text-[12px] text-[#222]">John’s draft</div>
                  <div className="flex-1 flex flex-row items-center">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center">
                        <span className="inter-regular text-[12px] text-[#9A9A9B] tracking-[0.07em]">Emily + Team Beta</span>
                      </div>
                      <div className="flex flex-row items-center mt-1">
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#6A37F5]">Edited this</span>
                        <div className="ml-2 w-[2px] h-[2px] bg-[#C0C0C0] opacity-100 rounded-full" />
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#C0C0C0] ml-[7px]">1d ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center px-6 border-b border-[#EAEAEA] h-[66px]">
                  <div className="flex-[2] flex flex-row items-center gap-[10px]">
                    <div className="flex items-center justify-center w-[31px] h-[31px] rounded-[7px] bg-[#EEE8FF]">
                      <DriveFileIcon />
                    </div>
                    <div className="flex flex-col gap-[0px] w-full h-full">
                      <span className="inter-regular text-[12px] tracking-[0.07em]">Budget Overview - 2023</span>
                      <span className="inter-regular text-[10px] text-[#717171] tracking-[0.07em]">80 MB</span>
                    </div>
                  </div>
                  <div className="flex-1 inter-regular text-[12px] text-[#222]">Finance Department</div>
                  <div className="flex-1 flex flex-row items-center">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center">
                        <span className="inter-regular text-[12px] text-[#9A9A9B] tracking-[0.07em]">Amit + Team Omega</span>
                      </div>
                      <div className="flex flex-row items-center mt-1">
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#6A37F5]">Edited this</span>
                        <div className="ml-2 w-[2px] h-[2px] bg-[#C0C0C0] opacity-100 rounded-full" />
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#C0C0C0] ml-[7px]">2d ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center px-6 border-b border-[#EAEAEA] h-[66px]">
                  <div className="flex-[2] flex flex-row items-center gap-[10px]">
                    <div className="flex items-center justify-center w-[31px] h-[31px] rounded-[7px] bg-[#EEE8FF]">
                      <DriveFileIcon />
                    </div>
                    <div className="flex flex-col gap-[0px] w-full h-full">
                      <span className="inter-regular text-[12px] tracking-[0.07em]">Client Proposal - ABC Corp</span>
                      <span className="inter-regular text-[10px] text-[#717171] tracking-[0.07em]">30 MB</span>
                    </div>
                  </div>
                  <div className="flex-1 inter-regular text-[12px] text-[#222]">Rachel’s document</div>
                  <div className="flex-1 flex flex-row items-center">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center">
                        <span className="inter-regular text-[12px] text-[#9A9A9B] tracking-[0.07em]">Tom + Team Delta</span>
                      </div>
                      <div className="flex flex-row items-center mt-1">
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#6A37F5]">Edited this</span>
                        <div className="ml-2 w-[2px] h-[2px] bg-[#C0C0C0] opacity-100 rounded-full" />
                        <span className="inter-regular text-[9px] tracking-[0.07em] text-[#C0C0C0] ml-[7px]">4d ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
      <button
        className="absolute flex flex-row items-center gap-[10px] justify-center"
        style={{
          width: "132px",
          height: "36px",
          top: "777px",
          left: "700px",
          borderRadius: "18px",
          background: "#040B23",
          boxShadow: "0px 4px 4px 0px #49494959",
          opacity: 1,
          zIndex: 50
        }}
        onClick={() => setShowUploadModal(true)}
      >
        <span
          className="text-white inter-regular text-[11px]"
          style={{ borderRadius: "18px", background: "transparent" }}
        >
          Upload file
        </span>
        <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[50%] mr-[-30px] bg-[#FFFFFF1F]">
          <DriveUploadDropdownIcon />
        </div>
      </button>
      <UploadFileModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </div>
  );
};