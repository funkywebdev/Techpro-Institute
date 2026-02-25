


import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import techprologo from "../assets/images/techprologo.png";
import { Link } from "react-router-dom";

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
              { label: "Home", href: "#hero", internal: false },
               { label: "About", href: "#about", internal: false },
               { label: "FAQ", href: "#faq", internal: false },
                { label: "Contact", href: "/contact", internal: true },
              ].map((link, i) => (
                <li key={i}>
                  {link.internal ? (
                    <Link
                      to={link.href}
                      className="hover:text-white transition transform hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-white transition transform hover:translate-x-1"
                    >
                      {link.label}
                    </a>
                  )}
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
              {[
                { label: "Terms of Service", href: "/term", internal: true },
                { label: "Privacy Policy", href: "/privacy", internal: true },
                { label: "Legal Terms", href: "/legal", internal: true },
              ].map((item, i) => (
                <li key={i}>
                  {item.internal ? (
                    <Link
                      to={item.href}
                      className="hover:text-white transition transform hover:translate-x-1"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="hover:text-white transition transform hover:translate-x-1"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
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
                <a href="mailto:info@techproinstitute.org" className="hover:underline">
                  info@techproinstitute.org
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-0.5 text-[#9FA8FF]" />
                <a href="tel:+447534617780" className="hover:underline">
                  UK: +44 7534 617 780
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-0.5 text-[#9FA8FF]" />
                <a href="tel:+61435976010" className="hover:underline">
                  Australia: +61 435 976 010
                </a>
              </li>

              <li className="flex items-start gap-3">
                <FiPhone className="mt-0.5 text-[#9FA8FF]" />
                <a href="tel:+2348086478810" className="hover:underline">
                  Nigeria: +234 808 647 8810
                </a>
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
      <div className="border-t border-white/10 py-5 px-6 text-center sm:text-base text-gray-300">
        © {new Date().getFullYear()} TechPro Institute. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;