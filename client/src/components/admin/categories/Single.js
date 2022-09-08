import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../../redux/actions/categoriesActions";
import Edit from "./Edit";
import { confirmToDelete } from "../../../utilis/confirmToDelete";
import { isOwner, isSuperAdmin } from "../../../utilis/actionsShow";

const Single = ({ category, index }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteCategoryForUi = bindActionCreators(deleteCategory, useDispatch());

  return (
    <>
      <Edit
        category={category}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <tr className="bg-white border-b dark:bg-red-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index}
        </th>
        <td className="py-4 px-6">{category.name}</td>
        <td className="py-4 px-6">{category.description} </td>
        <td className="py-4 px-6">
          {category.user?.username || <del>{category.deleted.username}</del>}
        </td>
        {isOwner(category.user?._id) || isSuperAdmin() ? (
          <td className="py-4 px-6 flex justify-between">
            <button
              onClick={() =>
                confirmToDelete("Category", deleteCategoryForUi, category._id)
              }
              className="text-red-600 font-medium float-left"
            >
              Delete
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 font-medium float-right"
            >
              Edit
            </button>
          </td>
        ) : null}
      </tr>
    </>
  );
};

export default Single;
