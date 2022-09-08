import React from "react";

const Footer = () => {
  return (
    <div className="footer bg-gray-800 px-2 sm:px-0">
      <div className="container  mx-auto py-5 flex flex-col sm:flex-row space-y-2 justify-evenly items-center text-gray-300 ">
        <img src="../../../../../imgs/imm.png" alt="" className="w-10" />
        <div className="font-medium text-sm sm:text-base">
          &copy; copyrights reserved: {new Date().getFullYear()}
        </div>
        <p className="text-sm sm:text-base">
          Design & developed by:{" "}
          <span className="font-semibold">Ibrahim Elgadid</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
