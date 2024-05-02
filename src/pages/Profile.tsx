import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import QRCodeComponent from '../components/QR/QRCodeComponent';
import useAxiosSecure from '../hooks/useAxiosPublic';
import DefaultLayout from '../layout/DefaultLayout';
import { AuthContext } from '../providers/AuthProvider';

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dbuser, setDbuser] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`/user/email/${user?.email}`);
        setDbuser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [axiosSecure, user?.email]);

  const qrCodeValue = `https://openit-edu.com/checking/${dbuser?._id}`;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />

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
              {user?.displayName}
            </h3>
            <p className="font-medium"> {user?.email}</p>
            <p className="font-medium"> {dbuser?.phoneNo}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="   block text-black dark:text-white">
                  {dbuser?.userType}
                </span>
                {/* <span className="text-sm">course</span> */}
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {dbuser?.beach}
                </span>
                <span className="text-sm"> batch</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {dbuser?.totalDueAmmout} TK
                </span>
                <span className="text-sm">Due</span>
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5">
                Hello, I am {dbuser?.userData?.displayName}. My father's name is
                {dbuser?.userData?.fatherName}. My mother's name is
                {dbuser?.userData?.motherName}. I was born on
                {dbuser?.userData?.dateOfBirth}. My education qualification is
                {dbuser?.userData?.educationQualification}. I attended
                {dbuser?.userData?.schoolUniversity}. You can contact me at
                {dbuser?.userData?.PhoneNo} or through my email {dbuser?.email}.
                My present address is {dbuser?.userData?.presentAddress}, and my
                permanent address is {dbuser?.userData?.permanentAddress}. My
                SSC roll number is {dbuser?.userData?.sscRollNo}, registration
                number is {dbuser?.userData?.sscRegNo}, and I passed from
                {dbuser?.userData?.SSCBoardName} board in
                {dbuser?.userData?.passingYear}. I am currently enrolled in the
                {dbuser?.course} course. .
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
    </DefaultLayout>
  );
};

export default Profile;
