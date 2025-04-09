import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import React from "react";

const Page = () => {
  return (
    <div className="grid grid-cols-5 max-w-screen-2xl mx-auto border-x-2 border-gray-100">
      <Sidebar />

      {/* Main */}
      <div className="col-span-4 bg-gray-100 ">
        <Navbar />

        {/* Main Section */}
        <section className="px-8 py-6">
          {/* attendance */}
          <div className="bg-white rounded-2xl w-full px-6 py-4 flex items-center text-gray-800 justify-between ">
            <div className="flex items-center ">
              <div>
                <div className="text-xs font-semibold">Attendance</div>
                <div className="text-xxs text-gray-500 mt-1">28 Dec 2021</div>
              </div>
              <div className="bg-gray-100 px-5 pr-6 py-2 ml-5 rounded-l-lg font-semibold text-gray-700">
                10:36 Hrs
              </div>
              <div className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer px-4 py-2  -ml-2 rounded-lg font-semibold text-gray-50 text-xxs self-stretch flex items-center tracking-wide">
                Check-in
              </div>
              <div className="ml-12 flex items-center self-stretch ">
                <span className="text-xs font-semibold">Status</span>
                <div className="bg-gray-100 px-5  py-2 ml-3 rounded-lg font-semibold text-gray-700 flex items-center  self-stretch justify-between">
                  <span className="text-xxs font-semibold inline-flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2 w-2 fill-green-500 mr-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
                    </svg>
                    <span className="ml-1 w-20">Available</span>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5  stroke-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs bg-gray-800 hover:bg-gray-900  cursor-pointer text-gray-50 px-6 py-3 rounded-lg">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <span>Meeting Now</span>
            </div>
          </div>
          {/* /attendance */}
          <section className="grid grid-cols-3 gap-x-6 mt-6">
            {/* Members */}
            <section className="col-span-2">
              <div className="text-xs flex items-center justify-between w-full">
                <span className="font-semibold">Team members (12)</span>
                <a href="#" className="text-indigo-400 font-medium text-xs">
                  View all
                </a>
              </div>
              <div className="grid grid-cols-4 gap-x-4 mt-4 ">
                <div
                  className="aspect-square rounded-2xl bg-white flex justify-center items-center flex-col text-indigo-400 text-sm
                      hover:shadow hover:text-indigo-500 hover:font-medium cursor-pointer group"
                >
                  <span className="bg-indigo-100 rounded-full group-hover:text-indigo-500  text-indigo-400 p-2.5 border border-indigo-300  border-dashed mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                  <div>Add New</div>
                </div>
                <div
                  className="relative aspect-square rounded-2xl bg-white flex justify-center items-center flex-col text-gray-500 text-sm
                       ring-2 ring-indigo-200"
                >
                  <a
                    href="#"
                    className="absolute top-3 right-3 text-gray-400 hover:text-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </a>
                  <span className="relative">
                    <img
                      src="images/avatar.jpg"
                      className="w-14 h-14 rounded-full mb-3"
                      alt=""
                      srcSet=""
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3  fill-green-500 stroke-white stroke-2 absolute bottom-3 right-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
                    </svg>
                  </span>
                  <div className="">John Doe</div>
                  <div className="text-xxs text-gray-400 mt-1">
                    Web Developer
                  </div>
                </div>
                <div
                  className="relative aspect-square rounded-2xl bg-white flex justify-center items-center flex-col text-gray-500 text-sm
                      hover:ring-2 hover:ring-indigo-200"
                >
                  <a
                    href="#"
                    className="absolute top-3 right-3 text-gray-400 hover:text-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </a>
                  <span className="relative">
                    <img
                      src="https://api.lorem.space/image/face?w=44&h=44&hash=ic7a5vp4"
                      className="w-14 h-14 rounded-full mb-3"
                      alt=""
                      srcSet=""
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3  fill-green-500 stroke-white stroke-2 absolute bottom-3 right-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
                    </svg>
                  </span>
                  <div className="">Mac Bean</div>
                  <div className="text-xxs text-gray-400 mt-1">
                    Product Designer
                  </div>
                </div>
                <div
                  className="relative aspect-square rounded-2xl bg-white flex justify-center items-center flex-col text-gray-500 text-sm
                      hover:ring-2 hover:ring-indigo-200"
                >
                  <a
                    href="#"
                    className="absolute top-3 right-3 text-gray-400 hover:text-indigo-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </a>
                  <span className="relative">
                    <img
                      src="https://api.lorem.space/image/face?w=44&h=44&hash=ic7advp4"
                      className="w-14 h-14  rounded-full mb-3"
                      alt=""
                      srcSet=""
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3  fill-red-500 stroke-white stroke-2 absolute bottom-3 right-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
                    </svg>
                  </span>
                  <div className="">Jane Doe</div>
                  <div className="text-xxs text-gray-400 mt-1">
                    Visual Designer
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-x-4 mt-6 ">
                {/* activities */}
                <div className="col-span-3 ">
                  <div className="font-semibold text-xs ">Team activities</div>
                  <div className="relative mt-4 bg-white w-full rounded-2xl">
                    <div className="absolute top-4 right-4 inline-flex items-center text-xs text-gray-500 space-x-1">
                      <span>This month</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 stroke-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="px-6 pt-10 pb-6 h-72">
                      <img
                        src="images/chart.jpg"
                        className=""
                        alt=""
                        srcSet=""
                      />
                    </div>
                  </div>
                </div>
                {/* /activities */}
                {/* meetings */}
                <div className="col-span-2">
                  <div className="font-semibold text-xs">
                    Today meetings (3)
                  </div>
                  <div className="mt-4 flex flex-col space-y-4 overflow-hidden h-72 overflow-y-auto no-scrollbar">
                    <div className="bg-white rounded-2xl p-5 flex space-x-4">
                      <div className="flex w-10 h-10  text-center items-center justify-center bg-purple-600 rounded-full text-white text-xs">
                        FUI
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500">
                          Flow UI discussion
                        </div>
                        <div className="text-xxs text-gray-400 mt-1">
                          3.00 pm - 4.00 pm
                        </div>
                        <div className="flex items-center justify-between mt-5">
                          <div className="flex -space-x-1 items-center">
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="images/avatar.jpg"
                              alt=""
                              srcSet=""
                            />
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="https://api.lorem.space/image/face?w=32&h=32&hash=zsrj8cck"
                              alt=""
                              srcSet=""
                            />
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="https://api.lorem.space/image/face?w=32&h=32&hash=zsfj8cck"
                              alt=""
                              srcSet=""
                            />
                          </div>
                          <a href="#" className="text-xs text-indigo-400">
                            view
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 flex space-x-4">
                      <div className="flex w-10 h-10  text-center items-center justify-center bg-emerald-600 rounded-full text-white text-xs">
                        EH
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500">
                          Email HTML discussion
                        </div>
                        <div className="text-xxs text-gray-400 mt-1">
                          4.30 pm - 5.00 pm
                        </div>
                        <div className="flex items-center justify-between mt-5">
                          <div className="flex -space-x-1 items-center">
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="images/avatar.jpg"
                              alt=""
                              srcSet=""
                            />
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="https://api.lorem.space/image/face?w=32&h=32&hash=zsr38cck"
                              alt=""
                              srcSet=""
                            />
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="https://api.lorem.space/image/face?w=32&h=32&hash=zsfj1cck"
                              alt=""
                              srcSet=""
                            />
                          </div>
                          <a href="#" className="text-xs text-indigo-400">
                            view
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 flex space-x-4">
                      <div className="flex w-10 h-10  text-center items-center justify-center bg-yellow-600 rounded-full text-white text-xs">
                        ET
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500">
                          Email template
                        </div>
                        <div className="text-xxs text-gray-400 mt-1">
                          3.00 pm - 4.00 pm
                        </div>
                        <div className="flex items-center justify-between mt-5">
                          <div className="flex -space-x-1 items-center">
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="images/avatar.jpg"
                              alt=""
                              srcSet=""
                            />
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="https://api.lorem.space/image/face?w=32&h=32&hash=zstj8cck"
                              alt=""
                              srcSet=""
                            />
                            <img
                              className="rounded-full w-7 h-7 shadow-lg border border-white"
                              src="https://api.lorem.space/image/face?w=32&h=32&hash=zsfjvcck"
                              alt=""
                              srcSet=""
                            />
                          </div>
                          <a href="#" className="text-xs text-indigo-400">
                            view
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /meetings */}
              </div>
            </section>
            {/* /Members */}
            {/* profile */}
            <section className="col-span-1 bg-white h-full rounded-2xl px-6 pt-10 pb-6">
              <div className="mx-auto w-full text-center flex justify-center">
                <div className="relative aspect-square rounded-2xl bg-white flex justify-center items-center flex-col text-gray-500 text-sm">
                  <span>
                    <img
                      src="images/avatar.jpg"
                      className="w-20 h-20 rounded-full mb-4 border border-blue-200"
                      alt=""
                      srcSet=""
                    />
                  </span>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-xxs text-gray-400 mt-1.5">
                    Web Developer
                  </div>
                </div>
              </div>
              <div className="w-full mt-10">
                <div className="z-20 w-full text-center">
                  <span className="w-1/2 bg-gray-800 inline-block mx-auto text-xxs text-gray-50 px-2 py-2 text-center rounded-lg whitespace-nowrap ">
                    Reporting Manager
                  </span>
                </div>
                <div className="z-10 bg-gray-100 rounded-2xl px-5 py-6 -mt-4 flex items-center justify-between space-x-4 ">
                  <span className="relative">
                    <img
                      src="https://api.lorem.space/image/face?w=44&h=44&hash=ic7d5vp4"
                      className="w-12 h-12 rounded-full "
                      alt=""
                      srcSet=""
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3  fill-red-500 stroke-white stroke-2 absolute bottom-0 right-0"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Martin Lucas</div>
                    <div className="text-xxs text-gray-400 mt-1">
                      Team Manager
                    </div>
                  </div>
                  <a href="#" className="text-gray-500 hover:text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="mt-8 text-xs">
                <div className="text-gray-500">Email</div>
                <div className="mt-1.5 font-semibold ">john@team.com</div>
                <div className="text-gray-500 mt-5">Mobile</div>
                <div className="mt-1.5 font-semibold">+1 (202) 555-0168</div>
                <div className="text-gray-500 mt-5">Team</div>
                <div className="mt-1.5 font-semibold">Web Co.</div>
              </div>
            </section>
            {/* /profile */}
          </section>
          {/* /Main Section */}
        </section>
      </div>
      {/* /Main */}
    </div>
  );
};

export default Page;
