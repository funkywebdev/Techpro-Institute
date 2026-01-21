import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles

// Pages/Components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CoursePage1 from "./pages/CoursePage1";
import CoursePage2 from "./pages/CoursePage2";
import CoursePage3 from "./pages/CoursePage3";
import ContactPage from "./pages/ContactPage";
import SignupPage from "./pages/SignupPage";





const App = () => {
  return (
    <div className="App">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}          // Toast disappears after 2s
        hideProgressBar={false}   // Show progress bar
        newestOnTop={false}       // Oldest toast first
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"             // Optional: 'light', 'dark', 'colored'
      />

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/course1" element={<CoursePage1 />} />
        <Route path="/course2" element={<CoursePage2 />} />
         <Route path="/course3" element={<CoursePage3/>} />
         <Route path="/contact" element={<ContactPage/>} />
         <Route path="/login" element={<LoginPage/>} />
         <Route path="/signup" element={<SignupPage/>} />


        {/* Optional: 404 Route */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
