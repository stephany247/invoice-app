import { Dot, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import avatarImg from "../assets/avatar.png";
import logo from "../assets/logo.svg";
import { IoIosMoon } from "react-icons/io";
import { FaCircle } from "react-icons/fa";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="relative z-30 bg-sidebar flex items-center justify-between h-18 md:h-20">
      {/* Logo block */}
      <div className="w-20 h-full bg-primary rounded-r-md flex items-center justify-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary-light rounded-tl-md" />

        <img src={logo} alt="Logo" className="relative z-10 w-7" />
      </div>

      {/* Right side */}
      <div className="flex items-center h-full">
        {/* Theme button */}
        <button
          onClick={toggleTheme}
          className="h-full px-2 flex items-center justify-center w-16 hover:opacity-80 transition"
        >
          {theme === "light" ? (
            <IoIosMoon className="text-primary-light size-7" />
          ) : (
            <FaCircle className="size-3 text-[#858BB2]" />
          )}
        </button>

        {/* Divider */}
        <div className="h-full w-px bg-[#494E6E]" />

        {/* Avatar */}
        <button className="h-full px-5 flex items-center justify-center w-20">
          <img src={avatarImg} alt="User" className="w-full h-auto rounded-full" />
        </button>
      </div>
    </nav>
  );
}
