import {
  faCameraRotate,
  faEllipsisH,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeImg } from "../../../redux/actions/authActions";
import { bindActionCreators } from "redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import isEmpty from "../../../utilis/isEmpty";
import ErrorCMP from "../../generalCMPs/ErrorCMP";

const Profile = () => {
  const [dropShow, setDropShow] = useState(false);
  const [avatar, setavatar] = useState("");
  const [errorsstate, seterrorsstate] = useState("");
  const [disable, setdisable] = useState(false);

  const { user } = useSelector((state) => state.authReducer);

  const imgRef = useRef();
  const profileActoins = useRef();

  const changeImgForUI = bindActionCreators(changeImg, useDispatch());
  const { errors } = useSelector((state) => state.errorsReducer);

  const blockUpload = avatar === "" ? "hidden" : "block";
  const blockEdit = avatar !== "" ? "hidden" : "block";

  const handleAvatar = async (e) => {
    setdisable(true);
    e.preventDefault();
    const avatarData = new FormData();
    avatarData.append("avatar", avatar);

    if (await changeImgForUI(avatarData)) {
      withReactContent(Swal).fire({
        title: "Profile Edit",
        icon: "success",
        text: "You Profile edited successfully",
        timer: 3000,
      });
      setavatar("");
      setdisable(false);
    }
  };

  // get errors
  useEffect(() => {
    if (!isEmpty(errors)) {
      seterrorsstate(errors);
      setavatar("");
      imgRef.current.src = user.avatar;
    }
  }, [errors, errorsstate, user.avatar]);

  // hide dropdown when not focus
  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropShow(false);
    });
  }, [dropShow]);

  return (
    <div className="profile container mx-auto py-10 relative">
      <div className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={function (e) {
              setDropShow(!dropShow);
              e.stopPropagation();
            }}
            ref={profileActoins}
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          >
            <span className="sr-only">Open dropdown</span>
            <FontAwesomeIcon icon={faEllipsisH} size="xl" />
          </button>
          {dropShow ? (
            <div className="z-10 w-44 absolute top-20 right-14 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-md block">
              <ul className="py-1" aria-labelledby="dropdownButton">
                <li>
                  <Link
                    to="/profileEdit"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Edit profile
                  </Link>
                  <hr />
                </li>
                <li>
                  <form onSubmit={handleAvatar}>
                    <label
                      className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      htmlFor="avatar"
                    >
                      Change photo
                    </label>

                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      className="hidden"
                      accept="image/*"
                    />
                  </form>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col items-center pb-10 ">
          <h2 className="font-semibold text-3xl py-4 text-indigo-600">
            {user.username} Profile
            <hr className="bg-indigo-600 h-0.5" />
          </h2>
          <ErrorCMP errorData={errors.avatar} />
          <div className="relative">
            <img
              ref={imgRef}
              className="mb-3 w-28 h-28 rounded-full  shadow-lg border border-gray-400 p-5"
              src={user.avatar}
              alt=""
            />
            <span className="changeImg text-gray-600 absolute  bottom-1 right-1/2 translate-x-1/2">
              <form onSubmit={handleAvatar}>
                <label htmlFor="avatar" className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faCameraRotate}
                    className={blockEdit}
                  />
                </label>
                <input
                  className="hidden"
                  id="avatar"
                  type={"file"}
                  onChange={(e) => {
                    if (
                      e.target.files[0].type === "image/png" ||
                      e.target.files[0].type === "image/jpeg" ||
                      e.target.files[0].type === "image/jpg"
                    ) {
                      setavatar(e.target.files[0]);
                      var file = e.target.files[0];
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        // The file's text will be printed here
                        var content = e.target.result;
                        imgRef.current.src = content;
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <input
                  type={"submit"}
                  id="upload"
                  className="hidden"
                  value={"uplaod"}
                  accept="image/*"
                />
                <label
                  className={blockUpload + " cursor-pointer"}
                  htmlFor="upload"
                >
                  <button disabled={disable} className="">
                    <FontAwesomeIcon icon={faUpload} />
                  </button>
                </label>
              </form>
            </span>
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.username}
          </h5>
          <span className="font-medium text-indigo-600">admin</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
          {user.social ? (
            <div className="social flex justify-between py-5">
              {user.social.youtube ? (
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href={user.social.youtube}
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="cursor-pointer mr-2 text-red-600 border-red-600  border  py-2 px-4  rounded-sm"
                  />
                </a>
              ) : null}

              {user.social.facebook ? (
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href={user.social.facebook}
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="cursor-pointer mr-2 text-blue-600 border-blue-600  border  py-2 px-4  rounded-sm"
                  />
                </a>
              ) : null}

              {user.social.github ? (
                <a target={"_blank"} rel="noreferrer" href={user.social.github}>
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="cursor-pointer  text-gray-800 border-text-gray-800  border  py-2 px-4  rounded-sm"
                  />
                </a>
              ) : null}
            </div>
          ) : null}

          <div className="flex mt-4 space-x-3 lg:mt-6">
            <Link
              to="/profileEdit"
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Edit Profile
            </Link>
            <a
              href="/"
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Back
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
