import { toastType } from '@/interface';
import { ToastHandle } from './Toast';

let toastRef: ToastHandle | null = null;

export const registerToast = (ref: ToastHandle) => {
  toastRef = ref;
};

export const showToast = (options: toastType) => {
  if (toastRef) {
    toastRef.show(options);
  }
};
