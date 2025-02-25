import { Navigate } from "react-router-dom";
import { IRouteProps } from "../interfaces/interfaces";
import { useAppSelector } from "../store/tools/hooks";
import { selectIsLoggedIn } from "../store/auth/selectors";

const PrivateRoute: React.FC<IRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
