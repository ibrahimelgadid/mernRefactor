import React, { useEffect, useState } from "react";
import { Modal, Textarea, TextInput } from "flowbite-react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import isEmpty from "../../../utilis/isEmpty";
import store from "../../../redux/store";
import { clearErrors } from "../../../redux/reduxUtilis/clearErrors";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import ErrorCMP from "../../generalCMPs/ErrorCMP";
import { editUserRole } from "../../../redux/actions/membersActions";

const Edit = ({ showModal, setShowModal, user }) => {
  const [role, setRole] = useState("");
  const [errorsstate, seterrorsstate] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const { errors } = useSelector((state) => state.errorsReducer);

  const editUserRoleHND = bindActionCreators(editUserRole, useDispatch());

  // send post data
  const submitRole = async () => {
    setloadingstate(true);

    const roleData = {
      role,
    };

    if (await editUserRoleHND(roleData, user._id)) {
      withReactContent(Swal).fire({
        title: "Done",
        icon: "success",
        text: "User edited successfully",
        timer: 3000,
      });
      setShowModal(false);
    }
    setloadingstate(false);
  };
  // fill text value with post text
  useEffect(() => {
    setRole(user.role);
    //eslint-disable-next-line
  }, []);

  // get errors
  useEffect(() => {
    if (!isEmpty(errors)) {
      seterrorsstate(errors);
    }
  }, [errors, errorsstate]);

  // clear errors
  useEffect(() => {
    store.dispatch(clearErrors());
  }, []);

  return (
    <>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-0 sm:px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Edit user role
            </h3>
            <div className="relative z-0 mb-6 w-full group">
              <label htmlFor="catId" className="sr-only">
                User Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="catId"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value={""}>Select Role....</option>
                <option value={"user"}>user</option>
                <option value={"admin"}>admin</option>
              </select>

              <ErrorCMP errorData={errors.role} />
            </div>

            <div className="w-full">
              <button
                className="bg-indigo-700 py-2 px-3 text-white rounded-md"
                onClick={submitRole}
                disabled={loadingstate}
              >
                {loadingstate ? <LoadingCMP siz={"h-6 w-6"} /> : "Send"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Edit;
