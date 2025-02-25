import { Navigate } from "react-router-dom";
import { IRouteProps } from "../interfaces/interfaces";
import { useAppSelector } from "../store/tools/hooks";
import { selectIsLoggedIn } from "../store/auth/selectors";

const RestrictedRoute: React.FC<IRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Component />;
};

export default RestrictedRoute;
