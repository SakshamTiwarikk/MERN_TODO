import { X } from "lucide-react";
import { useState } from "react";

const NewTaskModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate({ title, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Create New Task
          </h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Title
            </label>
            <input
              className="input mt-1"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Description (optional)
            </label>
            <textarea
              className="input mt-1 min-h-[100px]"
              placeholder="Add more details..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary px-5"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
