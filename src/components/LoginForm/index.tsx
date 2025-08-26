import { useForm, type SubmitHandler } from "react-hook-form";
import { type ModelLoginRequest  } from '../../api/api';
import styles from './loginForm.module.css';
import type { LoginFormProps } from './type'

export const LoginForm = ( { onSubmit } : LoginFormProps ) => {
    const {
        register,
        handleSubmit,
      } = useForm<ModelLoginRequest >();
    
    const handleFormSubmit: SubmitHandler<ModelLoginRequest> = (data) => {
        onSubmit(data)
      };
    
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="login" className={styles.label}>Login</label>
            <input
              {...register("login", { required: true })}
              id="login"
              type="text"
              className={styles.input}
            />
        </div>
        <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              {...register("password", { required: true })}
              id="password"
              type="password"
              className={styles.input}
            />
        </div>
          <button
            type="submit"
            className={styles.submitButton}
          >
            Отправить
          </button>
        </form>
    );
};
    