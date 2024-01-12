import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/Hooks/authContextHook";
import { useEffect } from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ChildrenProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
