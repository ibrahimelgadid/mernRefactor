import React, { useState } from "react";
import {
  faArrowDownAZ,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterModal from "./FilterModal";
import Sort from "./Sort";

const TopIcons = ({ searchWord, setSearchWord }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="topButtons py-5 flex justify-between items-center sm:px-0 px-4">
      <FilterModal showModal={showModal} setShowModal={setShowModal} />
      <div className="icons flex justify-start">
        <span
          className="filter cursor-pointer text-indigo-500 mr-5"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FontAwesomeIcon icon={faFilter} className="sm:text-2xl text-lg" />
        </span>

        <span
          onClick={() => {
            setShowSort(!showSort);
          }}
          className="filter cursor-pointer text-indigo-500"
        >
          <FontAwesomeIcon
            icon={faArrowDownAZ}
            className="sm:text-2xl text-lg"
          />
        </span>
        <div className="bg-white shadow-lg absolute z-50 left-10 top-16 ">
          {showSort && <Sort />}
        </div>
      </div>

      <div className="flex w-40 sm:w-48">
        <span className="cursor-pointer inline-flex items-center sm:px-3 px-1  text-sm text-gray-200 bg-indigo-500 rounded-l-md border border-r-0 border-gray-300 ">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          className="rounded-none py-1 sm:py-2 rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300  "
          placeholder="Search for item"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopIcons;
