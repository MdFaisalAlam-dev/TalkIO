import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "@clerk/react";

import { ThemeProvider } from "./context/ThemeContext";
import { WallpaperProvider } from "./context/WallpaperContext";

import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";

import PageLoader from "./components/PageLoader";
import useMinimumLoader from "./hooks/useMinimumLoader";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  // Wait until Clerk finishes loading
  // then keep the loader visible for at least 5 seconds.
  const showLoader = useMinimumLoader(isLoaded, 5000);

  if (!isLoaded || showLoader) {
    return <PageLoader />;
  }

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route
            path="/"
            element={
              isSignedIn ? (
                <ChatPage />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/auth"
            element={
              !isSignedIn ? (
                <AuthPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;