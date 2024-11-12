import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

const AddTask: React.FunctionComponent = () => {
    return (
        <>
            <div className="h-screen mx-auto w-full bg-white">
                <div className="flex flex-row-reverse w-full bg-gray-900 p-[1.52rem]">
                    <IoMdAddCircle className="text-white me-2 ms-2" size={20} />
                    <FaTasks className="text-white me-2 ms-2" size={20} />
                    <FaHistory className="text-white me-2 ms-2" size={20} />
                </div>
                <div className="border bg-red-500 m-6 p-5 rounded-md flex justify-center items-center">
                    <h1 className="text-black">hello world</h1>
                </div>
            </div>
        </>
    );
};

export default AddTask;
