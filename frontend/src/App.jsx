import { useState, useEffect } from "react";
import { WallpaperProvider } from "./context/WallpaperContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const [timeLoading, setTimeLoading] = useState(true);

  // AuthStore for better performance
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    // Keeps loader mounted for exactly 5 seconds
    const timer = setTimeout(() => {
      setTimeLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) checkAuth();
    else clearAuth();
  }, [checkAuth, clearAuth, isLoaded, isSignedIn]);

  const showLoader = !isLoaded || timeLoading || (isSignedIn && isCheckingAuth);

  if (showLoader) return <PageLoader />;

  return (
    <>
      
      
      <ThemeProvider>
        <WallpaperProvider>
          <Routes>
            <Route 
              path="/" 
              element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} 
            />
            <Route 
              path="/auth" 
              element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />} 
            />
          </Routes>
          <Toaster />
        </WallpaperProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
