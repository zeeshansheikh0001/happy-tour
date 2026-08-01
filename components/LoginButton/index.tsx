import React from 'react';
import styles from './LoginButton.module.scss';
import { FcAssistant } from "react-icons/fc";

const LoginButton: React.FC = () => {
  return (
    <button className={styles['login-button']}>
      <FcAssistant className={styles['login-button__icon']} />
      <span className={styles['login-button__text']}>Login</span>
    </button>
  );
};

export default LoginButton; 