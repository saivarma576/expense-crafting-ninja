
import { Navigate, useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  
  // Check if we have a specific route in the URL
  const redirectTo = location.pathname === "/" ? "/dashboard" : location.pathname;
  
  return <Navigate to={redirectTo} replace />;
};

export default Index;
