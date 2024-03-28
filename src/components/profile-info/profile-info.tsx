import styles from './profile-info.module.css'
import React, { useState, ChangeEvent, useEffect } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../../services/store'
import { checkUserAuth, updateUserInfo } from '../../services/slice/UserSlice'

type UserData = {
  name: string;
  email: string;
} | null;


export function ProfileInfo() {
  const [form, setFormValues] = useState({ name: "", email: "", password: "" });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: {user: {data: UserData} }) => state.user.data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
    setIsFormChanged(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserInfo(form));
    dispatch(checkUserAuth());
    setIsFormChanged(false);
  };

  const handleCancel = () => {
    // Сбрасываем значения формы на начальные значения
    if (userData) {
      setFormValues({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type={"text"}
        name={"name"}
        placeholder={"Имя"}
        value={form.name}
        onChange={handleChange}
        icon={"EditIcon"}
        error={false}
        extraClass={styles.name_input}
      />

      <Input
        type={"text"}
        name={"email"}
        placeholder={"e-mail"}
        value={form.email}
        onChange={handleChange}
        icon={"EditIcon"}
        error={false}
        extraClass={styles.email_input}
      />

      <Input
        type={"text"}
        name={"password"}
        placeholder={"Пароль"}
        value={form.password}
        onChange={handleChange}
        size={"default"}
        icon={"EditIcon"}
        error={false}
        extraClass={styles.password_input}
      />
      {isFormChanged && (
        <div className={styles.wrapper}>
          <Button htmlType="submit">Сохранить</Button>
          <Button onClick={handleCancel} htmlType="button" type="secondary">
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
}
