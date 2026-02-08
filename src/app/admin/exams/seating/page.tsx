'use client';

import React from 'react';

export default function InvigilationSeatingPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f6f8f6] dark:bg-[#102216]">
      {/* Top Header */}
      <header className="bg-white dark:bg-[#1a2a20] border-b border-[#e5e7eb] dark:border-[#2a3f32] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-green-800 dark:text-green-300 border border-primary/30">In Progress</span>
            <h2 className="text-2xl font-black tracking-tight text-[#111813] dark:text-white">Biology Grade 10 - Final</h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#61896f] dark:text-[#8ab89b]">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">location_on</span> Hall B</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">calendar_today</span> Jun 15, 2023</span>
            <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">schedule</span> 09:00 AM - 11:00 AM</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-bold text-sm transition-colors border border-red-200 dark:border-red-800/50">
          <span className="material-symbols-outlined text-[20px]">stop_circle</span>
          End Session
        </button>
      </header>

      {/* Progress Bar Strip */}
      <div className="bg-white dark:bg-[#1a2a20] px-6 py-4 border-b border-[#e5e7eb] dark:border-[#2a3f32] shrink-0">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-[#111813] dark:text-white">Exam Progress</span>
            <span className="text-sm font-mono text-[#61896f] dark:text-[#8ab89b]">1h 15m elapsed / <span className="text-[#111813] dark:text-white font-bold">45m remaining</span></span>
          </div>
          <div className="h-2.5 w-full bg-[#f0f4f2] dark:bg-[#25382b] rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: "65%" }}></div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Seating Chart */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f6f8f6] dark:bg-[#102216]">
          <div className="max-w-5xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-[#1a2a20] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3f32] shadow-sm">
                <p className="text-xs text-[#61896f] dark:text-[#8ab89b] uppercase font-bold tracking-wider mb-1">Total Candidates</p>
                <p className="text-2xl font-black text-[#111813] dark:text-white">42</p>
              </div>
              <div className="bg-white dark:bg-[#1a2a20] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3f32] shadow-sm">
                <p className="text-xs text-[#61896f] dark:text-[#8ab89b] uppercase font-bold tracking-wider mb-1">Present</p>
                <p className="text-2xl font-black text-primary">40</p>
              </div>
              <div className="bg-white dark:bg-[#1a2a20] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3f32] shadow-sm">
                <p className="text-xs text-[#61896f] dark:text-[#8ab89b] uppercase font-bold tracking-wider mb-1">Absent/Late</p>
                <p className="text-2xl font-black text-orange-500">2</p>
              </div>
              <div className="bg-white dark:bg-[#1a2a20] p-4 rounded-xl border border-[#e5e7eb] dark:border-[#2a3f32] shadow-sm">
                <p className="text-xs text-[#61896f] dark:text-[#8ab89b] uppercase font-bold tracking-wider mb-1">Incidents</p>
                <p className="text-2xl font-black text-[#111813] dark:text-white">0</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#111813] dark:text-white">Seating Chart (Hall B)</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded bg-white dark:bg-[#1a2a20] border border-gray-200 dark:border-gray-700 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div> Present
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded bg-white dark:bg-[#1a2a20] border border-gray-200 dark:border-gray-700 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div> Absent
                </span>
              </div>
            </div>

            {/* Room Representation */}
            <div className="bg-white dark:bg-[#1a2a20] rounded-2xl shadow-sm border border-[#e5e7eb] dark:border-[#2a3f32] p-8 relative">
              {/* Front of Room Indicator */}
              <div className="w-1/2 h-2 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-10 relative flex justify-center">
                <span className="absolute -bottom-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Front of Room (Whiteboard)</span>
              </div>
              {/* Desk Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Student Card 1 */}
                <div className="group relative flex flex-col items-center bg-[#f9fafb] dark:bg-[#203328] rounded-xl p-4 border-2 border-green-500/20 hover:border-primary transition-all cursor-pointer">
                  <span className="absolute top-2 right-2 text-xs font-mono font-bold text-gray-400 group-hover:text-primary">A1</span>
                  <div className="relative mb-3">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#1a2a20] shadow-md" data-alt="Portrait of student Alice M." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiEVtn8DbuVQXY4bkyAPOZMvyqhJ_u_16S76LoMSKZh94NYLs76MIhn03QZwNUCU43ItlHcd7zbIsLLQvHRuB3eitptNzFdDEtWmq4l_WEGG34o-s8jo2gDAkrH7dVWDZrt2HChGFmnDyWgAnSmOKcqeUElD-buWspiJsMZNFsXXGt-XMkkMTWeDxBsP0g_UkrJ94LhYgK2JZnSNEvPfvfnVmF69cvBLmXBwlh5oLis2wWg2p94CS0AC9V6bOcCfTfLLOeL1VlRrM"/>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-[#1a2a20]"></div>
                  </div>
                  <h4 className="font-bold text-sm text-[#111813] dark:text-white mb-0.5">Alice M.</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: 88231</p>
                </div>
                {/* Student Card 2 */}
                <div className="group relative flex flex-col items-center bg-[#f9fafb] dark:bg-[#203328] rounded-xl p-4 border-2 border-green-500/20 hover:border-primary transition-all cursor-pointer">
                  <span className="absolute top-2 right-2 text-xs font-mono font-bold text-gray-400 group-hover:text-primary">A2</span>
                  <div className="relative mb-3">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#1a2a20] shadow-md" data-alt="Portrait of student Brian K." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDILcO3Gr8mn06cmRtvFsvYk_ug0Hu3QKc1xuUK5ZHyuuaJkOgS6Rbou4nQ_aREv_LKZWMlZEGpZRRU6ME9_pWVPnQN-PbTq38739SAWhQBbUsgSFARL_tVhuiLurCEMOC7LFbvbfKDmQH5CPDw0sebzUsLwi2sRcCys-M_N75uv1axudN5qmpUyZFN3u4y2skvHYrKOlhhip9podxbVoIGHvHh01gd35o8MJvQn21zhFe4WQgfMjNs0XAb4h_wchBnC0wy-b2dUIs"/>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-[#1a2a20]"></div>
                  </div>
                  <h4 className="font-bold text-sm text-[#111813] dark:text-white mb-0.5">Brian K.</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: 88232</p>
                </div>
                {/* Student Card 3 (Absent) */}
                <div className="group relative flex flex-col items-center bg-[#f0f0f0] dark:bg-[#15201a] rounded-xl p-4 border-2 border-transparent border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 transition-all cursor-pointer opacity-70 hover:opacity-100">
                  <span className="absolute top-2 right-2 text-xs font-mono font-bold text-gray-400">A3</span>
                  <div className="relative mb-3 grayscale">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#1a2a20] shadow-md" data-alt="Portrait of student Chloe S." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTyV2gBWdIAG66osuQSVHYU7rsDcDdZ4n-XnKUHwDCqq-3-sDSa_QJ5IYlAKAt7h4L4Ttx4GTldc7ESCkQecTJ7rMfvAr5jbwjrlwSCWLp9bZp3ASe9MffPlR5FsxxgVTuYTUFqQdXDWL_ZZ3v_lCH5jfeJyZ2U-Lg_EiXHcEDLASqsO-3SPlBZW_qwz31yVcpCWPM8iSVu7Ndzz_0uapaDcGsQey1sLZCkZG3s7LbND9iaeBH8xVKjAWFiEG8VvgsL0VGguJKtw8"/>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white dark:border-[#1a2a20]"></div>
                  </div>
                  <h4 className="font-bold text-sm text-gray-600 dark:text-gray-400 mb-0.5">Chloe S.</h4>
                  <p className="text-xs text-red-500 font-medium">Absent</p>
                </div>
                {/* Student Card 4 */}
                <div className="group relative flex flex-col items-center bg-[#f9fafb] dark:bg-[#203328] rounded-xl p-4 border-2 border-green-500/20 hover:border-primary transition-all cursor-pointer">
                  <span className="absolute top-2 right-2 text-xs font-mono font-bold text-gray-400 group-hover:text-primary">A4</span>
                  <div className="relative mb-3">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#1a2a20] shadow-md" data-alt="Portrait of student David L." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCynXGcLUIJx8DzggrmFILQDONGrBfewXH7CfniIOmaYvBI0L936eNvjvYzPIra9IP4PG1JVUqv3ddQHynXWauCJHe91VUieLtWz1lWYXgA61OqAoEm9AnCETGNbnqKvoB3RT59Bx9SWNmz2M1BCtGAti-qnCDA1Mpo1ePbJ89BIEz1q-YCICtfxaFZwDSMRkaVlThOLumPxNI3lF_25oDzyi81cnsBMSKW4QaSnYwxmG1E2VQ6SbfpGfdMKobR2qU-dfGnLUvd1eo"/>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-[#1a2a20]"></div>
                  </div>
                  <h4 className="font-bold text-sm text-[#111813] dark:text-white mb-0.5">David L.</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: 88234</p>
                </div>
                {/* Student Card 5 */}
                <div className="group relative flex flex-col items-center bg-[#f9fafb] dark:bg-[#203328] rounded-xl p-4 border-2 border-green-500/20 hover:border-primary transition-all cursor-pointer">
                  <span className="absolute top-2 right-2 text-xs font-mono font-bold text-gray-400 group-hover:text-primary">B1</span>
                  <div className="relative mb-3">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#1a2a20] shadow-md" data-alt="Portrait of student Emma W." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3zckHSjNpg_L8h0HCXg_J7MTsNpRQsEPxGs6exE68CWOovO6FErelBF1zR7FdWi1MBr_XQqv5_PO7zNGL1MbJYVReVeTDbENdCdDh5ChraR5eH2tLubRq45t8gCLB_jerBr9abAGUnz1FUeyBvYzdWJ1_45T54QL8eyq_lmldqlrRVJ7WRP1GpLcFKMmuY9P5uHj3_5onfKSnBvDKx6uhc5XuEtc6KETzSukpfCmM-bQwuhy32bbPyaJzWt7KROB-0TGy_xixxWg"/>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-[#1a2a20]"></div>
                  </div>
                  <h4 className="font-bold text-sm text-[#111813] dark:text-white mb-0.5">Emma W.</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: 88235</p>
                </div>
                {/* Student Card 6 */}
                <div className="group relative flex flex-col items-center bg-[#f9fafb] dark:bg-[#203328] rounded-xl p-4 border-2 border-green-500/20 hover:border-primary transition-all cursor-pointer">
                  <span className="absolute top-2 right-2 text-xs font-mono font-bold text-gray-400 group-hover:text-primary">B2</span>
                  <div className="relative mb-3">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#1a2a20] shadow-md" data-alt="Portrait of student Frank T." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp-P9A_Q36nldSr_NzFCvZ_Gz3wHrdyJUqkE_DfrxnHd4oA0a7dJh1WL2mDYMPkTpdUkq5Nu0J-IMn_OTfBOIEmYz1vHoiT1Ot9ZHFaFsy80vp9T2pb1-2jY_LnO7Rm4P1pExzUCNw1b3uf_VfTPx-4GMfhiVgOqTgNUK1dngYY12N-7BzPuFGpUfnFlgaKTt556nZRIlbMO11ZFUQsQhcMBvgo20fi_0-C86yLZidI3EWwZALgLW2a-Bnc7OA_j-c0nKO1VgBG_Q"/>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-[#1a2a20]"></div>
                  </div>
                  <h4 className="font-bold text-sm text-[#111813] dark:text-white mb-0.5">Frank T.</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: 88236</p>
                </div>
                {/* Student Card 7 (Incident) */}
                <div className="group relative flex flex-col items-center bg-[#fff8e1] dark:bg-[#332b10] rounded-xl p-4 border-2 border-yellow-400/50 hover:border-yellow-500 transition-all cursor-pointer">
                  <span className="absolute top-2 right-2 text-xs font-mono font-bold text-yellow-600 group-hover:text-yellow-700">B3</span>
                  <div className="absolute -top-2 -left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">WARNING</div>
                  <div className="relative mb-3">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-[#1a2a20] shadow-md" data-alt="Portrait of student Grace P." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8GBT8UE1u4L965TudovQP3D4tLQ9Mzmyt-j2XZmIKtigEBClHWVUYo2EV7f54aHIDkDc0qb6cnjMa7h0Uf2ehgjt_XYJGCc4Tn7X9n-C6tllXpFjdeV-dosPePhGxfG83R0rYR8cKnio-t8bDS1Jz8lgJ9ENMK6jHixRhan0kVpB4pT63SlTUocLBQ9UThUEppCRbt-xTKA9xMlWo-RdpGfWhuvBlygwLLiR1mG-FuMNf10VVuDIvSzAapCZXvvBEQj_hu_hCsCk"/>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-[#1a2a20]"></div>
                  </div>
                  <h4 className="font-bold text-sm text-[#111813] dark:text-white mb-0.5">Grace P.</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ID: 88237</p>
                </div>
                {/* Empty Desk */}
                <div className="group relative flex flex-col items-center justify-center bg-transparent rounded-xl p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 h-full min-h-[140px]">
                  <span className="absolute top-2 right-2 text-xs font-mono font-bold text-gray-300">B4</span>
                  <p className="text-xs text-gray-400 font-medium">Empty Seat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Tools Panel */}
        <aside className="w-80 bg-white dark:bg-[#1a2a20] border-l border-[#e5e7eb] dark:border-[#2a3f32] flex flex-col shrink-0 z-10 shadow-lg">
          <div className="p-5 border-b border-[#e5e7eb] dark:border-[#2a3f32] bg-white dark:bg-[#1a2a20]">
            <button className="w-full flex items-center justify-center gap-2 bg-[#111813] hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              Report Incident
            </button>
          </div>
          <div className="p-5 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#111813] dark:text-white">Digital Attendance</h3>
              <div className="text-xs font-medium px-2 py-1 bg-[#f0f4f2] dark:bg-[#25382b] rounded text-[#61896f] dark:text-[#8ab89b]">40/42 Checked</div>
            </div>
            <div className="relative mb-4">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">search</span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-[#f6f8f6] dark:bg-[#102216] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#111813] dark:text-white placeholder-gray-400"
                placeholder="Find student..."
                type="text"
              />
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1">
              <div className="flex flex-col gap-1">
                {/* Student Row (Checked) */}
                <div className="flex items-center gap-3 p-2 hover:bg-[#f6f8f6] dark:hover:bg-[#102216] rounded-lg group transition-colors">
                  <img className="w-9 h-9 rounded-full object-cover" data-alt="Small thumbnail of Alice M." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9DY5Sp7aCxepUmyompXTRccxj9EXYOFHS-HDw-rgbkA3Gicv9BZeMqHimGhVCLYJC4QBGE8XJjn9C4ZW6EvcTbM5hKM8-RxLuw4Z2_bfCFjPXC9NXJrp8qTyNhAhIQqRGaFeLQeiNiW1PhE6kZdyPasZ9ZiBrHqmvHDZMctnuVhHHcUqwflCxWO-ShCduW0cQr0cuFj44lq36M9F84P3UNCkuZ-4k0B46jx2gAnzfnQzdaDhVb2cq_ddtMChci7qbp-pTGgMdAc"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111813] dark:text-white truncate">Alice M.</p>
                    <p className="text-[11px] text-gray-500 truncate">ID: 88231 • Seat A1</p>
                  </div>
                  <div className="text-primary material-symbols-outlined text-[20px]">check_circle</div>
                </div>
                {/* Student Row (Checked) */}
                <div className="flex items-center gap-3 p-2 hover:bg-[#f6f8f6] dark:hover:bg-[#102216] rounded-lg group transition-colors">
                  <img className="w-9 h-9 rounded-full object-cover" data-alt="Small thumbnail of Brian K." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFngCcZsONKdO3GxuDwt47eSBeVoi-MGl65gWDvCM58hJQ0ejGTbpEX3WrsHUMxyaZfF3mAzN-4_7IuUXNyH8rTUZ_-M2Hm3uTWshuC2wZk2B6ujrvRYR8ZOKgGcijydtbdTVciSfPPj3Fr-aAafZy2xO1LY2PLYVcGv4-2vTCzmmUWZGcxKjZzYPI-9ECOJUsGexGq22ZrDtl7L2gRuZT_BssMsS4MlU0sXI6BjchVw4glzJpL5ywWZksK4UW5pSL43H6zNvDXUU"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111813] dark:text-white truncate">Brian K.</p>
                    <p className="text-[11px] text-gray-500 truncate">ID: 88232 • Seat A2</p>
                  </div>
                  <div className="text-primary material-symbols-outlined text-[20px]">check_circle</div>
                </div>
                {/* Student Row (Absent) */}
                <div className="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                  <div className="relative grayscale opacity-70">
                    <img className="w-9 h-9 rounded-full object-cover" data-alt="Small thumbnail of Chloe S." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbVzk7CMepILTHH6URNXStLCsAr731k6CmtADpCoWL0m6ilbhIkjP-oPfFbZ6u50WuHbGVZRiOL7MQSRW4gQvfih18waQiVwURyeKmDM5-f-heWFwy8RQ1_hZnJfqXNVYU8CF3ONQzrKz-8EBMy4LHnC_vwMWdMqDVhaU1Gl-WAfQ14nCC-zJLgjuBAA0t6jcgSsGyQYM6vHvtuDmFRZHm479pFq39aaS_dJYAxmJwfvuomAfvkoXY2mvPlYrQSRfhIrQbGGBKO-s"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300 truncate">Chloe S.</p>
                    <p className="text-[11px] text-red-500 font-bold truncate">Absent</p>
                  </div>
                  <button className="text-gray-400 hover:text-primary material-symbols-outlined text-[20px]">radio_button_unchecked</button>
                </div>
                {/* Student Row (Checked) */}
                <div className="flex items-center gap-3 p-2 hover:bg-[#f6f8f6] dark:hover:bg-[#102216] rounded-lg group transition-colors">
                  <img className="w-9 h-9 rounded-full object-cover" data-alt="Small thumbnail of David L." src="https://lh3.googleusercontent.com/aida-public/AB6AXuANIlerOPutaqJ0Ru9CJOLL60st2tU90jp3A4FUHrfJsgtPUdfICJje-jYf2fV4GRV-CLWSS5K3h36D_LGPD9YMWCOhZQa5GjPmdt3XDJOcmNXii-kiGScWsCTO5Uac8LoSUIoqFs41cZK-jZaJbJ-1oxBsdjkzurCpB7eVzN-5jS9z-PWAudOZzK4LQJtdgELVBskSzaKFfPXbPodzg2d8nWPqtXNHJGHEJc7sevOc1xGsBHrbKA-RZWCF9R1sjyY0mZr7FWsfHec"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111813] dark:text-white truncate">David L.</p>
                    <p className="text-[11px] text-gray-500 truncate">ID: 88234 • Seat A4</p>
                  </div>
                  <div className="text-primary material-symbols-outlined text-[20px]">check_circle</div>
                </div>
                {/* Student Row (Checked) */}
                <div className="flex items-center gap-3 p-2 hover:bg-[#f6f8f6] dark:hover:bg-[#102216] rounded-lg group transition-colors">
                  <img className="w-9 h-9 rounded-full object-cover" data-alt="Small thumbnail of Emma W." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAP2ZdhnbmO4CVeHxbEELMCb3FUz9_A5teXgcpc3A4Zpb8ai9m3c786-9nySDzybmb1uZ3D_z7hlSZUSwfOp1Ikt4a5LdFbALCNQr1FMfVTGtv9NTDjvbXFzBrdH4FJ6O3Py5gAUyY49qV2NiKJJJyCQe-MCTN6zApkaomRqGZiWmF7JOxLnb-ZYdvA6Yq3ICYeWZ_gcGCE3WUiAEOfm6LGOESCCFB4GF5bm0Z8jCJwJG8s3Ypi1SC9K7Nftdwe2fdMQih0Cagt4o"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111813] dark:text-white truncate">Emma W.</p>
                    <p className="text-[11px] text-gray-500 truncate">ID: 88235 • Seat B1</p>
                  </div>
                  <div className="text-primary material-symbols-outlined text-[20px]">check_circle</div>
                </div>
                {/* Student Row (Checked) */}
                <div className="flex items-center gap-3 p-2 hover:bg-[#f6f8f6] dark:hover:bg-[#102216] rounded-lg group transition-colors">
                  <img className="w-9 h-9 rounded-full object-cover" data-alt="Small thumbnail of Frank T." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp-P9A_Q36nldSr_NzFCvZ_Gz3wHrdyJUqkE_DfrxnHd4oA0a7dJh1WL2mDYMPkTpdUkq5Nu0J-IMn_OTfBOIEmYz1vHoiT1Ot9ZHFaFsy80vp9T2pb1-2jY_LnO7Rm4P1pExzUCNw1b3uf_VfTPx-4GMfhiVgOqTgNUK1dngYY12N-7BzPuFGpUfnFlgaKTt556nZRIlbMO11ZFUQsQhcMBvgo20fi_0-C86yLZidI3EWwZALgLW2a-Bnc7OA_j-c0nKO1VgBG_Q"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111813] dark:text-white truncate">Frank T.</p>
                    <p className="text-[11px] text-gray-500 truncate">ID: 88236 • Seat B2</p>
                  </div>
                  <div className="text-primary material-symbols-outlined text-[20px]">check_circle</div>
                </div>
                {/* Student Row (Checked) */}
                <div className="flex items-center gap-3 p-2 hover:bg-[#f6f8f6] dark:hover:bg-[#102216] rounded-lg group transition-colors">
                  <img className="w-9 h-9 rounded-full object-cover" data-alt="Small thumbnail of Grace P." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB60Qif_5ynDSl3JZjiQQMzFfQH5q22bPJ9v2WfV2Svu8dro6ntp4cvnuuRjknCptdL2nPZU6UF0gGFSSX3wRdqO3yEggaKvSoaw43v2MLxeQAfNCfhrImOl-Gn3hj8ud8MjSf7d13BvoLBSzadCJxeUVm81k0aAztg9HnYI37EFech0ugfI_wffdBlGwlLIVijiN7Ho4IPiE7n6wh7OEAE3q74p83jI003VPeOh2mOyt2Lqs4tk0WjRoqETK4AEYijL8PtB6bxq1g"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111813] dark:text-white truncate">Grace P.</p>
                    <p className="text-[11px] text-gray-500 truncate">ID: 88237 • Seat B3</p>
                  </div>
                  <div className="text-primary material-symbols-outlined text-[20px]">check_circle</div>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-auto border-t border-[#e5e7eb] dark:border-[#2a3f32]">
              <button className="w-full py-2 px-3 text-sm font-medium text-[#61896f] dark:text-[#8ab89b] hover:bg-[#f6f8f6] dark:hover:bg-[#102216] rounded-lg transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">print</span> Print Attendance
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
