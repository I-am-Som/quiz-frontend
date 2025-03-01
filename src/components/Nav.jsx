import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Nav() {
    const [user, setUser] = useState("User");
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) setUser(storedUser);
    }, []);

    return (
        <nav className="w-full h-16 fixed top-0 left-0 flex justify-between items-center px-8 bg-yellow-500 z-10">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex justify-center items-center">
                    <img src="/brain.webp" alt="MindSpark Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-2xl font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    MindSpark
                </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex h-full items-center space-x-6">
                {[
                    { to: "/", label: "Home" },
                    { to: "/searchquiz", label: "Quiz Cards" },
                    { to: "/savedquizzes", label: "Saved Quizzes" }
                ].map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`h-full flex justify-center items-center p-3 font-semibold transition-all 
                            ${location.pathname === item.to ? "bg-yellow-400 text-slate-700" : "text-slate-800"}
                            hover:bg-yellow-400 hover:text-slate-700 active:bg-slate-950`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* User Profile/Login Section */}
            <Link
                to="/login"
                className="h-full flex justify-center items-center p-3 font-semibold text-slate-800 hover:bg-yellow-400 hover:text-slate-700 active:bg-slate-950 transition-all ml-auto"
            >
                {user}
            </Link>
        </nav>
    );
}

export default Nav;
