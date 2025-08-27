import { toast, type ToastOptions } from 'react-toastify';

// Общие настройки для всех уведомлений
const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  style: {
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
  },
};

// Типы для уведомлений
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface UseToastReturn {
  showToast: (message: string, type: ToastType, options?: ToastOptions) => void;
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  dismissToast: (toastId?: string | number) => void;
  dismissAllToasts: () => void;
}

export const useToast = (): UseToastReturn => {
  const showToast = (message: string, type: ToastType, options?: ToastOptions) => {
    const mergedOptions = { ...defaultToastOptions, ...options };
    
    switch (type) {
      case 'success':
        toast.success(message, mergedOptions);
        break;
      case 'error':
        toast.error(message, mergedOptions);
        break;
      case 'warning':
        toast.warning(message, mergedOptions);
        break;
      case 'info':
        toast.info(message, mergedOptions);
        break;
      default:
        toast(message, mergedOptions);
    }
  };

  const showSuccess = (message: string, options?: ToastOptions) => {
    showToast(message, 'success', options);
  };

  const showError = (message: string, options?: ToastOptions) => {
    showToast(message, 'error', options);
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    showToast(message, 'warning', options);
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    showToast(message, 'info', options);
  };

  const dismissToast = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  const dismissAllToasts = () => {
    toast.dismiss();
  };
  
  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissToast,
    dismissAllToasts,
  };
};



/*
// Хук для работы с промисами
export const useToastPromise = () => {
  const { showSuccess, showError } = useToast();

  const handlePromise = <T>(
    promise: Promise<T>,
    messages: {
      pending: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, {
      pending: messages.pending,
      success: messages.success,
      error: messages.error,
    });
  };

  return { handlePromise };
};
*/
