import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosPublic';
import QRCodeComponent from '../../components/QR/QRCodeComponent';

const UserInfo = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const { data: user = [] } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${id}`);
      setLoading(false);
      return res.data;
    },
  });

  const qrCodeValue = `https://openit-edu.com/checking/$: {user?._id}`;
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="User info " />

        <div className="flex flex-col gap-10">
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="relative z-20 h-35 md:h-65">
              <img
                // src={CoverOne}
                src="https://64.media.tumblr.com/a7d100aabe2033b2fff1b7d5bf6af05f/tumblr_nlprx4nuGI1relaado1_400.gif"
                alt="profile cover"
                className="h-full w-full  rounded-tr-sm  object-center"
              />
              <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4"></div>
            </div>
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                  <img
                    className="rounded-full "
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                  : {user?.displayName}
                </h3>
                <p className="font-medium"> : {user?.email}</p>
                <p className="font-medium"> : {user?.phoneNo}</p>
                <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="   block text-black dark:text-white">
                      : {user?.userType}
                    </span>
                    {/* <span className="text-sm">course</span> */}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      : {user?.beach}
                    </span>
                    <span className="text-sm"> batch</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {user?.totalDueAmmout} TK
                    </span>
                    <span className="text-sm">Due</span>
                  </div>
                </div>

                <div className="mx-auto max-w-180">
                  <h4 className="font-semibold text-black dark:text-white">
                    About Student
                  </h4>
                  <p className="mt-4.5 text-left">
                    Name: {user?.userData?.displayName}.
                    <br /> Her father's name is : {user?.userData?.fatherName}.
                    <br /> Her mother's name is:{user?.userData?.motherName}.
                    <br />
                    He was born on : {user?.userData?.dateOfBirth}.
                    <br />
                    Her education qualification is:  
                    {user?.userData?.educationQualification}.
                    <br />
                    He attended :{user?.userData?.schoolUniversity}.
                    <br />
                    You can contact me at :{user?.userData?.PhoneNo}
                    or through Her email :{user?.email}
                    <br />
                    Her present address is: {user?.userData?.presentAddress},
                    <br />
                    Her permanent address is:
                    {user?.userData?.permanentAddress}.
                    <br />
                    Her SSC roll number is:  {user?.userData?.sscRollNo},
                    registration number is: {user?.userData?.sscRegNo},<br />  
                    and He passed from :{user?.userData?.SSCBoardName} board in
                    : {user?.userData?.passingYear}.
                    <br />
                    He am currently enrolled in the : {user?.course} course
                  </p>
                  <br />
                  <br />
                  <div>
                    <div className="mx-auto w-32 ">
                      <QRCodeComponent value={qrCodeValue} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full flex gap-4 mx-auto items-center justify-center">
            <Link
              to={`/AdminEditProfile/${user?._id}`}
              className="text-blue-800 font-bold"
            >
              <button className="p-3 bg-slate-300 rounded-xl  ">
                Edit User info
              </button>
            </Link>
            <Link to={user?.photoURL}>
              <button className="p-3 bg-slate-600 rounded-xl text-white">
                Image download
              </button>
            </Link>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default UserInfo;
