import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Routing from "./routes/Routing";
import Layout from "./pages/Layout";


export default function App() {

  const isLoggedIn = true;

  return (

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
            <>
            </>
          )
        }
      />
    </Routes>
  </Router>

  )
}


