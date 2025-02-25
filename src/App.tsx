import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { lazy, useEffect } from "react";
import { refreshUser } from "./store/auth/operations";
import { useAppDispatch } from "./store/tools/hooks";
import RestrictedRoute from "./routes/RestrictedRoute";
import PrivateRoute from "./routes/PrivateRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const FriendsPage = lazy(() => import("./pages/FriendsPage"));
const NoticesPage = lazy(() => import("./pages/NoticesPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AddPetPage = lazy(() => import("./pages/AddPetPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/notices" component={RegisterPage} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/notices" component={LoginPage} />
          }
        />
        <Route
          path="/profile"
          element={<PrivateRoute redirectTo="/login" component={ProfilePage} />}
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/add-pet" element={<AddPetPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <ToastContainer /> */}
    </Layout>
  );
}

export default App;
