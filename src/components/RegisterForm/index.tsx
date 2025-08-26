import { useState } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form";
import  { type ModelRegisterRequest,  ModelRoleEnum } from '../../api/api';
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

export const RegisterForm = ( {onSubmit} : RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ModelRegisterRequest >({
    mode: 'onBlur', // Проверка полей при фокусе
  });

  const [passwordFocused, setPasswordFocused] = useState(false);
  const passwordValue = watch('password');

  // TODO: Добавить уведомлене об успехе и неудаче и перевод на страницу входа
  const handleFormSubmit: SubmitHandler<ModelRegisterRequest> = (data) => {
    data.role = data.role as ModelRoleEnum;
    onSubmit(data)
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="fio" className={styles.label}>ФИО</label>
        <input
          {...register("fio", { required: true, validate: validateFio })}
          id="fio"
          type="text"
          className={styles.input}
        />
        {errors.fio && <div className={styles.error}>{errors.fio.message as string}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="login" className={styles.label}>Логин</label>
        <input
          {...register("login", { required: 'Логин обязателен' })}
          id="login"
          type="text"
          className={styles.input}
        />
        {errors.login && <div className={styles.error}>{errors.login.message as string}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Пароль для аккаунта</label>
        <input
          {...register("password", { required: true, validate: validatePassword })}
          id="password"
          type="password"
          className={styles.input}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        {(passwordFocused || passwordValue) && (
          <div className={styles.passwordHint}>
            Требования к паролю:
            <ul>
              <li>Минимум 8 символов</li>
              <li>Хотя бы одна заглавная буква</li>
              <li>Хотя бы одна строчная буква</li>
              <li>Хотя бы одна цифра</li>
              <li>Хотя бы один спецсимвол</li>
            </ul>
          </div>
        )}
        {errors.password && <div className={styles.error}>{errors.password.message as string}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="phone" className={styles.label}>Телефон</label>
        <input
          {...register("phone", { required: true, validate: validatePhone })}
          id="phone"
          type="text"
          className={styles.input}
          placeholder="+79999999999"
          pattern="^\+7\d{10}$"
        />
        {errors.phone && <div className={styles.error}>{errors.phone.message as string}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="role" className={styles.label}>Роль</label>
        <select
          {...register("role", { required: true })}
          id="role"
          className={styles.input}
          defaultValue=""
        >
          <option value="" disabled>Выберите роль</option>
          <option value={ModelRoleEnum.DRIVER}>Водитель</option>
          <option value={ModelRoleEnum.DISP}>Диспетчер</option>
          <option value={ModelRoleEnum.ADMIN}>Администратор</option>
        </select>
        {errors.role && <div className={styles.error}>{errors.role.message as string}</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="role_password" className={styles.label}>Пароль для роли</label>
        <input
          {...register("role_password", { required: true })}
          id="role_password"
          type="password"
          className={styles.input}
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
    