import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import useAxiosSecure from '../../../hooks/useAxiosPublic';
import DefaultLayout from '../../../layout/DefaultLayout';
const NewStudent = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const { data: user = [], refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('userv2/appliedStudent', {});
      if (res.data) {
        setLoading(false);
      }
      return res.data;
    },
  });

  const handleRoleChange = (e, user) => {
    e.preventDefault();

    const newRole = e.target.role.value;
    const newBeach = e.target.beach.value;

    axiosSecure
      .patch(`/userv2/${user?._id}`, { role: newRole, beach: newBeach })
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
    return (
      <>
        <DefaultLayout>
          <Breadcrumb pageName="Appled Student list" />
          Loading..
        </DefaultLayout>
      </>
    );
  }

  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Appled Student list" />

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xm font-semibold text-black dark:text-white">
              Total student : {user?.length}
            </h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium"> Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Category</p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Select</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Action</p>
            </div>
          </div>

          {user?.map((user, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <img
                      src={user?.photoURL}
                      alt="Product"
                      className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-gray-300 dark:ring-offset-gray-100"
                    />
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {user?.displayName}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {user?.course}
                </p>
              </div>

              <div className="col-span-4 flex items-center ">
                <form onSubmit={(e) => handleRoleChange(e, user)}>
                  <div className=" text-sm flex gap-1">
                    <select
                      name="role"
                      defaultValue={user?.userType}
                      className="px-4 py-0  rounded-md  border-2 "
                    >
                      <option value="isStudent">Make Student</option>
                      <option value="applied_student">applied_student</option>
                    </select>

                    <input
                      name="beach"
                      className="px-4 py-0  rounded-md border-2"
                      required
                      placeholder="batch  no"
                      type="number"
                    />

                    <button type="submit">
                      <samp className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        Accept
                      </samp>
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-span-1 flex items-center"></div>
            </div>
          ))}
        </div>
      </DefaultLayout>
    </div>
  );
};

export default NewStudent;
