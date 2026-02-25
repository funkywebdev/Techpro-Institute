import React, { useRef, useState, useEffect } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

const sections = [
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FiMail className="text-[#15256E]" />
          <a
            href="mailto:info@techproinstitute.org"
            className="text-[#15256E] font-medium hover:underline"
          >
            info@techproinstitute.org
          </a>
        </div>
        <div>Address: 3a High Street, Gillingham Kent</div>
        <div className="flex items-center gap-2">
          <FiPhone className="text-[#15256E]" />
          <span>Australia: +61 435 976 010</span>
        </div>
      </div>
    ),
  },
  {
    id: "copyright",
    title: "Copyright and Ownership",
    content: (
      <p>
        All content on this website, including but not limited to text,
        graphics, logos, images, videos, and software, is protected by
        copyright, trademark, and other intellectual property laws. It is the
        exclusive property of TechPro or its licensors. Unauthorized
        reproduction, distribution, or use of this content is strictly
        prohibited.
      </p>
    ),
  },
  {
    id: "terms",
    title: "Terms of Use",
    content: (
      <p>
        Your use of this website constitutes acceptance of the Terms of Use. If
        you do not agree with any of these terms, please refrain from using
        the site.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability Disclaimer",
    content: (
      <p>
        TechPro makes every effort to ensure the accuracy and completeness of
        the information provided on this website. However, we assume no
        responsibility for any errors, inaccuracies, or omissions. TechPro is
        not liable for any direct, indirect, or consequential damages resulting
        from your use of the site or services.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    content: (
      <p>
        Our website may contain links to third-party websites. TechPro does not
        control or endorse these sites and is not responsible for their content
        or privacy practices.
      </p>
    ),
  },
  {
    id: "amendments",
    title: "Amendments",
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FiMail className="text-[#15256E]" />
          <a
            href="mailto:info@techproinstitute.org"
            className="text-[#15256E] font-medium hover:underline"
          >
            info@techproinstitute.org
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="text-[#15256E]" />
          <span>UK: +44 7534 617 780</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="text-[#15256E]" />
          <span>Australia: +61 435 976 010</span>
        </div>
        <div className="flex items-center gap-2">
          <FiPhone className="text-[#15256E]" />
          <span>Nigeria: +234 808 647 8810</span>
        </div>
      </div>
    ),
  },
];

const Legal = () => {
  const sectionRefs = useRef(sections.map(() => React.createRef()));
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = (index) => {
    sectionRefs.current[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
    <div id="legal" className="bg-[#f7f9fc] min-h-screen">
      <div className="bg-[#15256E] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
             <p className="mb-10"></p>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 relative inline-block">
        Legal Notice
        <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] rounded-full opacity-70"></span>
        </h1>
        <p className="max-w-2xl mx-auto text-[17px] text-lg opacity-90">
        This page provides legal information, disclaimers, and copyright details for TechPro Institute.
        </p>
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

export default Legal;