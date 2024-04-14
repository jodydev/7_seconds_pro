import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext"; 
import Routing from "./routes/Routing";
import Layout from "./pages/Layout";

export default function App() {
  const isLoggedIn = true;

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/home';
    }
  }, [isLoggedIn]);

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
