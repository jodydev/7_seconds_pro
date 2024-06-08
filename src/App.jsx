import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import "aos/dist/aos.css";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Aos from "aos";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import JobDetails from "./components/Jobs/JobDetails";
import UserDetails from "./components/Users/UserDetails";
import UpgradePlan from "./pages/UpgradePlan";
import Loader from "./components/Loader";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import SetNewPassword from "./pages/SetNewPassword";
import MeetingPage from "./pages/MeetingPage";
import UpdateAccountPage from "./pages/UpdateAccountPage";


export function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { session, user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/set-new-password" element={<SetNewPassword />} />
      <Route
        path="/*"
        element={<LayoutWithRoutes session={session} user={user} />}
      />
    </Routes>
  );
}

function LayoutWithRoutes({ session, user }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout user={user}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/upgrade-plan" element={<UpgradePlan />} />
        <Route path="/meetings" element={<MeetingPage />} />
        <Route path="/update-account" element={<UpdateAccountPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

function Root() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </AppProvider>
    </I18nextProvider>
  );
}

export default Root;
