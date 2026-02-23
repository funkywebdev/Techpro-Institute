

import React, { useRef, useState, useEffect } from "react";
import { FiMail, FiPhone, FiMenu } from "react-icons/fi";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms", content: <p>By accessing or using TechPro’s website or services, you confirm that you are at least 18 years old or have parental or guardian consent to use our services. If you do not agree to these Terms, please do not use our services.</p> },
  { id: "changes", title: "Changes to Terms", content: <p>We reserve the right to update these Terms at any time. Changes will be effective immediately upon posting. Your continued use constitutes acceptance. Review regularly.</p> },
  { id: "use", title: "Use of Services", content: <p>Use our services for lawful purposes only. Avoid harming TechPro, its users, or its reputation.</p> },
  { id: "accounts", title: "Registration & Accounts", content: <p>Some services require an account. Keep your credentials safe. Notify us if unauthorized access occurs. Unauthorized copying, hacking, phishing, spamming, or malware distribution is prohibited.</p> },
  { id: "intellectual", title: "Intellectual Property", content: <p>All content is the property of TechPro or its licensors. Unauthorized use is prohibited.</p> },
  { id: "user-content", title: "User Content", content: <p>You retain ownership of content you submit, but grant TechPro a license to use it for service delivery.</p> },
  { id: "payments", title: "Payments & Refunds", content: <p>Payments follow checkout terms. Refunds, if any, follow our refund policy.</p> },
  { id: "privacy", title: "Privacy Policy", content: <p>Your use of our services is subject to our Privacy Policy.</p> },
  { id: "liability", title: "Limitation of Liability", content: <p>TechPro is not responsible for indirect or incidental damages. Liability is limited to fees paid.</p> },
  { id: "termination", title: "Termination", content: <p>Access may be suspended or terminated if Terms are violated.</p> },
  { id: "law", title: "Governing Law", content: <p> These Terms are governed by the laws of the country in which you access our services. Any disputes will be resolved under the jurisdiction applicable to your location.</p> },
  { id: "contact", title: "Contact Us", content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FiMail className="text-[#15256E]" />
          <a href="mailto:info@techproinstitute.org" className="text-[#15256E] font-medium hover:underline">info@techproinstitute.org</a>
        </div>
        <div className="flex items-center gap-2"><FiPhone className="text-[#15256E]" /><span>UK: +44 7534 617 780</span></div>
        <div className="flex items-center gap-2"><FiPhone className="text-[#15256E]" /><span>Australia: +61 435 976 010</span></div>
        <div className="flex items-center gap-2"><FiPhone className="text-[#15256E]" /><span>Nigeria: +234 808 647 8810</span></div>
      </div>
    )
  },
];

const Term = () => {
  const sectionRefs = useRef(sections.map(() => React.createRef()));
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (index) => {
    sectionRefs.current[index].current.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.innerHeight / 2;
      const currentIndex = sectionRefs.current.findIndex((ref) => {
        const rect = ref.current.getBoundingClientRect();
        return rect.top <= offset && rect.bottom > offset;
      });
      if (currentIndex !== -1) setActiveIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="term" className="bg-[#f7f9fc] min-h-screen">
    
      <div className="bg-gradient-to-br from-[#15256E] to-[#1f3aa8] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <p className="mb-10"></p>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 relative inline-block">
            Terms of Use
            <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] rounded-full opacity-70"></span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90 text-[17px]">
            Read carefully to understand your rights and responsibilities.
          </p>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="lg:hidden px-4 py-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow w-full justify-between"
        >
          <span className="font-medium text-[#15256E]">On This Page</span>
          <FiMenu className="text-[#15256E]" />
        </button>
        {menuOpen && (
          <ul className="mt-2 bg-white rounded-xl shadow p-3 space-y-1">
            {sections.map((s, index) => (
              <li
                key={s.id}
                onClick={() => scrollToSection(index)}
                className={`cursor-pointer transition px-2 py-1 rounded ${
                  activeIndex === index ? "bg-[#15256E]/10 text-[#15256E] font-medium" : "text-gray-600 hover:text-[#15256E]"
                }`}
              >
                {s.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-12">
        {/* SIDEBAR */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">ON THIS PAGE</h3>
            <ul className="space-y-2 text-sm">
              {sections.map((s, index) => (
                <li
                  key={s.id}
                  onClick={() => scrollToSection(index)}
                  className={`cursor-pointer transition ${
                    activeIndex === index ? "text-[#15256E] font-semibold" : "text-gray-600 hover:text-[#15256E]"
                  }`}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN */}
        <main className="lg:col-span-3 space-y-6 md:space-y-10">
          {sections.map((section, index) => (
            <Card key={section.id} number={index + 1} title={section.title} ref={sectionRefs.current[index]}>
              {section.content}
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
};

const Card = React.forwardRef(({ number, title, children }, ref) => (
  <section ref={ref} className="bg-white rounded-2xl shadow-md p-4 md:p-6 hover:shadow-lg transition">
    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#15256E]/10 text-[#15256E] font-bold">
        {number}
      </div>
      <h2 className="text-base md:text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="text-gray-700 leading-relaxed space-y-3 md:space-y-4">{children}</div>
  </section>
));

export default Term;