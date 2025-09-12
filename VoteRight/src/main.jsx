import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Initial from "./Initial";
import UserRegistration from "./UserRegistration";
import AdminRegistration from "./AdminRegistration";
import Login from "./Login";
import Userpage from "./Userpage";
import VoteSuccessPage from "./VoteSuccessPage";
import PollResult from "./PollResult";
import AdminDashboard from "./admin/Admindashboard";
import CreatePoll from "./admin/Create-poll";
import "./index.css"; // or your main CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/admin-register" element={<AdminRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-poll" element={<Userpage />} />
        <Route path="/vote-success" element={<VoteSuccessPage />} />
        <Route path="/poll-result" element={<PollResult />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-poll" element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);