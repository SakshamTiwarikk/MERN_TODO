import { CheckCircle2, LogOut } from "lucide-react";

const Navbar = ({ userName, onLogout }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-lg">TaskFlow</h1>
            <p className="text-sm text-secondary">
              Welcome, {userName}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-light transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
