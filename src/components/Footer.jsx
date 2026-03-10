



import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import techprologo from "../assets/images/techprologo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0F1B4C] text-white font-poppins">
      
      {/* MAIN CONTENT */}
      <div className="pt-12 pb-8 px-6 sm:px-10 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">

          {/* LOGO & ABOUT */}
          <div>
            <img
              src={techprologo}
              alt="TechPro Logo"
              className="w-40 -mt-4 -translate-4"
            />
            <p className="text-sm leading-snug text-gray-300 max-w-xs -mt-8">
              TechPro Institute helps learners gain practical, industry-ready
              tech skills and globally recognized certifications.
            </p>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">
              Useful Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#hero" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/term" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-white transition">
                  Legal Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">
              Contact Us
            </h4>

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <FiMail className="mt-1 text-[#9FA8FF]" />
                <a
                  href="mailto:info@techproinstitute.org"
                  className="hover:text-white transition"
                >
                  support@lms.techproinstitute.org
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-1 text-[#9FA8FF]" />
                <a
                  href="tel:+447534617780"
                  className="hover:text-white transition"
                >
                  UK: +44 7534 617 780
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-1 text-[#9FA8FF]" />
                <a
                  href="tel:+61435976010"
                  className="hover:text-white transition"
                >
                  Australia: 0390883396
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-1 text-[#9FA8FF]" />
                <a
                  href="tel:+2348086478810"
                  className="hover:text-white transition"
                >
                  Nigeria: +234 808 647 8810
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-[#9FA8FF]" />
                <span>Australia • UK • Nigeria</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TechPro Institute. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;