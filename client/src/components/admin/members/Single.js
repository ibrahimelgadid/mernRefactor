import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/actions/membersActions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Edit from "./Edit";
import { isSuperAdmin } from "../../../utilis/actionsShow";

const Single = ({ user, index }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteUserForUi = bindActionCreators(deleteUser, useDispatch());

  return (
    <>
      <Edit user={user} showModal={showModal} setShowModal={setShowModal} />
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index}
        </th>
        <td className="py-4 px-6">
          <img className="w-8" src={user.avatar} alt="" />
        </td>
        <td className="py-4 px-6">{user.email} </td>
        <td className="py-4 px-6">{user.role} </td>
        {isSuperAdmin() ? (
          <td className="py-4 px-6 ">
            <button
              onClick={async () => {
                if (await deleteUserForUi(user._id)) {
                  withReactContent(Swal).fire({
                    title: "Done",
                    icon: "success",
                    text: "user deleted successfully",
                    timer: 3000,
                  });
                }
              }}
              className="text-red-600 font-medium"
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
