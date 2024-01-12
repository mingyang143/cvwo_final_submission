import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PostProvider } from "./Contexts/PostContext";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import Navigation from "./Components/Navigation";
import Button from "./Components/Button";
import SpinnerFull from "./Components/SpinnerFull";

const HomePage = lazy(() => import("./Pages/HomePage"));
const Applayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const CreateUser = lazy(() => import("./Pages/CreateUser"));

function App() {
  const [isDark, setIsDark] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("dark-mode");
    },
    [isDark]
  );
  return (
    <BrowserRouter>
      <AuthProvider>
        <header>
          <Navigation />
          <Button
            onClick={() => setIsDark((isDark) => !isDark)}
            className="btn-dark-mode"
          >
            {" "}
            {isDark ? "☀️" : "🌙"}
          </Button>
        </header>
        <Suspense fallback={<SpinnerFull />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <PostProvider>
                    <Applayout />
                  </PostProvider>
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="create" element={<CreateUser />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
