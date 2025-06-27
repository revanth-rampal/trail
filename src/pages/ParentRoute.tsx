import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ParentRoute = (): React.JSX.Element => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        {/* added color to loader--------  */}
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  } else {
    return user?.role === "parent" ? <Outlet /> : <Navigate to="/login" replace />;
  }
};

export default ParentRoute;
