import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <>
        <div
          className={`text-3xl p-5 rounded-full cursor-pointer ${
            isActive ? "bg-orange-500" : "bg-yellow-500"
          }`}
        >
          <CiForkAndKnife />
        </div>
        <p className="text-center font-medium m-1 capitalize">{category}</p>
      </>
    </div>
  );
};

export default FilterProduct;
