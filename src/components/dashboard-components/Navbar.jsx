import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import Rectangle3 from "../../assets/images/Rectangle3.png";

const Navbar = () => {
  // ===== USER STATE =====
  const [user, setUser] = useState({
    name: "Michael",
    email: "michael@email.com",
    avatar: Rectangle3,
  });

  // ===== NOTIFICATIONS =====
  const [notifications, setNotifications] = useState([
    { id: 1, text: "🎉 Welcome to your dashboard", read: false },
    { id: 2, text: "📢 Profile updated successfully", read: false },
    { id: 3, text: "✅ New feature released", read: true },
  ]);

  // ===== UI STATE =====
  const [showNotif, setShowNotif] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const notifRef = useRef(null);
  const settingsRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // ===== CLICK OUTSIDE CLOSE =====
  useEffect(() => {
    const close = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar bg-white border-b border-[#DFE6F4] px-4 flex justify-between items-center relative">

        {/* LEFT */}
        <h1 className="text-sm sm:text-xl font-bold truncate">
          Welcome back, {user.name} 👋
        </h1>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative">

          {/* 🔔 NOTIFICATIONS */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setShowNotif(!showNotif);
                setShowSettings(false);
              }}
              className="btn btn-ghost btn-circle relative"
            >
              <FiBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-3 font-semibold border-b flex justify-between">
                  Notifications
                  <button
                    onClick={markAllRead}
                    className="text-xs text-blue-600"
                  >
                    Mark all read
                  </button>
                </div>

                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-3 text-sm ${
                      !n.read ? "bg-gray-100" : ""
                    }`}
                  >
                    {n.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ⚙️ SETTINGS */}
          <div ref={settingsRef} className="relative">
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                setShowNotif(false);
              }}
              className="btn btn-ghost btn-circle"
            >
              <FiSettings className="w-5 h-5" />
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    setEditProfile(true);
                    setShowSettings(false);
                  }}
                  className="p-3 w-full text-left hover:bg-gray-100 flex items-center gap-2"
                >
                  <FiUser /> Edit Profile
                </button>

                <button className="p-3 w-full text-left text-red-500 hover:bg-gray-100 flex items-center gap-2">
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>

          {/* 👤 AVATAR */}
          <img
            src={user.avatar}
            alt="Profile"
            onClick={() => setEditProfile(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer"
          />
        </div>
      </nav>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {editProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

            <input
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Full Name"
            />

            <input
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Email"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditProfile(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditProfile(false)}
                className="px-4 py-2 bg-[#15256E] text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
