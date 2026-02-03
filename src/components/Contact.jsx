import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { firstName, lastName, email, subject, message, phone } = formData;

    if (!firstName || !lastName || !email || !subject || !message) {
      toast.error("Please fill all required fields");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address");
      return false;
    }

    // ✅ Phone validation: allow +, numbers, spaces, dashes, parentheses
    if (phone && !/^\+?[\d\s\-()]{7,20}$/.test(phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    emailjs
      .send("service_tsbfjqp", "template_8n6g0rc", formData, "W8LUTAQCleCNI4f1q")
      .then(() => {
        toast.success("Message sent successfully 🎉");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => toast.error("Failed to send message"))
      .finally(() => setLoading(false));
  };

  return (
    <section className="bg-gradient-to-br from-[#EEF2FF] to-[#F8FAFC] py-12">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* HEADER */}
        <div className="mb-5 text-center sm:text-start sm:pt-8 sm:px-3 ">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 pt-10">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-gray-600 pt-1">
            We’ll get back to you shortly
          </p>
        </div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-3xl p-6 sm:p-10 shadow-xl"
        >
          <div className="grid lg:grid-cols-12 gap-10">
            {/* FORM */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {[
                { name: "firstName", label: "First Name",placeholder:"Enter your first name" },
                { name: "lastName", label: "Last Name" ,placeholder: "Enter your last name" },
                { name: "email", label: "Email", type: "email" , placeholder: "Enter your email" },
                { name: "phone", label: "Phone Number" ,placeholder: "Enter your phone number"},
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-sm text-gray-700">{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type || "text"}
                    value={formData[field.name]}
                    placeholder={field.placeholder || ""}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-3 rounded-xl  border border-gray-200 focus:ring-2 focus:ring-[#001489]"
                  />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-700">Subject</label>
                <input
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 rounded-xl  border border-gray-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-700">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 rounded-xl  border border-gray-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="sm:col-span-2 bg-[#001489] text-white py-3 rounded-xl font-medium flex justify-center"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {/* INFO + MAP + SOCIALS */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { icon: <MdEmail />, text: "info@techprocom" },
                { icon: <MdPhone />, text: "Australia: +44 7534617780" },
                { icon: <MdPhone />, text: "UK: +61 435 976 010" },
                { icon: <MdLocationOn />, text: "3a High Street, Gillingham Kent" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl">
                  <span className="text-[#001489] text-xl">{item.icon}</span>
                  <p className="text-sm">{item.text}</p>
                </div>
              ))}

              {/* MAP */}
              <iframe
                title="map"
                className="w-full h-48 rounded-xl border"
                loading="lazy"
                src="https://www.google.com/maps?q=Gillingham%20Kent&output=embed"
              />

              {/* SOCIALS */}
              <div className="bg-white/60 p-5 rounded-xl text-center">
                <p className="text-sm font-medium mb-4 text-gray-800">Our Socials</p>

                <div className="flex justify-center gap-6 text-xl">
                  <FaFacebook className="text-[#1877F2]" />
                  <FaInstagram className="text-[#E1306C]" />
                  <FaLinkedin className="text-[#0A66C2]" />
                  <FaTiktok className="text-black" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/447351662748"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full text-white shadow-lg hover:scale-110 transition"
      >
        <FaWhatsapp size={22} />
      </a>
    </section>
  );
};

export default Contact;
