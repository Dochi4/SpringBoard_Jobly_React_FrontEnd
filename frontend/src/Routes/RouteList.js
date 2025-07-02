import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Users/Login";
import Signup from "./Users/SignUp";
import Profile from "./Users/Profile";
import CompanyList from "./Companies/CompanyList";
import CompanyDetails from "./Companies/CompanyDetails";
import JobList from "./Jobs/JobList";
import Home from "./Home";
import Edit from "./Users/Edit";
import NotFound from "./NotFound";
import ProtectedRoute from "../ProtectedRoute";

function RouteList({ handleSignUp, handleLogin, handleEditUser }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* USER  */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={<Signup handleSignUp={handleSignUp} />}
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/users/:username"
          element={
            <ProtectedRoute>
              <Edit handleEditUser={handleEditUser} />
            </ProtectedRoute>
          }
        />

        {/* COMPANIES */}
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <CompanyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies/:name"
          element={
            <ProtectedRoute>
              <CompanyDetails />{" "}
            </ProtectedRoute>
          }
        />

        {/* JOBS */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default RouteList;
