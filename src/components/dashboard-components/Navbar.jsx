


// import React, { useState, useEffect } from "react";
// import Rectangle3 from "../../assets/images/Rectangle3.png";
// import { FiSettings, FiBell, FiX } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios"; // your axios instance

// const Navbar = () => {
//   const navigate = useNavigate();

//   // Menu & modal states
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);

//   // Default profile
//   const defaultProfile = {
//     name: "Michael",
//     email: "michael@example.com",
//     photo: Rectangle3,
//   };
//   const [profile, setProfile] = useState(defaultProfile);

//   // Loading state for API
//   const [loading, setLoading] = useState(true);

//   // Fetch student data from API
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await api.get("/v1/me");
//         if (res.data && res.data.status && res.data.data) {
//           const student = res.data.data;
//           setProfile({
//             name: `${student.firstName} ${student.lastName}`,
//             email: student.email,
//             photo: Rectangle3, // Keep default photo; user can change in modal
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching student info:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudent();
//   }, []);

//   // Menu toggles
//   const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
//   const toggleNotifications = () => setShowNotifications(!showNotifications);

//   // Open / close edit modal
//   const openEditModal = () => {
//     setShowProfileMenu(false);
//     setShowEditModal(true);
//   };
//   const closeEditModal = () => setShowEditModal(false);

