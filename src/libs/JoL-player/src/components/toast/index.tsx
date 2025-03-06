import React, { FC, useEffect, useState, useRef } from 'react';
import { toastType } from '@/interface';
import { defaultToastPosition } from '@/core/config';
import { createRoot } from 'react-dom/client';
import './toast.scss';

const Toast: FC<toastType> = function Toast({ message, duration, position }) {
  const [visible, setVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(message);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (message) {
      setToastMessage(message);
      setVisible(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, duration || 2000);
    }
  }, [message, duration]);

  return (
    <div
      className={`jolPlayerToast ${position || defaultToastPosition}`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {toastMessage}
    </div>
  );
};

let root: any;
let toastKey = 0;

const toast = (option: toastType) => {
  const jolPlayerToast = document.querySelector('#jolPlayerToast');
  if (!jolPlayerToast) {
    const container = document.createElement('div');
    container.id = 'jolPlayerToast';
    document.querySelector('#JoL-player-container')!.appendChild(container);
    root = createRoot(container);
  }
  toastKey += 1; // 增加 key 值以强制重新渲染
  root.render(<Toast key={toastKey} {...option} />);
};

export default toast;