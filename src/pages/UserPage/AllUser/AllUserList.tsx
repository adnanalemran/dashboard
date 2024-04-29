import React from 'react';
import { Package } from '../../../types/package';
import useAxiosSecure from '../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const packageData: Package[] = [
  {
    name: 'Free package',
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Paid',
  },
  {
    name: 'Standard Package',
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Paid',
  },
  {
    name: 'Business Package',
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Unpaid',
  },
  {
    name: 'Standard Package',
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Pending',
  },
];

const AllUserList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: user = [], refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user', {});
      if (res.data) {
        // setLoading(false);
      }
      return res.data;
    },
  });

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

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.phoneNo}K</p>
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
                <Link
                  className="text-blue-800 "
                  to={`/singleUserInfo/${user?._id}`}
                >
                  <button className="hover:text-primary">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUserList;
