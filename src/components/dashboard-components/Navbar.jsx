import React, { useState } from "react";
import Rectangle3 from "../../assets/images/Rectangle3.png";
import { FiSettings, FiBell, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Menu & modal states
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  // Default profile
  const defaultProfile = {
    name: "Michael",
    email: "michael@example.com",
    photo: Rectangle3,
  };
  const [profile, setProfile] = useState(defaultProfile);

  // Menu toggles
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  // Open / close modals
  const openEditModal = () => {
    setShowProfileMenu(false);
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const openAccountSettings = () => {
    setShowProfileMenu(false);
    setShowAccountSettings(true);
  };
  const closeAccountSettings = () => setShowAccountSettings(false);

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    setProfile(defaultProfile);
    setShowProfileMenu(false);
    setShowEditModal(false);
    setShowAccountSettings(false);
    navigate("/login"); // replace with your login route
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e, closeFunction) => {
    if (e.target === e.currentTarget) {
      closeFunction();
    }
  };

  return (
    <nav className="navbar bg-white border-b border-[#DFE6F4] px-3 sm:px-4 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
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
        <h1 className="text-sm sm:text-2xl font-bold truncate">
          Welcome back, {profile.name} 👋
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 relative">
        {/* Notifications */}
        <button className="btn btn-ghost btn-circle" onClick={toggleNotifications}>
          <FiBell className="w-5 h-5" />
        </button>
        {showNotifications && (
          <div className="absolute top-12 right-20 bg-white shadow-lg rounded-lg p-3 w-64 z-50">
            <p className="text-gray-600 text-sm">No new notifications</p>
          </div>
        )}

        {/* Profile / Settings */}
        <button className="btn btn-ghost btn-circle" onClick={toggleProfileMenu}>
          <FiSettings className="w-5 h-5" />
        </button>

        {showProfileMenu && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-3 w-48 z-50">
            <div className="flex flex-col gap-2">
              <button
                className="text-left text-gray-700 hover:text-[#15256E]"
                onClick={openEditModal}
              >
                Edit Profile
              </button>
              <button
                className="text-left text-gray-700 hover:text-[#15256E]"
                onClick={openAccountSettings}
              >
                Account Settings
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

        <img
          src={profile.photo}
          alt="Profile"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer"
          onClick={toggleProfileMenu}
        />
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0  bg-opacity-20 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={(e) => handleOverlayClick(e, closeEditModal)}
        >
          <div className="bg-white rounded-lg w-96 p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeEditModal}
            >
              <FiX className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={profile.name}
                onChange={handleInputChange}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-[#15256E]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleInputChange}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-[#15256E]"
              />
              <div>
                <label className="block text-gray-700 mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="border rounded-lg p-2 w-full"
                />
                {profile.photo && (
                  <img
                    src={profile.photo}
                    alt="Preview"
                    className="w-20 h-20 mt-2 rounded-full object-cover border"
                  />
                )}
              </div>
              <button
                className="bg-[#15256E] text-white rounded-lg p-2 mt-2 hover:bg-[#15256E]"
                onClick={closeEditModal}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Settings Modal */}
      {showAccountSettings && (
        <div
          className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={(e) => handleOverlayClick(e, closeAccountSettings)}
        >
          <div className="bg-white rounded-lg w-96 p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeAccountSettings}
            >
              <FiX className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <div className="flex flex-col gap-3">
              <button className="border p-2 rounded hover:bg-gray-100 text-left">
                Change Password
              </button>
              <button className="border p-2 rounded hover:bg-gray-100 text-left">
                Manage Email / Phone
              </button>
              <button className="border p-2 rounded hover:bg-gray-100 text-left">
                Two-Factor Authentication
              </button>
              <button className="border p-2 rounded hover:bg-gray-100 text-left">
                Privacy & Notifications
              </button>
              <button className="border p-2 rounded hover:bg-red-100 text-left text-red-600">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
