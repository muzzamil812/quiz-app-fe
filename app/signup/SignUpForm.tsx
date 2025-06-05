import { FormEvent, useState } from "react";

function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const signup = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    try {
      const response = await fetch(`${serverUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Signup failed");
      }

      await response.json();
      setSuccess("Signup successful!");
      form.reset(); // Reset form fields
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={signup} className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

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

        <label htmlFor="email" className="flex flex-col text-sm font-medium text-gray-700">
          Email
          <input
            type="email"
            name="email"
            id="email"
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

        <label htmlFor="confirmPassword" className="flex flex-col text-sm font-medium text-gray-700">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
