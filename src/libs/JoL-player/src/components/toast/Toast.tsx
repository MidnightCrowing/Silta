import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { toastType } from '@/interface';
import { defaultToastPosition } from '@/core/config';
import './toast.scss';

export interface ToastHandle {
  show: (options: toastType) => void;
}

const Toast = forwardRef<ToastHandle>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState(defaultToastPosition);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useImperativeHandle(ref, () => ({
    show(options: toastType) {
      setMessage(options.message as string);
      setPosition(options.position || defaultToastPosition);
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), options.duration || 2000);
    },
  }));

  return (
    <div
      className={`jolPlayerToast ${position}`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {message}
    </div>
  );
});

export default Toast;
