import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Routing from "./routes/Routing";
import Layout from "./pages/Layout";
import Aos from "aos";
import "aos/dist/aos.css";

export default function App() {
  const isLoggedIn = true;

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn && window.location.pathname !== "/home") {
  //     window.location.href = "/home";
  //   }
  // }, [isLoggedIn]);

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Layout>
                  <Routing />
                </Layout>
              ) : (
                // <Login />
                <></>
              )
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}
