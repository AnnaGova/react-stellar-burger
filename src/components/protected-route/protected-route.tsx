import { useSelector } from "../../services/store";
import { useLocation, Navigate } from "react-router-dom";
import { getIsAuthChecked } from "../../utils/selector";
import { SpinnerCircular } from "spinners-react";
import styles from "./protected-route.module.css";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

function ProtectedRoute({
  children,
  onlyUnAuth,
}: ProtectedRouteProps): JSX.Element {
  const location = useLocation();
  const user = useSelector((state) => state.user.data);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    console.log("проверка аутентификации");
    return (
      <div className={styles.spinner}>
        <SpinnerCircular color="red" />
      </div>
    );
  }

  if (onlyUnAuth && user) {
    console.log("NAVIGATE FROM LOGIN TO INDEX");
    const from = location.state?.from || { pathname: "/" };
    const backgroundLocation = location.state?.from?.state || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  if (!onlyUnAuth && !user) {
    console.log("NAVIGATE FROM PAGE TO LOGIN");
    return <Navigate replace to={"/login"} state={{ from: location }} />;
  }

  console.log("RENDER COMPONENT");
  return <>{children}</>;
}

export default ProtectedRoute;
