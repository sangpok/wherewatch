/** React 관련 */
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useNavigateBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = useCallback(() => {
    const isNoHistory = location.key === "default";

    if (isNoHistory) {
      navigate("/");
    } else {
      navigate(-1);
    }
  }, [location]);

  return navigateBack;
};

export default useNavigateBack;
