import { useState } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form";
import  { type DtoRegisterRequest,  DtoRoleStatic } from '../../api/api';
import styles from './RegisterFrom.module.css';
import type { RegisterFormProps } from './type';

const validatePhone = (value: string | undefined) => {
  if (!value) return 'Телефон обязателен';
  // Пример: +79999999999
  const phonePattern = /^\+7\d{10}$/;
  return phonePattern.test(value) ? true : 'Формат: +79999999999';
};

const validatePassword = (value: string | undefined) => {
  if (!value) return 'Пароль обязателен';
  if (value.length < 8) return 'Минимум 8 символов';
  if (!/[A-Z]/.test(value)) return 'Хотя бы одна заглавная буква';
  if (!/[a-z]/.test(value)) return 'Хотя бы одна строчная буква';
  if (!/\d/.test(value)) return 'Хотя бы одна цифра';
  if (!/[^A-Za-z0-9]/.test(value)) return 'Хотя бы один спецсимвол';
  return true;
};

const validateFio = (value: string | undefined) => {
  if (!value) return 'ФИО обязательно';
  if (!/^([А-ЯЁ][а-яё]+\s){1,2}[А-ЯЁ][а-яё]+$/.test(value)) return 'Введите корректное ФИО (например: Иванов Иван Иванович)';
  return true;
};



export const RegisterForm = ( {onSubmit, validLoginReq} : RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DtoRegisterRequest >({
    mode: 'onBlur', // Проверка полей при фокусе
  });

  const validLogin = (value: string | undefined) => {
    if (!value) return 'Логин обязателен';
    if (!/^[a-zA-Z]+$/.test(value)) return 'Логин должен содержать только латинские буквы';
    if (!validLoginReq(value)) return 'Логин занят'
    return true;
  };

  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordValue = watch('password');

  // TODO: Добавить уведомлене об успехе и неудаче и перевод на страницу входа
  const handleFormSubmit: SubmitHandler<DtoRegisterRequest> = (data) => {
    data.role = data.role as DtoRoleStatic;
    onSubmit(data)
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <h2 className={styles.formTitle}>Регистрация</h2>
      
      <div className={styles.inputGroup}>
        <input
          {...register("fio", { required: true, validate: validateFio })}
          id="fio"
          type="text"
          className={styles.input}
          placeholder="Фамилия Имя Отчество"
        />
        {errors.fio && <div className={styles.error}>{errors.fio.message as string}</div>}
      </div>

      <div className={styles.inputGroup}>
        <input
          {...register("login", { required: true, validate: validLogin })}
          id="login"
          type="text"
          className={styles.input}
          placeholder="Логин"
        />
        {errors.login && <div className={styles.error}>{errors.login.message as string}</div>}
      </div>
      
      <div className={styles.inputGroup}>
        <input
          {...register("phone", { required: true, validate: validatePhone })}
          id="phone"
          type="text"
          className={styles.input}
          placeholder="Телефон"
          pattern="^\+7\d{10}$"
        />
        {errors.phone && <div className={styles.error}>{errors.phone.message as string}</div>}
      </div>
      
      <div className={styles.inputGroup}>
        <input
          {...register("password", { required: true, validate: validatePassword })}
          id="password"
          type="password"
          className={styles.input}
          placeholder="Пароль"
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <div className={`${styles.passwordHint} ${(passwordFocused || passwordValue) ? styles.show : ''}`}>
          Требования к паролю:
          <ul>
            <li>Минимум 8 символов</li>
            <li>Хотя бы одна заглавная буква</li>
            <li>Хотя бы одна строчная буква</li>
            <li>Хотя бы одна цифра</li>
            <li>Хотя бы один спецсимвол</li>
          </ul>
        </div>
        {errors.password && <div className={styles.error}>{errors.password.message as string}</div>}
      </div>
      
      <div className={styles.inputGroup}>
        <select
          {...register("role", { required: true })}
          id="role"
          className={`${styles.input} ${styles.select}`}
          defaultValue=""
        >
          <option value="" disabled>Выберите роль</option>
          <option value={DtoRoleStatic.DRIVER}>Водитель</option>
          <option value={DtoRoleStatic.DISP}>Диспетчер</option>
          <option value={DtoRoleStatic.ADMIN}>Администратор</option>
        </select>
        {errors.role && <div className={styles.error}>{errors.role.message as string}</div>}
      </div>
      
      <div className={styles.inputGroup}>
        <input
          {...register("role_password", { required: true })}
          id="role_password"
          type="password"
          className={styles.input}
          placeholder="Пароль для роли"
        />
        {errors.role_password && <div className={styles.error}>{errors.role_password.message as string}</div>}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};
    