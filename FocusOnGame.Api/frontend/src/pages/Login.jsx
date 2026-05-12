import { Button, Label, TextInput, Card } from "flowbite-react";
import { login } from "../services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const user = await login(form);
      navigate(`/dashboardPathways/${user.id}`);

    } catch (error) {
      console.error("Login error:", error);

    } finally {
      setLoading(false);
      setError(error.value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100">

      <div className="w-full max-w-md px-4">

        <Card className="shadow-2xl border border-blue-100 rounded-2xl bg-white p-4 sm:p-6">

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back
            </h1>

            <p className="text-gray-500 mt-2">
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-2">

            <div>
              <Label
                htmlFor="email"
                className="mb-2 block text-gray-700"
              >
                Email
              </Label>

              <TextInput
                id="email"
                type="email"
                placeholder="you@email.com"
                className="
                [&>div>input]:py-2
                [&>div>input]:rounded-xl"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="mb-2 block text-gray-700"
              >
                Password
              </Label>

              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                className="
                [&>div>input]:py-2
                [&>div>input]:rounded-xl"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
            </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="
              rounded-xl
              bg-sky-500
              hover:bg-sky-600
              transition-all
              duration-200
              px-6
              py-3
              w-fit
              mx-auto
              text-base
              font-medium
              "
            >
              Sign in
            </Button>

            <p className="text-sm text-center text-gray-500">
              No account yet?{" "}
              <a
                href="/register"
                className="text-sky-600 hover:underline font-medium"
              >
                Create one
              </a>
            </p>

          </form>

        </Card>

      </div>
    </div>
  );
}