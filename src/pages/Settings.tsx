import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import useAxiosSecure from '../hooks/useAxiosPublic';
import DefaultLayout from '../layout/DefaultLayout';
import { AuthContext } from '../providers/AuthProvider';

const Settings = () => {
  const { user, logOut } = useContext(AuthContext);

  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: userData = [], isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/email/${user?.email}`);

      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      displayName: e.target.displayName.value,
      phoneNo: e.target.phoneNo.value,
      beach: parseInt(e.target.beach.value),
      userType: userData?.userType,
      email: userData?.email,
      btebID: userData?.btebID,
      markCollection: userData?.markCollection,
      photoURL: userData?.photoURL,
      totalDueAmmout: userData?.totalDueAmmout,
      totalPurchesAmmount: userData?.totalPurchesAmmount,
      purchesProductCollection: userData?.purchesProductCollection,
      userData: {
        ...userData.userData,
        fatherName: e.target.fatherName.value,
        motherName: e.target.motherName.value,
        educationQualification: e.target.educationQualification.value,
        dateOfBirth: e.target.dateOfBirth.value,
        schoolUniversity: e.target.schoolUniversity.value,
        facebookUrl: e.target.facebookUrl.value,
        permanentAddress: e.target.permanentAddress.value,
        presentAddress: e.target.presentAddress.value,
      },
    };

    try {
      const updateRes = await axiosSecure.put(
        `/user/${userData._id}`,
        formData,
      );

      if (updateRes.data) {
        Swal.fire({
          text: updateRes.data.message,
          icon: 'success',
          position: 'top-right',
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: updateRes.data.message,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error updating user: ', error);
      Swal.fire({
        icon: 'error',
        text: 'An error occurred while updating the user.',
        position: 'top-right',
      });
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5">
          <h1 className="text-2xl font-bold text-center">Update My Profile</h1>
          <hr className="border-1 border-gray-700" />

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form
              className="grid grid-cols-1 md:grid-cols-2 grid-rows-5 gap-4 text-left"
              onSubmit={handleSubmit}
            >
              <div className="space-y-1 text-sm">
                <label className="block dark-text-gray-400">Name</label>
                <input
                  disabled
                  type="text"
                  name="displayName"
                  defaultValue={userData?.displayName}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block dark-text-gray-400">Phone number</label>
                <input
                  type="text"
                  name="phoneNo"
                  defaultValue={userData?.phoneNo}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm hidden">
                <label className="block">
                  Beach number(Administrator Edit only)
                </label>
                <input
                  disabled
                  type="text"
                  name="beach"
                  defaultValue={userData?.beach}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block">Father Name</label>
                <input
                  type="text"
                  name="fatherName"
                  defaultValue={userData?.userData?.fatherName}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block">Mother Name</label>
                <input
                  type="text"
                  name="motherName"
                  defaultValue={userData?.userData?.motherName}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block">Date Of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  defaultValue={userData?.userData?.dateOfBirth}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block">Education Qualification</label>
                <input
                  type="text"
                  name="educationQualification"
                  defaultValue={userData?.userData?.educationQualification}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block">School/University</label>
                <input
                  type="text"
                  name="schoolUniversity"
                  defaultValue={userData?.userData?.schoolUniversity}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block">Facebook URL</label>
                <input
                  type="text"
                  name="facebookUrl"
                  defaultValue={userData?.userData?.facebookUrl}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block">Present Address</label>
                <input
                  type="text"
                  name="presentAddress"
                  defaultValue={userData?.userData?.presentAddress}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block   ">permanentAddress</label>
                <input
                  type="text"
                  name="permanentAddress"
                  defaultValue={userData?.userData?.permanentAddress}
                  className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className=" px-8 py-3 font-semibold rounded-full btn hover:bg-[#ff6d48] bg-purple-500 text-white  items-center  "
                >
                  Update Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
