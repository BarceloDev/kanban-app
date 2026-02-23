import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterScreen() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setStateValue] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    if (cep.length !== 8) return;

    async function fetchData() {
      try {
        setError(null);

        const response = await fetch(
          `https://brasilapi.com.br/api/cep/v1/${cep}`,
        );

        if (!response.ok) {
          throw new Error("CEP não encontrado");
        }

        const result = await response.json();
        setCity(result.city);
        setStateValue(result.state);
      } catch (err) {
        setCity("");
        setStateValue("");
        setError(err.message);
      }
    }

    fetchData();
  }, [cep]);

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      setError(null);

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cep,
          city,
          state,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao registrar usuário");
      }

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-600 text-black">
      <div className="h-screen w-100 p-6 flex flex-col justify-center gap-5 bg-slate-50 md:w-300">
        <span className="flex flex-col gap-2">
          <Link to="/">
            <i
              className={`bi bi-arrow-left py-2 px-3 bg-blue-700 text-white rounded-md`}
            ></i>
          </Link>
          <span>
            <h5 className="text-xl font-bold md:text-2xl">Register on</h5>{" "}
            <h1 className="text-3xl font-bold md:text-4xl">KANBAN APP</h1>{" "}
          </span>
        </span>
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md border-2 border-blue-500 outline-none"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md border-2 border-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md border-2 border-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-md border-2 border-blue-500 outline-none"
          />

          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="w-full p-2 rounded-md border-2 border-blue-500 outline-none"
          />

          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              readOnly
              className="w-full p-2 rounded-md border-2 border-blue-500 outline-none"
            />
            <input
              type="text"
              value={state}
              readOnly
              className="w-full p-2 rounded-md border-2 border-blue-500 outline-none"
            />
          </div>

          {error && <span className="text-red-500 text-sm">{error}</span>}

          <button
            type="submit"
            className="py-2 w-full bg-blue-700 text-white rounded-md hover:bg-blue-900"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
