import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/freepik__pessoa-sorridente-de-terno-sentada-em-cadeira-de-e__35244.png";

export default function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError(null);

      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro no login");
      }

      navigate("/Main");
      localStorage.setItem("token", data.token);

      console.log("Login sucesso", data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-600 text-black md:gap-5">
      <div className="w-300 ml-5 p-6 bg-slate-50 rounded-md flex flex-col gap-5">
        <span>
          <h5 className="text-xl font-bold">Welcome to</h5>
          <h1 className="text-3xl font-bold">KANBAN APP</h1>
        </span>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md border-2 border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md border-2 border-blue-500"
          />

          <input
            type="submit"
            value="Login"
            className="py-2 px-3 bg-blue-700 text-white rounded-md hover:bg-blue-900"
          />
        </form>

        {error && <p className="text-red-600">{error}</p>}

        <p>
          Don't have an account?{" "}
          <Link
            to="/Register"
            className="text-blue-500 hover:underline hover:text-blue-700"
          >
            Register
          </Link>
        </p>
      </div>

      <img
        src={image}
        alt=""
        className="hidden md:block md:w-full md:h-screen"
      />
    </div>
  );
}
