
import { useRouter } from 'next/navigation'
import { FormEvent } from "react";
import { useState } from "react";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const login = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    try {
      const res = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials or server error");
      }

      const data = await res.json();
      if(data.status === "SUCCESS") {
        router.push("/");
      }

      // alert("Login successful!");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={login} className="flex flex-col items-center justify-center min-h-screen w-[100%]">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <label htmlFor="username" className="flex flex-col text-sm font-medium text-gray-700">
          User Name
          <input
            type="text"
            name="username"
            id="username"
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label htmlFor="password" className="flex flex-col text-sm font-medium text-gray-700">
          Password
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
