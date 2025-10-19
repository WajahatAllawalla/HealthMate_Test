import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100 hover:shadow-md transition">
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default Card;