import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { deleteBrand } from "../../../redux/actions/brandsActions";
import Edit from "./Edit";
import { confirmToDelete } from "../../../utilis/confirmToDelete";
import { isOwner, isSuperAdmin } from "../../../utilis/actionsShow";

const Single = ({ brand, index }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteBrandForUi = bindActionCreators(deleteBrand, useDispatch());

  return (
    <>
      <Edit brand={brand} showModal={showModal} setShowModal={setShowModal} />
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index}
        </th>
        <td className="py-4 px-6">{brand.name}</td>
        <td className="py-4 px-6">{brand.description} </td>
        <td className="py-4 px-6">
          {brand.user?.username ?? <del>{brand.deleted?.username}</del>}
        </td>
        {isOwner(brand.user?._id) || isSuperAdmin() ? (
          <td className="py-4 px-6 flex justify-between">
            <button
              onClick={() =>
                confirmToDelete("Brand", deleteBrandForUi, brand._id)
              }
              className="text-red-600 font-medium"
            >
              Delete
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 font-medium"
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
