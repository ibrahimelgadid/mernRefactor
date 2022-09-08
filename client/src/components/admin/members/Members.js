import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import LoadingCMP from "../../generalCMPs/LoadingCMP";
import NoItemsCMP from "../../generalCMPs/NoItemsCMP";
import { getUsers } from "../../../redux/actions/membersActions";
import Single from "./Single";
import { isSuperAdmin } from "../../../utilis/actionsShow";

const Members = () => {
  const [showModal, setShowModal] = useState(false);
  const getUsersForUi = bindActionCreators(getUsers, useDispatch());
  const { users, loading } = useSelector((state) => state.membersReducer);

  // get all Members from db
  useEffect(() => {
    getUsersForUi();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="py-10  container mx-auto">
      <h2 className="text-3xl font-medium text-center">Members</h2>

      {
        // if still loading
        loading ? (
          <LoadingCMP siz={"w-12 h-12"} />
        ) : // if Members empty
        users.length < 1 ? (
          <NoItemsCMP item={"members"} />
        ) : (
          // show Members
          <div className="overflow-x-auto relative my-5 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    AVATAR{" "}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    EMAIL
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ROLE
                  </th>
                  {isSuperAdmin() ? (
                    <th scope="col" className="py-3 px-6">
                      ACTIONS
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <Single
                    key={user._id}
                    user={user}
                    index={i + 1}
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default Members;
