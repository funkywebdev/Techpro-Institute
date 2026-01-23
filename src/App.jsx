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
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyPage from "./pages/VerifyPage";
import PaymentPage from "./pages/PaymentPage";
import CompletePage from "./pages/CompletePage";
import DashboardPage from "./pages/dashboard-pages/DashboardPage";
import AdminPaymentPage from "./pages/dashboard-pages/AdminPaymentPage";
import AdminCoursePage from "./pages/dashboard-pages/AdminCoursePage";
import CertificatePage from "./pages/dashboard-pages/CertificatePage";



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
          <Route path="/resetpassword" element={<ResetPasswordPage/>} />
          <Route path="/verify" element={<VerifyPage/>} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/complete" element={<CompletePage/>} />
           <Route path="/dashboard" element={<DashboardPage />} />
           <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/adminpayment" element={<AdminPaymentPage />} />
             <Route path="/admincourse" element={<AdminCoursePage />} />
             <Route path="/certificate" element={<CertificatePage />} />
          
          
          
          
          
          


      
        
      </Routes>
    </div>
  );
};

export default App;
