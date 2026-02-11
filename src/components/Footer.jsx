


import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import techprologo from "../assets/images/techprologo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0F1B4C] text-white font-poppins">
      {/* MAIN CONTENT */}
      <div className="pt-16 pb-10 px-6 sm:px-10 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* LOGO & ABOUT */}
          <div className="space-y-4">
            <img src={techprologo} alt="TechPro Logo" className="w-32" />
            <p className="text-sm leading-relaxed text-gray-300">
              TechPro Institute helps learners gain practical, industry-ready
              tech skills and globally recognized certifications.
            </p>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">
              Useful Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                { label: "Home", href: "/landingpage" },
                { label: "About", href: "#how" },
                { label: "Certifications", href: "/certificate" },
                { label: "Contact", href: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-white transition transform hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {["Terms of Service", "Privacy Policy", "Legal Terms"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-white transition transform hover:translate-x-1"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-200">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">

              <li className="flex items-start gap-3">
                <FiMail className="mt-0.5 text-[#9FA8FF]" />
                <span>info@techproinstitute.org</span>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-0.5 text-[#9FA8FF]" />
                <span>UK: +44 7534 617 780</span>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-0.5 text-[#9FA8FF]" />
                <span>Australia: +61 435 976 010</span>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-0.5 text-[#9FA8FF]" />
                <span>Nigeria: +234 808 647 8810</span>
              </li>

              <li className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 text-[#9FA8FF]" />
                <span>Australia • UK • Nigeria</span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="border-t border-white/10 py-5 px-6 text-center text-xs sm:text-sm text-gray-300">
        © {new Date().getFullYear()} TechPro Institute. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;