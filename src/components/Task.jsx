// src/pages/TasksPage.jsx
import { useEffect, useState } from "react";
import "../styles/Task.css";
// import { supabase } from "../supabaseClient";

export default function Task({ user }) {
  const [tasks, setTasks] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
    progress: 0,
  });

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching tasks:", error);
    else setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  // Handle image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setNewTask({ ...newTask, image: reader.result });
    reader.readAsDataURL(file);
  };

  // Add task to Supabase
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const { data, error } = await supabase.from("tasks").insert([
      {
        user_id: user.id,
        title: newTask.title,
        description: newTask.description,
        due_date: newTask.date,
        progress: newTask.progress,
        image_url: newTask.image, // store image as base64
      },
    ]);

    if (error) console.error("Error adding task:", error);
    else {
      setTasks([data[0], ...tasks]);
      setNewTask({ title: "", description: "", date: "", image: null, progress: 0 });
      setFormVisible(false);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) console.error("Error deleting task:", error);
    else setTasks(tasks.filter((t) => t.id !== id));
  };

  // Handle progress change
  const handleProgress = (id, value) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, progress: value } : t
    );
    setTasks(updated);
  };

  return (
    <div className="tasks-page">
      <h2>My Tasks</h2>

      <button className="add-btn" onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? "Close Form" : "Add New Task"}
      </button>

      {formVisible && (
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button type="submit">Save Task</button>
        </form>
      )}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              {task.image_url && <img src={task.image_url} alt="task" className="task-img" />}
              <div className="task-info">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                {task.due_date && <p className="date">📅 {new Date(task.due_date).toISOString().split("T")[0]}</p>}

                <div className="progress-container">
                  <progress value={task.progress} max="100" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) => handleProgress(task.id, parseInt(e.target.value))}
                  />
                  <span>{task.progress}%</span>
                </div>

                <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
