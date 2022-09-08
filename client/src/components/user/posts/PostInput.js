import React, { useEffect, useState } from "react";
import { Modal, Textarea } from "flowbite-react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../redux/actions/postsActions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import isEmpty from "../../../utilis/isEmpty";
import store from "../../../redux/store";
import { clearErrors } from "../../../redux/reduxUtilis/clearErrors";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import ErrorCMP from "../../generalCMPs/ErrorCMP";

const PostInput = ({ showModal, setShowModal }) => {
  const [text, setText] = useState("");
  const [errorsstate, seterrorsstate] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const { errors } = useSelector((state) => state.errorsReducer);

  const addPostHND = bindActionCreators(addPost, useDispatch());

  // send post data
  const submitPost = async () => {
    setloadingstate(true);

    if (await addPostHND({ text })) {
      withReactContent(Swal).fire({
        title: "Done",
        icon: "success",
        text: "Your post added",
        timer: 2000,
      });
      setText("");
      setShowModal(false);
    }
    setloadingstate(false);
  };

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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Share your suggesions , questions.
            </h3>
            <div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                id="post"
                placeholder="Your suggestion & question"
              />
              <ErrorCMP errorData={errors.text} />
            </div>

            <div className="w-full">
              <button
                className="bg-indigo-700 py-2 px-3 text-white rounded-md"
                onClick={submitPost}
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

export default PostInput;
