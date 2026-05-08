
import React, { useState, useEffect, useRef } from "react";
import { FiSettings, FiX, FiLogOut, FiUser, FiLock, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  /* ── States ─────────────────────────────────────── */
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTab, setEditTab] = useState("profile");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  /* ── Profile ────────────────────────────────────── */
  const [profile, setProfile] = useState({ name: "", email: "", photo: null });

  /* ── Form ───────────────────────────────────────── */
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", photo: null });

  /* ── Password ───────────────────────────────────── */
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  /* ── Close menu on outside click ────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Fetch user ─────────────────────────────────── */
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get("/v1/me");
        if (res.data?.status && res.data?.data) {
          const s = res.data.data;
          const data = {
            firstName: s.firstName,
            lastName: s.lastName,
            email: s.email,
            photo: s.profilePicture?.url || null,
          };
          setProfile({ name: `${s.firstName} ${s.lastName}`, email: s.email, photo: data.photo });
          setForm(data);
        }
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchStudent();
  }, []);

  /* ── Helpers ────────────────────────────────────── */
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const openEditModal = () => { setShowProfileMenu(false); setShowEditModal(true); };

  const closeEditModal = () => {
    setShowEditModal(false);
    setMessage({ text: "", type: "" });
    setPasswordForm({ old_password: "", new_password: "", new_password_confirmation: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((prev) => ({ ...prev, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.clear();
    setProfile({ name: "", email: "", photo: null });
    navigate("/login");
  };

  /* ── Update profile ─────────────────────────────── */
  const updateProfile = async () => {
    setLoadingSubmit(true);
    setMessage({ text: "", type: "" });
    try {
      const formData = new FormData();
      formData.append("first_name", form.firstName.trim());
      formData.append("last_name", form.lastName.trim());
      formData.append("email", form.email.trim());
      if (form.photo && form.photo !== profile.photo) {
        const blob = await (await fetch(form.photo)).blob();
        formData.append("profile_picture", new File([blob], "profile.jpg", { type: blob.type }));
      }
      const res = await api.patch("/v1/update/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.status) {
        const d = res.data.data;
        setProfile({ name: `${d.firstName} ${d.lastName}`, email: d.email, photo: d.profilePicture?.url || null });
        setForm({ firstName: d.firstName, lastName: d.lastName, email: d.email, photo: d.profilePicture?.url || null });
        setMessage({ text: "Profile updated successfully.", type: "success" });
      } else {
        setMessage({ text: res.data.message || "Failed to update profile.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Profile update failed.", type: "error" });
    } finally {
      setLoadingSubmit(false);
    }
  };

  /* ── Update password ────────────────────────────── */
  const updatePassword = async () => {
    setLoadingSubmit(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await api.put("/v1/update-password", passwordForm);
      if (res.data.status) {
        setMessage({ text: "Password updated successfully.", type: "success" });
        setPasswordForm({ old_password: "", new_password: "", new_password_confirmation: "" });
      }
    } catch (err) {
      setMessage({ text: "Failed to update password.", type: "error" });
    } finally {
      setLoadingSubmit(false);
    }
  };

  /* ── Render ─────────────────────────────────────── */
  return (
    <>
      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 shadow-sm sm:px-8">

        {/* Left — Welcome */}
        <div className="flex items-center min-w-0 gap-3">
          <label htmlFor="my-drawer" className="btn btn-ghost btn-sm btn-square lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <div className="hidden w-px h-5 bg-gray-200 sm:block" />

          <div className="min-w-0">
            {loadingProfile ? (
              <div className="w-40 h-4 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className="sm:text-[22px] text-[16px] font-bold text-gray-800 truncate">
                Welcome back, <span className="text-[#15256E]">{profile.name}👋</span>
              </p>
            )}
           
          </div>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0" ref={menuRef}>

          {/* Home */}
          <button
            onClick={() => navigate("/landingpage")}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#15256E] hover:bg-[#15256E]/5 transition-colors"
            title="Home"
          >
            <FiHome className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowProfileMenu((v) => !v)}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#15256E] hover:bg-[#15256E]/5 transition-colors"
            title="Settings"
          >
            <FiSettings className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 mx-1 bg-gray-200" />

          {/* Avatar */}
          <button
            onClick={() => setShowProfileMenu((v) => !v)}
            className="flex items-center gap-2 py-1 pl-1 pr-2 transition-colors rounded-lg hover:bg-gray-50 group"
          >
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="object-cover w-8 h-8 rounded-lg shadow-sm ring-2 ring-white" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#15256E] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                {getInitials(profile.name)}
              </div>
            )}
            <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-4 sm:right-8 top-[68px] z-50 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 overflow-hidden">
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-semibold text-gray-800 truncate">{profile.name}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{profile.email}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setShowProfileMenu(false); navigate("/landingpage"); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiHome className="w-4 h-4 text-gray-400" />
                  Home
                </button>
                <button
                  onClick={openEditModal}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiUser className="w-4 h-4 text-gray-400" />
                  Edit Profile
                </button>
              </div>

              <div className="py-1 border-t border-gray-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Edit Modal ── */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeEditModal(); }}
        >
          <div className="relative w-full max-w-md mx-4 overflow-hidden bg-white shadow-2xl rounded-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Account Settings</h2>
                <p className="text-xs text-gray-400 mt-0.5">Manage your profile and security</p>
              </div>
              <button
                onClick={closeEditModal}
                className="flex items-center justify-center w-8 h-8 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {["profile", "password"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setEditTab(tab); setMessage({ text: "", type: "" }); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all border-b-2 ${
                    editTab === tab
                      ? "border-[#15256E] text-[#15256E]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "profile" ? <FiUser className="w-3.5 h-3.5" /> : <FiLock className="w-3.5 h-3.5" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="px-6 py-5">

              {/* Feedback message */}
              {message.text && (
                <div className={`mb-4 px-3.5 py-3 rounded-lg text-sm font-medium ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-red-50 text-red-600 border border-red-100"
                }`}>
                  {message.text}
                </div>
              )}

              {/* Profile form */}
              {editTab === "profile" && (
                <div className="flex flex-col gap-3.5">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15256E]/20 focus:border-[#15256E] transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15256E]/20 focus:border-[#15256E] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15256E]/20 focus:border-[#15256E] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Profile Photo</label>
                    <div className="flex items-center gap-4">
                      {form.photo ? (
                        <img src={form.photo} alt="Preview" className="object-cover w-12 h-12 border border-gray-200 rounded-xl" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#15256E]/10 flex items-center justify-center">
                          <FiUser className="w-5 h-5 text-[#15256E]" />
                        </div>
                      )}
                      <label className="flex-1 cursor-pointer">
                        <div className="px-3.5 py-2.5 text-sm text-center border border-dashed border-gray-300 rounded-lg hover:border-[#15256E] hover:bg-[#15256E]/5 text-gray-500 hover:text-[#15256E] transition-all">
                          Choose photo
                        </div>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={updateProfile}
                    disabled={loadingSubmit}
                    className="mt-1 w-full bg-[#15256E] hover:bg-[#1a2d85] text-white font-medium text-sm py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingSubmit ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                        </svg>
                        Saving…
                      </span>
                    ) : "Save Changes"}
                  </button>
                </div>
              )}

              {/* Password form */}
              {editTab === "password" && (
                <div className="flex flex-col gap-3.5">
                  {[
                    { name: "old_password", label: "Current Password", placeholder: "Enter current password" },
                    { name: "new_password", label: "New Password", placeholder: "At least 8 characters" },
                    { name: "new_password_confirmation", label: "Confirm New Password", placeholder: "Repeat new password" },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
                      <input
                        type="password"
                        name={name}
                        value={passwordForm[name]}
                        onChange={handlePasswordChange}
                        placeholder={placeholder}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15256E]/20 focus:border-[#15256E] transition-all"
                      />
                    </div>
                  ))}

                  <button
                    onClick={updatePassword}
                    disabled={loadingSubmit}
                    className="mt-1 w-full bg-[#15256E] hover:bg-[#1a2d85] text-white font-medium text-sm py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loadingSubmit ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                        </svg>
                        Updating…
                      </span>
                    ) : "Update Password"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;