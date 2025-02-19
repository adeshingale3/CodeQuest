
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Trophy, UserRound, Code2, LogOut } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Will be implemented with backend
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b glassmorphism">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="text-xl font-semibold text-primary">
            CodeQuest
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <Code2 className="w-5 h-5" />
            </Link>
            <Link
              to="/leaderboard"
              className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <Trophy className="w-5 h-5" />
            </Link>
            <Link
              to="/profile"
              className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
            >
              <UserRound className="w-5 h-5" />
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
