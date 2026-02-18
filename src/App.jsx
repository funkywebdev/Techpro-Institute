import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles

// Pages/Components
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgetPage from "./pages/ForgetPage";
import VerifyPage from "./pages/VerifyPage";
import PaymentPage from "./pages/PaymentPage";
import CompletePage from "./pages/CompletePage";
import DashboardPage from "./pages/dashboard-pages/DashboardPage";
import AdminPaymentPage from "./pages/dashboard-pages/AdminPaymentPage";
import AdminCoursePage from "./pages/dashboard-pages/AdminCoursePage";
import CertificatePage from "./pages/dashboard-pages/CertificatePage";
import PreviewPage from "./pages/dashboard-pages/PreviewPage";
import ModulePage from "./pages/dashboard-pages/ModulePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AvailableCoursesPage from "./pages/dashboard-pages/AvailableCoursesPage";
import Preview from "./components/dashboard-components/Preview";
import QuizPage from "./pages/dashboard-pages/QuizPage";


const App = () => {
  return (
    <div className="App">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}          
        hideProgressBar={false}   
        newestOnTop={false}       
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"             
      />

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/course/:slug" element={<CourseDetailPage />} />
         <Route path="/contact" element={<ContactPage/>} />
         <Route path="/login" element={<LoginPage/>} />
         <Route path="/signup" element={<SignupPage/>} />
          <Route path="/resetpassword" element={<ResetPasswordPage/>} />
          <Route path="/verify" element={<VerifyPage/>} />
          <Route path="/enrollment/:id" element={<PaymentPage/>} />
          <Route path="/forget" element={<ForgetPage/>} />
          <Route path="/complete" element={<CompletePage/>} />
           <Route path="/dashboard" element={<DashboardPage />} />
           <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/adminpayments" element={<AdminPaymentPage />} />
             <Route path="/admincourse" element={<AdminCoursePage />} />
              <Route path="/available-courses" element={<AvailableCoursesPage />} />
             <Route path="/certificate" element={<CertificatePage />} />
             <Route path="/preview" element={<PreviewPage />} />
             <Route path="/module/:id" element={<ModulePage />} />
            <Route path="/preview" element={<Preview />} /> 
            <Route path="/quiz/:id" element={<QuizPage />} /> 
      </Routes>
    </div>
  );
};

export default App;