//   // Input handlers
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfile((prev) => ({ ...prev, photo: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Logout
//   const handleLogout = () => {
//     localStorage.clear();
//     setProfile(defaultProfile);
//     setShowProfileMenu(false);
//     setShowEditModal(false);
//     navigate("/login");
//   };

//   // Close modal when clicking outside
//   const handleOverlayClick = (e, closeFunction) => {
//     if (e.target === e.currentTarget) {
//       closeFunction();
//     }
//   };

//   return (
//     <nav className="navbar bg-white border-b border-[#DFE6F4] px-3 sm:px-4 flex justify-between items-center">
//       {/* Left */}
//       <div className="flex items-center gap-2 sm:gap-4 min-w-0">
//         <label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </label>
//         <h1 className="text-sm sm:text-2xl font-bold truncate text-black">
//           Welcome back, {loading ? "Loading..." : profile.name} 👋
//         </h1>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-2 sm:gap-4 shrink-0 relative">
//         {/* Notifications */}
//         <button className="btn btn-ghost btn-circle" onClick={toggleNotifications}>
//           <FiBell className="w-5 h-5 text-black" />
//         </button>
//         {showNotifications && (
//           <div className="absolute top-12 right-20 bg-white shadow-lg rounded-lg p-3 w-64 z-50">
//             <p className="text-gray-600 text-sm">No new notifications</p>
//           </div>
//         )}

//         {/* Profile / Settings */}
//         <button className="btn btn-ghost btn-circle text-black" onClick={toggleProfileMenu}>
//           <FiSettings className="w-5 h-5" />
//         </button>

//         {showProfileMenu && (
//           <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-3 w-36 z-50">
//             <div className="flex flex-col gap-2">
//               <button
//                 className="text-left text-gray-700 hover:text-[#15256E]"
//                 onClick={openEditModal}
//               >
//                 Edit Profile
//               </button>
//               <button
//                 className="text-left text-gray-700 hover:text-red-600"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         )}

//         <img
//           src={profile.photo}
//           alt="Profile"
//           className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer"
//           onClick={toggleProfileMenu}
//         />
//       </div>

//       {/* Edit Profile Modal */}
//       {showEditModal && (
//         <div
//           className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50 backdrop-blur-sm"
//           onClick={(e) => handleOverlayClick(e, closeEditModal)}
//         >
//           <div className="bg-white rounded-lg w-96 p-6 relative shadow-lg">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//               onClick={closeEditModal}
//             >
//               <FiX className="w-6 h-6" />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//             <div className="flex flex-col gap-3">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={profile.name}
//                 onChange={handleInputChange}
//                 className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-[#15256E]"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={profile.email}
//                 onChange={handleInputChange}
//                 className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-[#15256E]"
//               />
//               <div>
//                 <label className="block text-gray-700 mb-1">Profile Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                   className="border rounded-lg p-2 w-full"
//                 />
//                 {profile.photo && (
//                   <img
//                     src={profile.photo}
//                     alt="Preview"
//                     className="w-20 h-20 mt-2 rounded-full object-cover border"
//                   />
//                 )}
//               </div>
//               <button
//                 className="bg-[#15256E] text-white rounded-lg p-2 mt-2 hover:bg-[#15256E]"
//                 onClick={closeEditModal}
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



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

  // Default profile
  const defaultProfile = {
    name: "Michael",
    email: "michael@example.com",
    photo: Rectangle3,
  };
  const [profile, setProfile] = useState(defaultProfile);

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
    photo: Rectangle3,
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
            photo: student.profilePicture?.url || Rectangle3,
          });
          setForm({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            photo: student.profilePicture?.url || Rectangle3,
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
    setProfile(defaultProfile);
    setShowProfileMenu(false);
    setShowEditModal(false);
    navigate("/login");
  };

  // Click outside modal
  const handleOverlayClick = (e, closeFunction) => {
    if (e.target === e.currentTarget) closeFunction();
  };

 const updateProfile = async () => {
  setLoadingSubmit(true);
  setMessage("");

  try {
    const formData = new FormData();

    // Use snake_case for API compatibility
    formData.append("first_name", form.firstName.trim() || "");
    formData.append("last_name", form.lastName.trim() || "");
    formData.append("email", form.email.trim() || "");

    // Append photo as File if changed
    if (form.photo && form.photo !== profile.photo) {
      const response = await fetch(form.photo);
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: blob.type });
      formData.append("profile_picture", file);
    }

    // Debug FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Send PATCH request
    const res = await api.patch("/v1/update/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status) {
      setProfile({
        name: `${res.data.data.firstName} ${res.data.data.lastName}`,
        email: res.data.data.email,
        photo: res.data.data.profilePicture?.url || Rectangle3,
      });
      setForm({
        firstName: res.data.data.firstName,
        lastName: res.data.data.lastName,
        email: res.data.data.email,
        photo: res.data.data.profilePicture?.url || Rectangle3,
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


  // Submit password update
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
        <h1 className="text-sm sm:text-2xl font-bold truncate text-black">
          Welcome back, {loadingProfile ? "Loading..." : profile.name} 👋
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 relative">
        <button className="btn btn-ghost btn-circle" onClick={toggleNotifications}>
          <FiBell className="w-5 h-5 text-black" />
        </button>
        {showNotifications && (
          <div className="absolute top-12 right-20 bg-white shadow-lg rounded-lg p-3 w-64 z-50">
            <p className="text-gray-600 text-sm">No new notifications</p>
          </div>
        )}

        <button className="btn btn-ghost btn-circle text-black" onClick={toggleProfileMenu}>
          <FiSettings className="w-5 h-5" />
        </button>
        {showProfileMenu && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-3 w-36 z-50">
            <div className="flex flex-col gap-2">
              <button className="text-left text-gray-700 hover:text-[#15256E]" onClick={openEditModal}>
                Edit Profile
              </button>
              <button className="text-left text-gray-700 hover:text-red-600" onClick={handleLogout}>
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

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50 backdrop-blur-sm"
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

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                className={`flex-1 py-1 rounded-t-lg ${editTab === "profile" ? "bg-[#15256E] text-white" : "bg-gray-100"}`}
                onClick={() => setEditTab("profile")}
              >
                Profile
              </button>
              <button
                className={`flex-1 py-1 rounded-t-lg ${editTab === "password" ? "bg-[#15256E] text-white" : "bg-gray-100"}`}
                onClick={() => setEditTab("password")}
              >
                Password
              </button>
            </div>

            {/* Message */}
            {message && <p className="text-sm text-green-600 mb-2">{message}</p>}

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
                  <label className="block text-gray-700 mb-1">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  {form.photo && (
                    <img
                      src={form.photo}
                      alt="Preview"
                      className="w-20 h-20 mt-2 rounded-full object-cover border"
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
