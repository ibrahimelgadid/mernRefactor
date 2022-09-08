import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { editProfile } from "../../../redux/actions/authActions";
import isEmpty from "../../../utilis/isEmpty";
import store from "../../../redux/store";
import { clearErrors } from "../../../redux/reduxUtilis/clearErrors";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import ErrorCMP from "../../generalCMPs/ErrorCMP";

const ProfileEdit = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [youtube, setyoutube] = useState("");
  const [facebook, setfacebook] = useState("");
  const [github, setgithub] = useState("");
  const [phone, setphone] = useState("");

  const [errorsstate, seterrorsstate] = useState("");
  const [loadingstate, setloadingstate] = useState(false);

  const editProfileForUi = bindActionCreators(editProfile, useDispatch());
  const { errors } = useSelector((state) => state.errorsReducer);
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setloadingstate(true);
    e.preventDefault();
    const userData = {
      username,
      email,
      youtube,
      facebook,
      github,
      phone,
    };

    if (await editProfileForUi(userData)) {
      withReactContent(Swal).fire({
        title: "Profile Edit",
        icon: "success",
        text: "You Profile edited successfully",
        timer: 3000,
      });
      navigate(-1);
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

  // fill form from user data
  useEffect(() => {
    setusername(user.username);
    setemail(user.email);
    if (!isEmpty(user.social)) {
      user.social.youtube = !isEmpty(user.social.youtube)
        ? setyoutube(user.social.youtube)
        : "";
      user.social.facebook = !isEmpty(user.social.facebook)
        ? setfacebook(user.social.facebook)
        : "";

      user.social.github = !isEmpty(user.social.github)
        ? setgithub(user.social.github)
        : "";
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white p-10">
      <h2 className="font-medium text-2xl text-center pb-5 text-indigo-500">
        Edit Your Profile
      </h2>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="username"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          placeholder=" "
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <ErrorCMP errorData={errors.username} />
        <label
          htmlFor="username"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Username
        </label>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="email"
          name="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          placeholder=" "
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <ErrorCMP errorData={errors.email} />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>

      <div className="grid sm:grid-cols-2 sm:gap-6">
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="youtube"
            id="youtube"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            value={youtube}
            onChange={(e) => setyoutube(e.target.value)}
          />
          <ErrorCMP errorData={errors.youtube} />
          <label
            htmlFor="youtube"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Youtube
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="github"
            id="github"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            value={github}
            onChange={(e) => setgithub(e.target.value)}
          />
          <ErrorCMP errorData={errors.github} />
          <label
            htmlFor="github"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Gtithub
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="facebook"
            id="facebook"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            value={facebook}
            onChange={(e) => setfacebook(e.target.value)}
          />
          <ErrorCMP errorData={errors.facebook} />
          <label
            htmlFor="facebook"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Facebook
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="floating_phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <ErrorCMP errorData={errors.phone} />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number (123-456-7890)
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loadingstate}
        onClick={handleSubmit}
        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
      >
        {loadingstate ? <LoadingCMP siz={"h-6 w-6"} /> : "Submit"}
      </button>
    </div>
  );
};

export default ProfileEdit;
