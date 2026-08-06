import { useState, useEffect } from "react";
import { WallpaperProvider } from "./context/WallpaperContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";

function App() {
  const { isSignedIn, isLoaded } = useAuth();
  const [timeLoading, setTimeLoading] = useState(true);

  useEffect(() => {
    // Keeps loader mounted for exactly 5 seconds
    const timer = setTimeout(() => {
      setTimeLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const showLoader = !isLoaded || timeLoading;

  return (
    <>
      {showLoader && <PageLoader />}
      
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
        </WallpaperProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
