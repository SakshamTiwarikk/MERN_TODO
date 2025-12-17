import {
  Pencil,
  Trash2,
  Calendar,
  Clock,
} from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex justify-between">
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>
        {task.description && (
          <p className="text-secondary text-sm mt-1">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-4 mt-4 text-sm text-secondary">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {task.status}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task._id, e.target.value)
          }
          className="border rounded-lg px-3 py-1 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={() => onEdit(task)}
          className="hover:text-primary"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:opacity-80"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
