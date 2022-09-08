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
import { editBrand } from "../../../redux/actions/brandsActions";

const Edit = ({ showModal, setShowModal, brand }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorsstate, seterrorsstate] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const { errors } = useSelector((state) => state.errorsReducer);

  const editBrandHND = bindActionCreators(editBrand, useDispatch());

  // send post data
  const submitBrand = async () => {
    setloadingstate(true);

    const brandData = {
      name,
      description,
    };

    if (await editBrandHND(brandData, brand._id)) {
      withReactContent(Swal).fire({
        title: "Done",
        icon: "success",
        text: "Brand edited successfully",
        timer: 2000,
      });
      setShowModal(false);
    }
    setloadingstate(false);
  };
  // fill text value with post text
  useEffect(() => {
    setName(brand.name);
    setDescription(brand.description);
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
              Add new brand
            </h3>
            <div>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="brand name"
              />
              <ErrorCMP errorData={errors.name} />
            </div>

            <div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="brand description"
              />
              <ErrorCMP errorData={errors.description} />
            </div>

            <div className="w-full">
              <button
                className="bg-indigo-700 py-2 px-3 text-white rounded-md"
                onClick={submitBrand}
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
