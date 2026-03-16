// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify"; // Toast notifications
// import "react-toastify/dist/ReactToastify.css"; // Toast styles

// // Pages/Components
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import ContactPage from "./pages/ContactPage";
// import ScrollToTop from "./components/ScrollToTop";
// import SignupPage from "./pages/SignupPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
// import ForgetPage from "./pages/ForgetPage";
// import VerifyPage from "./pages/VerifyPage";
// import PaymentPage from "./pages/PaymentPage";
// import CompletePage from "./pages/CompletePage";
// import TermPage from './pages/TermPage'
// import PrivacyPage from './pages/PrivacyPage'
// import LegalPage from './pages/LegalPage'
// import FreePage from "./pages/FreePage";
// import DashboardPage from "./pages/dashboard-pages/DashboardPage";
// import AdminPaymentPage from "./pages/dashboard-pages/AdminPaymentPage";
// import AdminCoursePage from "./pages/dashboard-pages/AdminCoursePage";
// import CertificatePage from "./pages/dashboard-pages/CertificatePage";
// import PreviewPage from "./pages/dashboard-pages/PreviewPage";
// import ModulePage from "./pages/dashboard-pages/ModulePage";
// import CourseDetailPage from "./pages/CourseDetailPage";
// import AvailableCoursesPage from "./pages/dashboard-pages/AvailableCoursesPage";
// import Preview from "./components/dashboard-components/Preview";
// import QuizPage from "./pages/dashboard-pages/QuizPage";



// const App = () => {
//   return (
//     <div className="App">
//       {/* Toast Notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}          
//         hideProgressBar={false}   
//         newestOnTop={false}       
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"             
//       />

//       <ScrollToTop />
//       {/* Routes */}
//       <Routes>
//         {/* Public Routes */}
         
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/landingpage" element={<LandingPage />} />
//         <Route path="/course/:slug" element={<CourseDetailPage />} />
//          <Route path="/contact" element={<ContactPage/>} />
//          <Route path="/login" element={<LoginPage/>} />
//          <Route path="/signup" element={<SignupPage/>} />
//           <Route path="/resetpassword" element={<ResetPasswordPage/>} />
//           <Route path="/term" element={<TermPage/>} />
//           <Route path="/privacy" element={<PrivacyPage/>} />
//           <Route path="/verify" element={<VerifyPage/>} />
//           <Route path="/enrollment/:id" element={<PaymentPage/>} />
//           <Route path="/forget" element={<ForgetPage/>} />
//           <Route path="/legal" element={<LegalPage/>} />
//           <Route path="/complete" element={<CompletePage/>} />
//            <Route path="/dashboard" element={<DashboardPage />} />
//            <Route path="/dashboard" element={<DashboardPage />} />
//             <Route path="/adminpayments" element={<AdminPaymentPage />} />
//              <Route path="/admincourse" element={<AdminCoursePage />} />
//               <Route path="/available-courses" element={<AvailableCoursesPage />} />
//              <Route path="/certificate" element={<CertificatePage />} />
//               <Route path="/courses/free-trial" element={<FreePage />} />
//              <Route path="/preview" element={<PreviewPage />} />
//              <Route path="/module/:id" element={<ModulePage />} />
//             <Route path="/preview" element={<Preview />} /> 
//             <Route path="/quiz/:id" element={<QuizPage />} /> 
//       </Routes>
//     </div>
//   );
// };

// export default App;



import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactPage from "./pages/ContactPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgetPage from "./pages/ForgetPage";
import VerifyPage from "./pages/VerifyPage";
import PaymentPage from "./pages/PaymentPage";
import CompletePage from "./pages/CompletePage";
import TermPage from "./pages/TermPage";
import PrivacyPage from "./pages/PrivacyPage";
import LegalPage from "./pages/LegalPage";
import FreePage from "./pages/FreePage";
import CourseDetailPage from "./pages/CourseDetailPage";

// Dashboard/Admin Pages
import DashboardPage from "./pages/dashboard-pages/DashboardPage";
import AdminPaymentPage from "./pages/dashboard-pages/AdminPaymentPage";
import AdminCoursePage from "./pages/dashboard-pages/AdminCoursePage";
import CertificatePage from "./pages/dashboard-pages/CertificatePage";
import PreviewPage from "./pages/dashboard-pages/PreviewPage";
import ModulePage from "./pages/dashboard-pages/ModulePage";
import AvailableCoursesPage from "./pages/dashboard-pages/AvailableCoursesPage";
import QuizPage from "./pages/dashboard-pages/QuizPage";
import Preview from "./components/dashboard-components/Preview";
import QuizreviewPage from "./pages/dashboard-pages/quizreviewPage";

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

      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/course/:slug" element={<CourseDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route path="/forget" element={<ForgetPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/enrollment/:id" element={<PaymentPage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/term" element={<TermPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/courses/free-trial" element={<FreePage />} />
        {/* <Route path="/quiz-review/:attemptId" element={<QuizReview />} /> */}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminpayments"
          element={
            <ProtectedRoute>
              <AdminPaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admincourse"
          element={
            <ProtectedRoute>
              <AdminCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/available-courses"
          element={
            <ProtectedRoute>
              <AvailableCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificate"
          element={
            <ProtectedRoute>
              <CertificatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview"
          element={
            <ProtectedRoute>
              <PreviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/module/:id"
          element={
            <ProtectedRoute>
              <ModulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/quiz-review/:attemptId"
          element={
            <ProtectedRoute>
              <QuizreviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/preview-component"
          element={
            <ProtectedRoute>
              <Preview />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;


