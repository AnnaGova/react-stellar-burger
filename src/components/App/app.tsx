import styles from "./app.module.css";
import { Routes, Route} from 'react-router-dom'
import { AppHeader } from "../AppHeader/app-header"
import React from 'react';
import HomePage from "../../pages/home";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { IngredientPage } from "../../pages/ingredient/ingredient";
import ProtectedRoute from "../protected-route/protected-route";
import { ProfilePage } from "../../pages/profile/profile";
import { NotFoundPage } from "../../pages/notfound-page/notfound-page";
import { useDispatch } from "react-redux";
//import { getRegisterUser, getLoginUser } from "../../utils/api";
import { fetchAllIngredients} from "../../services/slice/ingredientsSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/slice/UserSlice";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { Modal } from "../Modal/modal";
import { IngredientCompound } from "../IngredientCompound/ingredient-compound";
import FeedPage from "../../pages/feed/feed";
import { OrdersPage } from "../../pages/orders/orders";
import { OrderInfo } from "../../pages/order-info/order-info";
import api from "../../utils/api";




function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  let state = location.state;

  const closeModal = () => {
    navigate(-1);
  };

  const clbLogin = (dataUser: { email: string; password: string }) => {
    dispatch(api.getLoginUser(dataUser));
  };

  const clbRegister = (dataUser: {name: string; email: string;  password: string;}) => {
    dispatch(api.getRegisterUser(dataUser));
  };

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (

    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
      <Routes
          location={
            state && state.backgroundLocation
              ? state.backgroundLocation
              : location
          }
        >
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginPage onLogin={clbLogin} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth>
                <RegisterPage onRegister={clbRegister} />
              </ProtectedRoute>
            }
          />

          <Route
            path="forgot-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute onlyUnAuth>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/orders/:number"
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />


          <Route path="*" element={<NotFoundPage />} />

          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/:number" element={<OrderInfo />} />

        </Routes>

        {state && state.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали Ингредиента" onClose={closeModal}>
                  <IngredientCompound />
                </Modal>
              }
            />
            <Route
              path="/feed/:number"
              element={
                <Modal title="" onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <ProtectedRoute>
                  <Modal title="" onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;



