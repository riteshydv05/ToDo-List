import React from "react";

function PageNotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold mb-4 text-red-600">404 - Page Not Found</h1>
      <div className="text-xl text-gray-600">Sorry, the page you are looking for does not exist.</div>
    </div>
  );
}

export default PageNotFound;
