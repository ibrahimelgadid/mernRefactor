import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/actions/postsActions";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import Post from "./Post";
import PostInput from "./PostInput";

const Community = () => {
  const [showModal, setShowModal] = useState(false);

  const getPostsHND = bindActionCreators(getPosts, useDispatch());
  const { posts, loading } = useSelector((state) => state.postReducer);

  // get all posts
  useEffect(() => {
    getPostsHND();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Community py-10 text-center container mx-auto">
      <h1 className="text-2xl mb-12 font-semibold">Our Community</h1>
      <PostInput showModal={showModal} setShowModal={setShowModal} />

      <div className="newPost">
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white py-2 px-3 rounded-md"
        >
          Let feedback or question
        </button>
      </div>
      {
        // if still loading
        loading ? (
          <LoadingCMP siz={"w-12 h-12"} />
        ) : // if posts empty
        posts.length < 1 ? (
          <NoItemsCMP item={"posts"} />
        ) : (
          // show posts
          posts.map((post) => <Post key={post._id} post={post} />)
        )
      }
    </div>
  );
};

export default Community;
