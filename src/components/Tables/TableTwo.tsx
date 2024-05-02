import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosPublic';

const TableTwo = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: user = [], refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('userv2/studentAllData', {});
      if (res.data) {
        setLoading(false);
      }
      return res?.data;
    },
  });

  const filteredUsers = Array.isArray(user)
    ? user.filter((user) =>
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xm font-semibold text-black dark:text-white">
          Total student : {user?.length}
        </h4>
      </div>
      <label className="input input-bordered flex items-center gap-2 w-1/2 mx-auto my-8 ">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target?.value)}
          className="flex flex-1 text-right border sm:text-sm rounded-l-md focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600  p-3 "
          placeholder="Search Student by name "
        />
        <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-r-md dark:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium"> Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">BREACH</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Phone no</p>
        </div>
      </div>

      {filteredUsers.map((user, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={user.photoURL} alt="Product"   className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-gray-300 dark:ring-offset-gray-100" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {user?.displayName}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{user.course}</p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{user.beach}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{user.phoneNo}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
