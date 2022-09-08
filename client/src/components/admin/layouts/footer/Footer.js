import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-sky-500 mt-5">
      <div className="container mx-auto sm:py-5 py-3 flex justify-evenly items-center text-gray-100 ">
        <img
          src="../../../../../imgs/imm.png"
          alt=""
          className="w-10 hidden sm:block"
        />
        <div className="font-medium">
          &copy; MERN STACK: {new Date().getFullYear()}
        </div>
        <p className="font-normal ">
          Version: <span className="font-semibold">1.0.0</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
