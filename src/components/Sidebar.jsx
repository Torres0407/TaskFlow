// import { useEffect, useState } from 'react';
import { FaHistory, FaTasks } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { LuLayoutGrid } from "react-icons/lu";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
    
      //if user is logged in, show the sidebar works but not good it recalls user info afer every render
      // if (user && user.email) {
      //       return (
      //             <div className={styles.sidebarHome}>
      //                <p>Welcome, {user.firstName}!</p>
      //             </div>
      //       );
      //    }

   
  return (
        <div className="flex flex-col items-center justify-center gap-14 font-bold text-2xl text-black">
      {/* {user &&  <h2>Welcome, {user.firstName + " " + user.lastName}</h2>} */}
      <div className="p-1 w-48">
         <img src="src\assets\PNG taskflow logo.png" alt="logo" />
      </div>
     <div className="flex flex-col gap-12 w-60 p-2 ">
        <NavLink to="overview" className="flex items-center gap-3 px-6 py-4 rounded-xl hover:bg-gray-100 transition-colors">
        <LuLayoutGrid/>Overview</NavLink>
     
        <NavLink to="task" className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors">
         <FaTasks/>Task</NavLink>
     
        <NavLink to="history" className="flex items-center gap-3 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors">
         <FaHistory/>History</NavLink>
     
        <NavLink to="settings" className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors">
         <IoMdSettings/>Settings</NavLink>
     </div>
     {/* <div>
        <NavLink to="logout">Logout</NavLink>
     </div> */}

     </div>
    );
}



