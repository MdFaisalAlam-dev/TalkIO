import { useState, useEffect, useRef } from "react"; 
import { WallpaperProvider } from "./context/WallpaperContext"; 
import { ThemeProvider } from "./context/ThemeContext"; 
import { Navigate, Route, Routes } from "react-router"; 
import ChatPage from "./pages/ChatPage"; 
import AuthPage from "./pages/AuthPage"; 
import { useAuth } from "@clerk/react"; 
import PageLoader from "./components/PageLoader"; 
import { useAuthStore } from "./store/useAuthStore"; 
import { Toaster, toast } from "react-hot-toast"; 

function App() { 
  const { isSignedIn, isLoaded } = useAuth(); 
  const [timeLoading, setTimeLoading] = useState(true); 
  const wasSignedIn = useRef(false);

  // AuthStore States and Methods
  const clearAuth = useAuthStore((state) => state.clearAuth); 
  const checkAuth = useAuthStore((state) => state.checkAuth); 
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth); 
  const justLoggedIn = useAuthStore((state) => state.justLoggedIn);
  const setJustLoggedIn = useAuthStore((state) => state.setJustLoggedIn);

  useEffect(() => { 
    // Keeps loader mounted for exactly 5 seconds 
    const timer = setTimeout(() => { 
      setTimeLoading(false); 
    }, 5000); 
    return () => clearTimeout(timer); 
  }, []); 

  useEffect(() => { 
    if (!isLoaded) return; 

    if (isSignedIn) {
      checkAuth(); 
      // If they weren't signed in on last evaluation, they just logged in!
      if (!wasSignedIn.current) {
        setJustLoggedIn(true);
      }
      wasSignedIn.current = true;
    } else {
      clearAuth(); 
      wasSignedIn.current = false; 
      setJustLoggedIn(false);
    }
  }, [checkAuth, clearAuth, isLoaded, isSignedIn, setJustLoggedIn]); 

  const showLoader = !isLoaded || timeLoading || (isSignedIn && isCheckingAuth); 

  // Fires the toast safely AFTER the loader clears out of the view
  useEffect(() => {
    if (!showLoader && isSignedIn && justLoggedIn) {
      toast.success("Login successful!");
      setJustLoggedIn(false); // Reset immediately so it does not loop
    }
  }, [showLoader, isSignedIn, justLoggedIn, setJustLoggedIn]);

  if (showLoader) return <PageLoader />; 

  return ( 
    <> 
      <ThemeProvider> 
        <WallpaperProvider> 
          <Routes> 
            <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} /> 
            <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />} /> 
          </Routes> 
          <Toaster position="top-center" reverseOrder={false} /> 
        </WallpaperProvider> 
      </ThemeProvider> 
    </> 
  ); 
} 

export default App;
