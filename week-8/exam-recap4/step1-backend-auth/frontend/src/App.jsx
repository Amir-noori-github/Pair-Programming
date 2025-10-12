import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

// pages & components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyPage from "./pages/PropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

const App = () => {
  // initialize auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Protected routes */}
            <Route
              path="/properties/add-property"
              element={
                isAuthenticated ? (
                  <AddPropertyPage />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
            <Route
              path="/properties/:id/edit"
              element={
                isAuthenticated ? (
                  <EditPropertyPage />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />

            {/* Public routes */}
            <Route path="/properties/:id" element={<PropertyPage />} />

            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
