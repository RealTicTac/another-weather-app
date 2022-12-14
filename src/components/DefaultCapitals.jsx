import React from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";

const cities = [
  {
    title: "London",
    id: 1,
  },
  {
    title: "Paris",
    id: 2,
  },
  {
    title: "Moscow",
    id: 3,
  },
  {
    title: "Sydney",
    id: 4,
  },
  {
    title: "Tokyo",
    id: 5,
  },
];

const DefaultCapitals = ({ setQuery }) => {
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((item) => {
        return (
          <button
            key={item.id}
            className="text-white text-lg font-medium"
            onClick={() => setQuery({ q: item.title })}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

export default DefaultCapitals;
