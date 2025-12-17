import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  ListTodo,
  X,
} from "lucide-react";

const Tasks = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  // Create
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Edit
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= API ================= */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      setShowModal(false);
      fetchTasks();
    } catch {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id) => {
    try {
      await api.put(`/tasks/${id}`, {
        title: editingTitle,
        description: editingDescription,
      });
      setEditingId(null);
      setEditingTitle("");
      setEditingDescription("");
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch {
      setError("Failed to update status");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ================= STATS ================= */
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-light">
      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h1 className="font-semibold text-lg">TaskFlow</h1>
              <p className="text-sm text-secondary">
                Your productivity dashboard
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-light transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Tasks" value={total} icon={ListTodo} />
          <StatCard title="Pending" value={pending} icon={Clock} />
          <StatCard title="Completed" value={completed} icon={CheckCircle2} />
        </div>

        {/* HEADER ROW */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-secondary">Loading tasks...</p>}

        {/* TASK LIST */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex justify-between"
            >
              <div className="flex-1">
                {editingId === task._id ? (
                  <>
                    <input
                      className="input mb-2"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                    />
                    <textarea
                      className="input min-h-[80px]"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <h3
                      className={`font-semibold text-lg ${
                        task.status === "completed"
                          ? "line-through text-secondary"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-secondary text-sm mt-1">
                        {task.description}
                      </p>
                    )}
                  </>
                )}

                <span className="text-sm text-secondary mt-2 inline-block">
                  Status: {task.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                {editingId === task._id ? (
                  <button
                    onClick={() => updateTask(task._id)}
                    className="text-green-600 text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(task._id);
                      setEditingTitle(task.title);
                      setEditingDescription(task.description || "");
                    }}
                    className="hover:text-primary"
                  >
                    <Pencil size={16} />
                  </button>
                )}

                <button
                  onClick={() => toggleStatus(task)}
                  className="text-secondary text-sm"
                >
                  {task.status === "completed" ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:opacity-80"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {!loading && tasks.length === 0 && (
            <p className="text-secondary text-center">
              No tasks yet. Create one!
            </p>
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-scale-in">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Create New Task</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-secondary hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Title</label>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium">
                Description <span className="text-secondary">(optional)</span>
              </label>
              <textarea
                className="input min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                disabled={!title.trim()}
                className={`px-5 py-2 rounded-lg text-white ${
                  title.trim()
                    ? "bg-primary hover:opacity-90"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <div className="flex justify-between items-center">
      <p className="text-sm text-secondary">{title}</p>
      <Icon size={18} className="text-secondary" />
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Tasks;
