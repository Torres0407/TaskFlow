import { useState } from "react";
import { FaLock, FaSignOutAlt, FaTrash, FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode, MdEmail, MdLightMode, MdPalette } from "react-icons/md";
import "../styles/Settings.css"; // your CSS in styles folder

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(false);

  return (
    <div className={`settings-page ${darkMode ? "dark" : ""}`}>
      <h1 className="settings-title">⚙ Settings</h1>

      {/* 1️⃣ Account Settings */}
      <div className="settings-section">
        <h2>1️⃣ Account Settings</h2>

        <div className="settings-item">
          <span><FaUser /> Change Name</span>
          <input type="text" placeholder="Enter new name" />
        </div>

        <div className="settings-item">
          <span><MdEmail /> Change Email</span>
          <input type="email" placeholder="Enter new email" />
        </div>

        <div className="settings-item">
          <span><FaLock /> Change Password</span>
          <button className="btn-primary">Update</button>
        </div>

        <hr />

        <div className="settings-actions">
          <button className="btn-danger"><FaTrash /> Delete Account</button>
          <button className="btn-secondary"><FaSignOutAlt /> Logout</button>
        </div>
      </div>

      {/* 2️⃣ Appearance & Theme */}
      <div className="settings-section">
        <h2>2️⃣ Appearance & Theme</h2>

        <div className="settings-item">
          <span>{darkMode ? <MdDarkMode /> : <MdLightMode />} Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <span><MdPalette /> Theme Color</span>
          <input type="color" />
        </div>

        <div className="settings-item">
          <span>🖼 Board Background</span>
          <button className="btn-secondary">Change</button>
        </div>
      </div>

      {/* 3️⃣ Profile Settings */}
      <div className="settings-section">
        <h2>3️⃣ Profile Settings</h2>

        <div className="settings-item">
          <span>📸 Profile Picture</span>
          <input type="file" />
        </div>

        <div className="settings-item">
          <span>✍ Display Name & Bio</span>
          <button className="btn-primary">Edit</button>
        </div>

        <div className="settings-item">
          <span>🌍 Language Preference</span>
          <select>
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>

      {/* 4️⃣ Notifications */}
      <div className="settings-section">
        <h2>4️⃣ Notifications</h2>

        <div className="settings-item">
          <span><IoMdNotifications /> Task Reminders</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={taskReminders}
              onChange={() => setTaskReminders(!taskReminders)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <span>📧 Email Notifications</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <span>📱 Push Notifications</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
