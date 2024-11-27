import { toast, type ToastPosition } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const autoClose: number = 3000;
const position: ToastPosition = 'top-right';
export const sucessToast = (message: string) => {
    toast.success(message,{
        position: position,
        autoClose: autoClose
    });
};

export const errorToast = (message: string) => {
    toast.error(message,{
        position: position,
        autoClose: autoClose
    });
}

export const warningToast = (message: string) => {
    toast.warning(message,{
        position: position,
        autoClose: autoClose
    });
}

export const infoToast = (message: string) => {
    toast.info(message,{
        position: position,
        autoClose: autoClose
    });
}
