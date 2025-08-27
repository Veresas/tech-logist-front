import { useState } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { type ModelLoginRequest  } from '../../api/api';
import styles from './loginForm.module.css';
import type { LoginFormProps } from './type'

export const LoginForm = ( { onSubmit, setIsRegister } : LoginFormProps ) => {
    const {
        register,
        handleSubmit,
      } = useForm<ModelLoginRequest >();
    
    const [showPassword, setShowPassword] = useState(false);
    
    const handleFormSubmit: SubmitHandler<ModelLoginRequest> = (data) => {
        onSubmit(data)
      };
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
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
                        className={styles.eyeButton}
                        onClick={handleTogglePassword}
                        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                    >
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
    