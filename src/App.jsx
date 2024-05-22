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
import Register from "./pages/Register";
import Aos from "aos";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import JobDetails from "./components/Jobs/JobDetails";
import UserDetails from "./components/Users/UserDetails";
import UpgradePlan from "./pages/UpgradePlan";

export function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { session, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center flex items-center justify-center">
        <img src="/public/7secondspro-logo" className="w-full " />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

function Root() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default Root;
