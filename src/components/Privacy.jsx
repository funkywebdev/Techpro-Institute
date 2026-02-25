import React, { useRef, useState, useEffect } from "react";
import { FiMail, FiPhone, FiMenu } from "react-icons/fi";

const sections = [
  {
    id: "Information We Collect",
    title: "Personal Information",
    content: (
      <p>
        Name, email, phone number, and other details provided during registration or inquiries.
        Browser type, device information, and website usage data collected through cookies or analytics tools.
      </p>
    ),
  },
  {
    id: "How We Use Your Information",
    title: "How We Use Your Information",
    content: (
      <p>
        1. To provide and improve our services.<br />
        2. To communicate with you regarding updates, promotions, or inquiries.<br />
        3. To ensure website security and functionality.
      </p>
    ),
  },
  { id: "use", title: "Use of Services", content: <p>Use our services for lawful purposes only. Avoid harming TechPro, its users, or its reputation.</p> },
  { id: "accounts", title: "Registration & Accounts", content: <p>Some services require an account. Keep your credentials safe. Notify us if unauthorized access occurs. Unauthorized copying, hacking, phishing, spamming, or malware distribution is prohibited.</p> },
  { id: "Cookies and Tracking Technologies", title: "Cookies and Tracking Technologies", content: <p>We use cookies and similar technologies to enhance user experience and gather website analytics. You can disable cookies through your browser settings.</p> },
  { id: "Data Security", title: "Data Security", content: <p>We implement industry-standard measures to protect your data from unauthorized access, loss, or misuse. However, no online transmission is completely secure.</p> },
  { id: "Your Rights", title: "Your Rights", content: <p>You have the right to: Access, update, or delete your personal information. Opt out of marketing communications. For any requests, contact us at info@techproinstitute.org</p> },
  { id: "Third-Party Services", title: "Third-Party Services", content: <p>Our website may link to external services or platforms. TechPro is not responsible for their privacy practices. Please review their privacy policies.</p> },
  { id: "Policy Updates", title: "Policy Updates", content: <p>This Privacy Policy may be updated periodically. Continued use of our services constitutes acceptance of the revised terms. For questions or concerns, contact the number below on contact us.</p> },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FiMail className="text-[#15256E]" />
          <a href="mailto:info@techproinstitute.org" className="text-[#15256E] font-medium hover:underline">info@techproinstitute.org</a>
        </div>
        <div className="flex items-center gap-2"><FiPhone className="text-[#15256E]" /><span>UK: +44 7534 617 780</span></div>
        <div className="flex items-center gap-2"><FiPhone className="text-[#15256E]" /><span>Australia: +61 435 976 010</span></div>
        <div className="flex items-center gap-2"><FiPhone className="text-[#15256E]" /><span>Nigeria: +234 808 647 8810</span></div>
      </div>
    ),
  },
];

const Privacy = () => {
  const sectionRefs = useRef(sections.map(() => React.createRef()));
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to section with sticky header offset
  const scrollToSection = (index) => {
    const headerOffset = window.innerWidth < 1024 ? 50 : 100; // mobile vs desktop header height
    const element = sectionRefs.current[index].current;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  // Update active section on scroll
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
    <div id="privacy" className="bg-[#f7f9fc] min-h-screen">

      {/* HEADER */}
      <div className="bg-[#15256E] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
          <p className="mb-10"></p>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 relative inline-block">
            Privacy Policy
            <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] rounded-full opacity-70"></span>
          </h1>
          <p className="max-w-2xl mx-auto text-[17px] text-lg opacity-90">
            At TechPro Institute, we protect your privacy and explain how we collect and use your personal information.
          </p>
        </div>
      </div>

      {/* Mobile sticky section header */}
      {activeIndex !== null && (
        <div className="lg:hidden sticky top-0 bg-white px-4 py-2 shadow z-10 text-sm font-medium text-[#15256E]">
          {sections[activeIndex].title}
        </div>
      )}


      {/* MOBILE "ON THIS PAGE" list */}
<div className="lg:hidden px-4 py-3">
  <div className="bg-white rounded-xl shadow p-3 space-y-1">
    {sections.map((s, index) => (
      <div
        key={s.id}
        onClick={() => scrollToSection(index)}
        className={`cursor-pointer transition px-2 py-1 rounded ${
          activeIndex === index
            ? "bg-[#15256E]/10 text-[#15256E] font-medium"
            : "text-gray-600 hover:text-[#15256E]"
        }`}
      >
        {s.title}
      </div>
    ))}
  </div>
</div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-12">

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
                    activeIndex === index
                      ? "text-[#15256E] font-semibold"
                      : "text-gray-600 hover:text-[#15256E]"
                  }`}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN */}
        <main className="lg:col-span-3 space-y-4 md:space-y-8">
          {sections.map((section, index) => (
            <section
              key={section.id}
              ref={sectionRefs.current[index]}
              className="bg-white rounded-2xl shadow-md p-4 md:p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 mb-2 md:mb-4">
                <div className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#15256E]/10 text-[#15256E] font-bold">
                  {index + 1}
                </div>
                <h2 className="text-sm md:text-lg font-semibold text-gray-900">{section.title}</h2>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-3 md:space-y-4 text-justify">
                {section.content}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Privacy;