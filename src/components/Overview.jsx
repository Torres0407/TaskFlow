import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./../styles/Overview.css";

const quotes = [
  "Productivity is never an accident. – Paul J. Meyer",
  "The secret of getting ahead is getting started. – Mark Twain",
  "It always seems impossible until it’s done. – Nelson Mandela",
  "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
  "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
  "Focus on being productive instead of busy. – Tim Ferriss",
  "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
  "The way to get started is to quit talking and begin doing. – Walt Disney",
  "Yall are weird - Deji man",
];

export default function Overview({user}) {
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });

  //read from localStorage
  

  // Load tasks from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Add task
const handleAddTask = () => {
  if (!newTask.trim()) return;

  const task = {
    id: Date.now(),
    title: newTask,
    description,
    image,
    date: date.toISOString().split("T")[0], // keep date from input
    progress,
  };

  const updatedTasks = [...tasks, task];
  setTasks(updatedTasks);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // save immediately

  // Reset form fields except date (optional: keep date for next task)
  setNewTask("");
  setDescription("");
  setImage(null);
  setProgress(0);
  // setDate(new Date()); // <-- remove or comment out
};

// Delete task
const handleDelete = (id) => {
  const updated = tasks.filter((task) => task.id !== id);
  setTasks(updated);
  localStorage.setItem("tasks", JSON.stringify(updated));
};

// Filter tasks by selected date (calendar selection)
const filteredTasks = tasks.filter(task => {
  const taskDate = new Date(task.date);
  return taskDate.getFullYear() === selectedDate.getFullYear() &&
         taskDate.getMonth() === selectedDate.getMonth() &&
         taskDate.getDate() === selectedDate.getDate();
});


  return (
    <div className="overview-container">
      {/* ====== LEFT + CENTER CONTENT ====== */}
      <div className="overview-main">
        {/* Greeting */}
        <div className="greeting">
          <div>
            <h1 className="greeting-title">Hi, {user?.username || "TheCreator"}</h1>
            <p className="greeting-subtitle">Let’s finish your task today!</p>
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="user-avatar"
          />
        </div>

        {/* Top Section */}
        <div className="top-section">
          <div className="running-task">
            <h2>Running Task</h2>
            <div className="task-number">{tasks.length}</div>
            <p className="task-subtext">total tasks</p>
          </div>

          <div className="activity-card">
            <h3>💡 Motivational Quote</h3>
            <div className="chart-placeholder">{quote}</div>
          </div>
        </div>

        {/* Quick Add Task */}
        <div className="quick-add">
          <h2>Quick Add Task</h2>
          <div className="quick-add-input">
            <input
              type="text"
              placeholder="Enter task title..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <textarea
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <input
              type="number"
              placeholder="Progress %"
              value={progress}
              min="0"
              max="100"
              onChange={(e) => setProgress(Number(e.target.value))}
            />
            <button onClick={handleAddTask}>
              <FaPlus /> Add
            </button>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="upcoming-tasks">
          <h2>Tasks on {selectedDate.toDateString()}</h2>
          <div className="tasks-grid">
            {filteredTasks.length === 0 && <p>No tasks for this date.</p>}

            {filteredTasks.map((task) => (
              <div key={task.id} className="task-card">
                {task.image && (
                  <img src={task.image} alt="task" className="task-thumb" />
                )}
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p className="task-deadline">
                  {new Date(task.date).toDateString()}
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill blue"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== RIGHT SIDEBAR ====== */}
      <div className="overview-sidebar">
        {/* Calendar */}
        <div className="calendar-card">
          <h2>Calendar</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>

        {/* Task Today */}
        {filteredTasks.length > 0 && (
          <div className="today-card">
            <h2>Task Today</h2>
            <h3>{filteredTasks[0].title}</h3>
            <p>{filteredTasks[0].description}</p>
            <div className="progress-bar">
              <div
                className="progress-fill blue"
                style={{ width: `${filteredTasks[0].progress}%` }}
              />
            </div>
            <p className="task-deadline">
              {new Date(filteredTasks[0].date).toDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
