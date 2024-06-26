import styles from './register.module.css'
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface RegisterPageProps {
  onRegister: (data: { name: string; email: string; password: string }) => void;
}

export function RegisterPage({ onRegister }: RegisterPageProps) {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister(formData);
  };


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      {/* <form className={styles.form} onSubmit={handleSubmit}> */}

      <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={false}
          errorText={"Введите корректное имя"}
          extraClass={styles.name_input}
        />

        <Input type="email"
          placeholder="E-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={false}
          errorText={"Введите корректный e-mail"}
          extraClass={styles.email_input}
        />

        <PasswordInput
          placeholder="Пароль"
          name="password"
          value={formData.password}
          onChange={handleChange}
          size={"default"}
          extraClass={styles.password_input}

        />

        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          extraClass={styles.button}
        >
          Вотйи
        </Button>
        <p className="text text_type_main-default text_color_inactive">  Уже зарегистрированы?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  )
}
