import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import techprologo from "../assets/images/techprologo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0F1B4C] text-white font-poppins pt-16">
      
      {/* MAIN CONTENT */}
      <div className="px-6 sm:px-10 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* LOGO & ABOUT */}
          <div className="space-y-3">
            <img
              src={techprologo}
              alt="TechPro Logo"
              className="w-32"
            />
            <p className="text-sm leading-relaxed text-gray-200">
              TechPro Institute is dedicated to helping learners gain practical
              skills and certifications needed to succeed in today’s tech-driven world.
            </p>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h4 className="font-semibold mb-3">Useful Links</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="#Hero" className="hover:text-white">Home</a></li>
              <li><a href="#Sponsor" className="hover:text-white">About</a></li>
              <li><a href="#About2" className="hover:text-white">Certifications</a></li>
              <li><a href="#Contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Legal Terms</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-200">

              <li className="flex items-center gap-3">
                <FiMail className="text-lg" />
                <span>info@techpro.com</span>
              </li>

              <li className="flex items-center gap-3">
                <FiPhone className="text-lg" />
                <span>UK Contact : +44 7534617780</span>
              </li>

              <li className="flex items-center gap-3">
                <FiPhone className="text-lg" />
                <span>Australia Contact: +61 435 976 010</span>
              </li>


              <li className="flex items-center gap-3">
                <FiMapPin className="text-lg" />
                <span>Australia, UK</span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="mt-12 border-t border-gray-600 py-5 px-6 text-center text-xs sm:text-sm text-gray-300">
        © {new Date().getFullYear()} TechPro Institute. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


