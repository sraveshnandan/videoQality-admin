import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen w-full bg-dark-bg p-12 items-center justify-center">
      <div className="bg-dark-surface w-[50%] h-[150px] rounded-md shadow-lg flex items-center justify-center text-4xl text-white">
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
