import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Login from "./components/Login";
import Overview from "./components/Overview";
import Settings from "./components/Settings";
import Task from "./components/Task";




export default function App() {
  const [user, setUser] = useState(null);
  // (() => {
    // Retrieve user from localStorage if available
  //   const savedUser = localStorage.getItem("user");
  //   return savedUser ? JSON.parse(savedUser) : null;
  // });
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login onLogin={setUser}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="overview" element={<Overview user={user}/>} />
        <Route path="task" element={<Task/>} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
         <Route path= "*" element={<p>Invalid route (404 Not Found)!!!</p>}/>
        </Route> 
    </Routes>
    </BrowserRouter>
  );
}