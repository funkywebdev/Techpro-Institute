



import React, { useState, useEffect } from "react";
import Rectangle3 from "../../assets/images/Rectangle3.png";
import { FiSettings, FiBell, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // your axios instance

const Navbar = () => {
  const navigate = useNavigate();

  // Menu & modal states
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTab, setEditTab] = useState("profile"); // 'profile' or 'password'

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photo: null,
  });

  // Loading states
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Success/Error messages
  const [message, setMessage] = useState("");

  // Local form states
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: null,
  });

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get("/v1/me");
        if (res.data && res.data.status && res.data.data) {
          const student = res.data.data;
          setProfile({
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            photo: student.profilePicture?.url || null,
          });
          setForm({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            photo: student.profilePicture?.url || null,
          });
        }
      } catch (err) {
        console.error("Error fetching student info:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchStudent();
  }, []);

  // Toggle menus
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  // Open/close modal
  const openEditModal = () => {
    setShowProfileMenu(false);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setMessage("");
    setPasswordForm({ old_password: "", new_password: "", new_password_confirmation: "" });
  };

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    setProfile({ name: "", email: "", photo: null });
    setShowProfileMenu(false);
    setShowEditModal(false);
    navigate("/login");
  };

  // Click outside modal
  const handleOverlayClick = (e, closeFunction) => {
    if (e.target === e.currentTarget) closeFunction();
  };

  // Update profile
  const updateProfile = async () => {
    setLoadingSubmit(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("first_name", form.firstName.trim() || "");
      formData.append("last_name", form.lastName.trim() || "");
      formData.append("email", form.email.trim() || "");

      if (form.photo && form.photo !== profile.photo) {
        const response = await fetch(form.photo);
        const blob = await response.blob();
        const file = new File([blob], "profile.jpg", { type: blob.type });
        formData.append("profile_picture", file);
      }

      const res = await api.patch("/v1/update/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status) {
        setProfile({
          name: `${res.data.data.firstName} ${res.data.data.lastName}`,
          email: res.data.data.email,
          photo: res.data.data.profilePicture?.url || null,
        });
        setForm({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          email: res.data.data.email,
          photo: res.data.data.profilePicture?.url || null,
        });
        setMessage("Profile updated successfully!");
      } else {
        setMessage(res.data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setMessage(
        err.response?.data?.message || "Failed to update profile. Please check your input."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  const updatePassword = async () => {
    setLoadingSubmit(true);
    setMessage("");
    try {
      const res = await api.put("v1/update-password", passwordForm);
      if (res.data.status) {
        setMessage("Password updated successfully!");
        setPasswordForm({ old_password: "", new_password: "", new_password_confirmation: "" });
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to update password.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="navbar bg-white border-b border-[#DFE6F4] px-3 sm:px-4 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center min-w-0 gap-2 sm:gap-4">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <h1 className="text-sm font-bold text-black truncate sm:text-2xl">
          Welcome back, {loadingProfile ? "Loading..." : profile.name} 👋
        </h1>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="btn btn-ghost btn-circle" onClick={toggleNotifications}>
          <FiBell className="w-5 h-5 text-black" />
        </button>
        {showNotifications && (
          <div className="absolute z-50 w-64 p-3 bg-white rounded-lg shadow-lg top-12 right-20">
            <p className="text-sm text-gray-600">No new notifications</p>
          </div>
        )}

        <button className="text-black btn btn-ghost btn-circle" onClick={toggleProfileMenu}>
          <FiSettings className="w-5 h-5" />
        </button>
        {showProfileMenu && (
          <div className="absolute right-0 z-50 p-3 bg-white rounded-lg shadow-lg top-12 w-36">
            <div className="flex flex-col gap-2">
              <button
                className="text-left text-gray-700 hover:text-[#15256E] transition-colors duration-300"
                onClick={openEditModal}
              >
                Edit Profile
              </button>
              <button
                className="text-left text-gray-700 hover:text-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Profile Image or Initials */}
        {profile.photo ? (
          <img
            src={profile.photo}
            alt="Profile"
            className="object-cover rounded-full cursor-pointer w-9 h-9 sm:w-10 sm:h-10"
            onClick={toggleProfileMenu}
          />
        ) : (
          <div
            onClick={toggleProfileMenu}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#15256E] text-white flex items-center justify-center font-bold cursor-pointer"
          >
            {getInitials(profile.name)}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 backdrop-blur-sm"
          onClick={(e) => handleOverlayClick(e, closeEditModal)}
        >
          <div className="relative p-6 bg-white rounded-lg shadow-lg w-96">
            <button
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-800"
              onClick={closeEditModal}
            >
              <FiX className="w-6 h-6" />
            </button>

            <h2 className="mb-4 text-xl font-bold">Edit Profile</h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                className={`flex-1 py-1 rounded-t-lg ${
                  editTab === "profile" ? "bg-[#15256E] text-white" : "bg-gray-100"
                }`}
                onClick={() => setEditTab("profile")}
              >
                Profile
              </button>
              <button
                className={`flex-1 py-1 rounded-t-lg ${
                  editTab === "password" ? "bg-[#15256E] text-white" : "bg-gray-100"
                }`}
                onClick={() => setEditTab("password")}
              >
                Password
              </button>
            </div>

            {/* Message */}
            {message && <p className="mb-2 text-sm text-green-600">{message}</p>}

            {/* Profile Form */}
            {editTab === "profile" && (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#15256E]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#15256E]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#15256E]"
                />
                <div>
                  <label className="block mb-1 text-gray-700">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {form.photo && (
                    <img
                      src={form.photo}
                      alt="Preview"
                      className="object-cover w-20 h-20 mt-2 border rounded-full"
                    />
                  )}
                </div>
                <button
                  className="bg-[#15256E] text-white rounded-lg p-2 mt-2 hover:bg-[#0F1F5E]"
                  onClick={updateProfile}
                  disabled={loadingSubmit}
                >
                  {loadingSubmit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {/* Password Form */}
            {editTab === "password" && (
              <div className="flex flex-col gap-3">
                <input
                  type="password"
                  name="old_password"
                  placeholder="Old Password"
                  value={passwordForm.old_password}
                  onChange={handlePasswordChange}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#15256E]"
                />
                <input
                  type="password"
                  name="new_password"
                  placeholder="New Password"
                  value={passwordForm.new_password}
                  onChange={handlePasswordChange}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#15256E]"
                />
                <input
                  type="password"
                  name="new_password_confirmation"
                  placeholder="Confirm New Password"
                  value={passwordForm.new_password_confirmation}
                  onChange={handlePasswordChange}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#15256E]"
                />
                <button
                  className="bg-[#15256E] text-white rounded-lg p-2 mt-2 hover:bg-[#0F1F5E]"
                  onClick={updatePassword}
                  disabled={loadingSubmit}
                >
                  {loadingSubmit ? "Updating..." : "Update Password"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
