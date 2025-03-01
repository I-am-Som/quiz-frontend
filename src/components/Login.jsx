import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const imgURL = "https://cdn.pixabay.com/photo/2019/06/14/09/57/scrabble-4273254_1280.jpg"; 
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error messages

        try {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store username in localStorage
                localStorage.setItem("username", data.username);
                navigate("/"); // Redirect to home page
            } else {
                setError(data.message || "Invalid email or password!");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div 
            className="h-screen w-screen flex justify-center items-center relative px-4"
            style={{
                backgroundImage: `url(${imgURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 w-full max-w-[400px] rounded-xl bg-white/10 backdrop-blur-xl shadow-2xl flex flex-col justify-center items-center gap-6 p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <form className="w-full flex flex-col items-center gap-5" onSubmit={handleLogin}>
                    <div className="w-full">
                        <label htmlFor="email" className="block text-white mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 w-full rounded-lg px-4 border border-gray-300 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md placeholder-gray-300"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="block text-white mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 w-full rounded-lg px-4 border border-gray-300 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md placeholder-gray-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-12 w-full bg-yellow-400 text-black font-semibold rounded-lg hover:bg-black hover:text-white active:bg-gray-400 shadow-md transition-all"
                    >
                        Login
                    </button>
                </form>

                <div className="text-white text-sm opacity-80">
                    <a href="#" className="hover:underline">Forgot Password?</a>
                </div>
            </div>
        </div>  
    );
}

export default Login;
