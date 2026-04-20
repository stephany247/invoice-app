import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import avatarImg from "../assets/avatar.png";
import logo from "../assets/logo.svg";
import { IoIosMoon } from "react-icons/io";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-sidebar flex items-center justify-between h-20">
      {/* Logo block */}
      <div className="w-20 h-full bg-primary rounded-r-[20px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary-light rounded-tl-[20px]" />

        <img src={logo} alt="Logo" className="relative z-10 w-7" />
      </div>

      {/* Right side */}
      <div className="flex items-center h-full pr-4">
        {/* Theme button */}
        <button
          onClick={toggleTheme}
          className="h-full px-6 flex items-center justify-center w-16 hover:opacity-80 transition"
        >
          {theme === "light" ? (
            <IoIosMoon className="text-primary-light size-7" />
          ) : (
            <Sun className="size-5" />
          )}
        </button>

        {/* Divider */}
        <div className="h-full w-px bg-[#979797]" />

        {/* Avatar */}
        <button className="h-full px-6 flex items-center justify-center w-16">
          <img src={avatarImg} alt="User" className="w-8 h-8 rounded-full" />
        </button>
      </div>
    </nav>
  );
}
