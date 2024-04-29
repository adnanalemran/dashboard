import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import StudentList from './pages/UserPage/StudentList/StudentList';
import AllUser from './pages/UserPage/AllUser/AllUser';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
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
          path="/user"
          element={
            <>
              <PageTitle title="User | Open IT is a leading BTEB training provider" />
              <AllUser />
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
