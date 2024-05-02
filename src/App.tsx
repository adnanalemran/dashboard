import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import AllUser from './pages/UserPage/AllUser/AllUser';
import NewStudent from './pages/UserPage/StudentList/NewStudent';
import StudentList from './pages/UserPage/StudentList/StudentList';
import UserInfo from './pages/UserPage/UserInfo';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false); // Add state for error
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Handle error
  useEffect(() => {
    const errorHandler = () => {
      setError(true);
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  return error ? (
    <ErrorPage />
  ) : loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard | Open IT is a leading BTEB training provider" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Open IT is a leading BTEB training provider" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Open IT is a leading BTEB training provider" />

              <SignUp />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Open IT is a leading BTEB training provider" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Open IT is a leading BTEB training provider" />
              <Profile />
            </>
          }
        />
        <Route
          path="/my-id"
          element={
            <>
              <PageTitle title="id | Open IT is a leading BTEB training provider" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Open IT is a leading BTEB training provider" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Open IT is a leading BTEB training provider" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/student"
          element={
            <>
              <PageTitle title="student | Open IT is a leading BTEB training provider" />
              <StudentList />
            </>
          }
        />

        <Route
          path="/newStudent"
          element={
            <>
              <PageTitle title="new student | Open IT is a leading BTEB training provider" />
              <NewStudent />
            </>
          }
        />

        <Route
          path="/user"
          element={
            <>
              <PageTitle title="User | Open IT is a leading BTEB training provider" />
              <AllUser />
            </>
          }
        />

        <Route
          path="/userInfo/:id"
          element={
            <>
              <PageTitle title="User | Open IT is a leading BTEB training provider" />
              <UserInfo />
            </>
          }
        />
        <Route
          path="/AdminEditProfile/:id"
          element={
            <>
              <PageTitle title="User | Open IT is a leading BTEB training provider" />
              <UserInfo />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Open IT is a leading BTEB training provider" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Open IT is a leading BTEB training provider" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Open IT is a leading BTEB training provider" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Open IT is a leading BTEB training provider" />
              <Buttons />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
