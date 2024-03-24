import { NavLink} from "react-router-dom";
import styles from "./profile.module.css";
import { useDispatch } from "react-redux";
import { logoutUsers } from "../../services/slice/UserSlice";
import { ProfileInfo } from "../../components/profile-info/profile-info";
import { checkUserAuth, updateUserInfo } from "../../services/slice/UserSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect, ChangeEvent } from "react";

type UserData = {
  name: string;
  email: string;
} | null;


export const ProfilePage: React.FC = () =>{
  const [form, setFormValues] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  // const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const userData = useSelector(
    (state: { user: { data: UserData } }) => state.user.data
  );

  // useEffect(() => {
  //   setFormValues({
  //     ...form,
  //     name: userData?.name || "",
  //     email: userData?.email || "",
  //   });
  // }, [userData]);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormValues({ ...form, [e.target.name]: e.target.value });
  //   setIsFormChanged(true);
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(updateUserInfo(form));
  //   dispatch(checkUserAuth());
  //   setIsFormChanged(false);
  // };

  const handleCancel = () => {
    setFormValues({
      name: userData?.name || "",
      email: userData?.email || "",
      password: "",
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={`${styles.navigation} text text_type_main-medium`}>
            <NavLink
              end
              className={({ isActive }) => (isActive ? `${styles.active} ${styles.navlink} ` : styles.navlink)}
              to="/profile">
              Профиль
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? `${styles.active} ${styles.navlink} ` : styles.navlink)}
              to="/profile/orders">
              История заказов
            </NavLink>
            <button
              className={`${styles.button} text text_type_main-medium`}
              type="button"
              onClick={handleCancel}>
              Выход
            </button>
          </div>
          <p className={`${styles.text} text text_type_main-default`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.profile_info}>
          <ProfileInfo />
        </div>
      </div>

    </>


  );
}
