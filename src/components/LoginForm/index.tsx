import { useState } from 'react';
import { useForm } from "react-hook-form";
import { type DtoLoginRequest  } from '../../api/api';
import styles from './loginForm.module.css';
import type { LoginFormProps } from './type';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const LoginForm = ( { onSubmit, setIsRegister } : LoginFormProps ) => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
      } = useForm<DtoLoginRequest >();
    
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.formTitle}>Вход в профиль</h2>
            
            <div className={styles.inputGroup}>
                <input
                    {...register("login", { required: true })}
                    id="login"
                    type="text"
                    className={styles.input}
                    placeholder="Телефон или логин"
                />
            </div>
            
            <div className={styles.inputGroup}>
                <div className={styles.passwordContainer}>
                    <input
                        {...register("password", { required: true })}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={styles.input}
                        placeholder="Пароль"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.eyeButton}
                        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>
            
            <button
                type="submit"
                className={styles.loginButton}
            >
                Войти
            </button>
            
            <button
                type="button"
                className={styles.registerButton}
                onClick={() => setIsRegister(true)}
            >
                Зарегистрироваться
            </button>
        </form>
    );
};
    