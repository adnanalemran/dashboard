import React, { useState } from 'react';
import { Package } from '../../../types/package';
import useAxiosSecure from '../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUserList = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const { data: user = [], refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user', {});
      if (res.data) {
        setLoading(false);
      }
      return res.data;
    },
  });

  const handleRoleChange = (e, user) => {
    e.preventDefault();

    const newRole = e.target.role.value;

    axiosSecure
      .patch(`/user/${user?._id}`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `success  Change role!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading === true) {
    return <>Loading..</>;
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Mobile no
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Breach
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Type
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              View and action
            </h5>
          </div>
        </div>

        {user.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === user.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <Link to={`/userInfo/${user?._id}`}>
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="relative flex-shrink-0">
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-12 h-12 border rounded-full dark:bg-gray-500 dark:border-gray-300"
                  />
                </div>

                <p className="hidden text-black dark:text-white sm:block">
                  {user.displayName}
                </p>
              </div>
            </Link>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.phoneNo}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user?.beach}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                  user.userType === 'isAdmin'
                    ? 'bg-purple-500 text-purple-500'
                    : user.userType === 'isStudent'
                    ? 'bg-success text-success'
                    : user.userType === 'user'
                    ? 'bg-danger text-danger'
                    : 'bg-warning text-warning'
                }`}
              >
                {user.userType}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <div className="flex items-center space-x-3.5">
                <form onSubmit={(e) => handleRoleChange(e, user)}>
                  <div className=" text-sm flex gap-2">
                    <select
                      name="role"
                      defaultValue={user?.userType}
                      className=" p-3 bg-black rounded-xl text-white"
                    >
                      <option value="isAdmin">Admin</option>
                      <option value="isStudent">Student</option>
                      <option value="applied_student">applied_student</option>
                      <option value="user">out service</option>
                    </select>
                    <button
                      type="submit"
                      className=" p-3 bg-black rounded-xl text-white"
                    >
                      Action
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUserList;
