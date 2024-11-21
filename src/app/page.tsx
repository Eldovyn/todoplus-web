'use client';
import React, { useState, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import Image from "next/image";
import IconWeb from "../../public/IconRemoverBg.png";
import AddTask from "@/components/AddTask";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';

const Home: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [listTask, setListTask] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = Cookies.get('accessToken');
      let response = await fetch('http://localhost:5000/todoplus/task', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      let resp = await response.json();
      setListTask(resp.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <nav className="relative bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 overflow-visible">
            <Image src={IconWeb} alt="" className="w-10" />
            <p className="font-bold text-md text-white min-w-[6rem]">TodoPlus</p>
          </div>
          <button
            className="text-white focus:outline-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div
            className={`absolute top-full left-0 w-full bg-gray-900 md:static md:flex justify-end ${isOpen ? "block" : "hidden"}`}
            id="navbarNav"
          >
            <ul className={`md:flex items-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 text-lg`}>
              <li className="nav-item">
                <div className="flex flex-row text-white items-center cursor-pointer">
                  <IoMdAddCircle size={25} />
                  <div className="me-1 ms-1">Todo List</div>
                </div>
              </li>
              <li className="nav-item">
                <div className="flex flex-row text-white items-center cursor-pointer">
                  <MdOutlineHistoryToggleOff size={25} />
                  <div className="me-1 ms-1">History</div>
                </div>
              </li>
              <li className="nav-item">
                <div className="flex flex-row text-white items-center cursor-pointer">
                  <MdAccountCircle size={25} />
                  <div className="me-1 ms-1">Account</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mx-auto px-4 w-full text-center">
        <p className="text-black font-bold text-3xl text-center pt-[10rem]">Apa Rencanamu Hari Ini ?</p>
        <AddTask listTask={listTask} setListTask={setListTask}/>
        <br />
        <hr className="w-[60%] mx-auto" />
        <br />
        {
          listTask.map((item: any) => (
            <div key={item.id} className="border rounded-lg shadow p-4 text-white w-[60%] mx-auto m-5 bg-gray-900">
              <div className="p-1">
                <p className="text-sm">{item.title}</p>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
          ))
        }
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
