import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="text-secondary hover:underline text-lg font-medium"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
