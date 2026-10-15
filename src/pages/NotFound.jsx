import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>

      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
